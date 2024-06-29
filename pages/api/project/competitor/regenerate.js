import { openai } from "@/lib/openai";
import { exa } from "@/lib/exa";
import createClient from '@/supabase/utils/api';

export const config = {
  maxDuration: 120,
};

function flattenArray(arr) {
  return arr.slice(0, 6).map(obj => {
      return `Title: ${obj.title}\nURL: ${obj.url}\nDescription: ${obj.text}`;
  }).join('\n\n');
}

export default async function handler(req, res ) {
  if (req.method !== "POST") {
    res.status(405)
      .appendHeader('Allow', 'POST')
      .json({ 
        status: false,
        error: "Only POST request is allowed" 
      });
    return ;
  } 
  
  const { body } = req;
  const { name, id, description, audience, note } = body;
  const supabase = createClient(req, res)

  try {
    const notePrompt = `
    BEGIN NOTE
    ${note}
    END NOTE
  
    Use the note above to determine the content of the response.
    `
    const findKeyword = async () => {
      const prompt = `
      `

      const messages = [
        { role: "system", content: "You are a keyword extractor" },
        { role: "user", content: prompt },
      ];

      const response = await openai.chat.completions.create({
        messages,
        temperature: 1,
        max_tokens: 50,
        stream: false,
      });

      const generatedResponse = response.choices.pop();
      const content = generatedResponse.message.content;

      return content;
    }

    const websiteKeyword = await findKeyword();

    const findCompetitor = async () => {
      const { results: competitors} = await exa.searchAndContents(
        websiteKeyword,
        {
          type: "neural",
          numResults: 10,
          category: "company",
          text: {
            maxCharacters: 5000
          }
        }
      )

      const filterCompetitors = competitors.filter((competitor) => {
        if(!competitor.text.includes("<|endoftext|>") && competitor.text.length > 800) {
          return competitor;
        }
      })

      const competitorString = flattenArray(filterCompetitors);

      return competitorString;
    }

    const competitorData = await findCompetitor();

    const analyzeCompetitor = async () => {
      const prompt = `
      `

      const messages = [
        { role: "system", content: "You are an expert competitor analyst" },
        { role: "user", content: prompt },
      ];

      const response = await openai.chat.completions.create({
        messages,
        temperature: 1,
        max_tokens: 3000,
        stream: false,
        response_format: { type: "json_object" },
      });

      const generatedResponse = response.choices.pop();
      const content = generatedResponse.message.content;
      const parsedContent = JSON.parse(content)

      return parsedContent;
    }

    const competitorAnalysis = await analyzeCompetitor();

    const { data, error } = await supabase
    .from("projects")
    .update({ 
      competitor: competitorData,
      competitor_analysis: competitorAnalysis 
    })
    .eq("id", id)
    .select()

    if(error) {
      return res.status(500).json({ 
        status: false,
        error: error.message 
      });
    }

    res.status(200).json({ 
      status: true,
      data: data[0]
    });
  } catch (error) {
    res.status(500).json({ 
      status: false,
      error: error 
    });
  }
}
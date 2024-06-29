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
  const { name, url, audience, model } = body;
  const supabase = createClient(req, res)

  try {
    const fetchWebsiteContent = async () => {
      const { results: websiteContent } = await exa.getContents(
        [ url ],
        { text: true }
      );

      const prompt = `
      `

      const messages = [
        { role: "system", content: "You are a webpage content summarizer" },
        { role: "user", content: prompt },
      ];

      const response = await openai.chat.completions.create({
        messages,
        temperature: 1,
        max_tokens: 500,
        stream: false,
        response_format: { type: "json_object" }
      });

      const generatedResponse = response.choices.pop();
      const content = generatedResponse.message.content;
      const parsedContent = JSON.parse(content);

      return parsedContent;
    }

    const websiteContent = await fetchWebsiteContent();

    const findCompetitor = async () => {
      const { results: competitors} = await exa.searchAndContents(
        websiteContent.keyword,
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

    const generateCustomerPersona = async () => {
      const prompt = `
      `

      const messages = [
        { role: "system", content: "You are a brand identity generator" },
        { role: "user", content: prompt },
      ];

      const response = await openai.chat.completions.create({
        messages,
        temperature: 1,
        max_tokens: 1500,
        stream: false,
        response_format: { type: "json_object" },
      });

      const generatedResponse = response.choices.pop();
      const content = generatedResponse.message.content;
      const parsedContent = JSON.parse(content)

      return parsedContent;
    }

    const generateBrandInformation = await Promise.all([ 
      await generateCustomerPersona(), 
      await findCompetitor() 
    ])
    .then((res) => res)
    .catch((error) => [ null, null ]);

    const { data, error } = await supabase
    .from('projects')
    .insert([{ 
      name,
      model,
      url,
      summary: websiteContent.summary,
      audience,
      overview: generateBrandInformation[0]["Brand Overview"],
      personas: generateBrandInformation[0]["Customer Personas"],
      competitor: generateBrandInformation[1],
      version: 1,
    }])
    .select("id")

    if(error) {
      return res.status(500).json({ 
        status: false,
        error: error.message 
      });
    }

    res.status(200).json({ 
      status: true,
      data: {
        id: data[0].id,
        name
      }
    });
  } catch (error) {
    res.status(500).json({ 
      status: false,
      error: error 
    });
  }
}
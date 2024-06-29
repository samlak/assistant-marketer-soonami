import { openai } from "@/lib/openai";
import createClient from '@/supabase/utils/api'

export const config = {
  maxDuration: 120,
};

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
  const { id, name, description, audience, model, note } = body;
  const supabase = createClient(req, res)

  try {
    const notePrompt = `
    BEGIN NOTE
    ${note}
    END NOTE
  
    Use the note above to determine the content of the response.
    `
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

    const { data, error } = await supabase
    .from('projects')
    .update({ 
      overview: parsedContent["Brand Overview"],
      personas: parsedContent["Customer Personas"]
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
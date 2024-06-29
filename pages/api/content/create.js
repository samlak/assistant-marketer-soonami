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
  const { projectId, projectName, channel, note, summary } = body;
  const supabase = createClient(req, res)

  const channelPrompt = {
    "LinkedIn": "",

    "Instagram": "",
    
    "Facebook": "",
    
    "Twitter": "",
      
    "TikTok": "",
    
    "YouTube": "",
  
    "Content Marketing": "",
    
    "Email Marketing": "",
    
    "Online Communities and Forums": "",
    
    "Influencer Marketing": "",
  }
  
  const systemPrompt = `You are a content creation assistant. Your task is to generate tailored content for different marketing channels based on the provided prompts. Each prompt includes the specific marketing channel, word limit, and the key points to focus on. Ensure that the content is engaging, relevant, and adheres to the word limits specified. Maintain a professional tone for LinkedIn and Email Marketing, a friendly and engaging tone for Facebook and Instagram, and a concise and impactful tone for Twitter. Follow the creative and fun approach for TikTok and the informative and engaging style for YouTube and Content Marketing.`

  const notePrompt = `
  BEGIN NOTE
  ${note}
  END NOTE

  Use the note above to determine the content of the response.
  `

  const prompt = `
  BEGIN BRAND DESCRIPTION 
  ${summary}
  END BRAND DESCRIPTION  

  Use the brand information above to ${channelPrompt[channel]}

  This information is very important: double check and remove all markdown tag in your response. Your response should be in a plain text.

  ${note && notePrompt}
  `

  const messages = [
    { role: "system", content: systemPrompt },
    { role: "user", content: prompt },
  ];

  try {
    const response = await openai.chat.completions.create({
      messages,
      temperature: 1,
      max_tokens: 1000,
      stream: false,
    });

    const generatedResponse = response.choices.pop();
    const content = generatedResponse.message.content;

    const { data, error } = await supabase
    .from('contents')
    .insert([{ 
      project: projectId,
      channel,
      note,
      text: content,
    }])
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
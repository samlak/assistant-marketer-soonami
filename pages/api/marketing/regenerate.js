import { openai } from "@/lib/openai";
import createClient from '@/supabase/utils/api';
import { strategyData } from "@/lib/strategy-data";
import { deepConsole } from "@/lib/utils";

export const config = {
  maxDuration: 120,
};

const channelData = {
  "Short Form Video": {
    "channel": "short video platforms such as TikTok, Instagram Reels, and YouTube Shorts",
    "shortCode": "shorts",
    "promptData": strategyData["Short Form Video"]
  },
  "SEO": {
    "channel": "SEO",
    "shortCode": "seo",
    "promptData": strategyData["SEO"]
  },
  "Youtube Video": {
    "channel": "Youtube",
    "shortCode": "youtube",
    "promptData": strategyData["Youtube Video"]
  },
  "Twitter": {
    "channel": "Twitter",
    "shortCode": "twitter",
    "promptData": strategyData["Twitter"]
  },
  "Community and Forum": {
    "channel": "online communities and forums such as Reddit and Facebook Groups",
    "shortCode": "community",
    "promptData": strategyData["Community and Forum"]
  },
  "LinkedIn": {
    "channel": "LinkedIn",
    "shortCode": "linkedin",
    "promptData": strategyData["LinkedIn"]
  },
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
  const { 
    channel, 
    projectName, 
    audience, 
    projectDescription, 
    marketingId,
    note 
  } = body;
  const supabase = createClient(req, res)

  try {
    const notePrompt = `
    BEGIN NOTE
    ${note}
    END NOTE
  
    Use the note above to determine the content of the response.
    `
    const generateStrategy = async () => {
      const systemMessage = `You are a marketing strategist tasked with creating a comprehensive plan to grow my business using ${channelData[channel].channel}`
      const prompt = `
      `

      const messages = [
        { role: "system", content: systemMessage },
        { role: "user", content: prompt },
      ];

      const response = await openai.chat.completions.create({
        messages,
        temperature: 1,
        max_tokens: 2000,
        stream: false
      });

      const generatedResponse = response.choices.pop();
      const content = generatedResponse.message.content;
      
      const filteredContent = content.replace(/```markdown/g, '').replace(/```/g, '');

      return filteredContent;
    }

    const generateKeyword = async () => {
      const systemMessage = `You are a social media hashtag and SEO keyword researcher`
      const prompt = `
        BEGIN PROJECT DESCRIPTION
        ${projectDescription}
        END PROJECT DESCRIPTION
        
        ${channelData[channel].promptData.keyword}

        ${note && notePrompt}
      `

      const messages = [
        { role: "system", content: systemMessage },
        { role: "user", content: prompt },
      ];

      const response = await openai.chat.completions.create({
        messages,
        temperature: 1,
        max_tokens: 200,
        stream: false,
        response_format: { type: "json_object" }
      });

      const generatedResponse = response.choices.pop();
      const content = generatedResponse.message.content;
      const parsedContent = JSON.parse(content)

      return parsedContent;
    }

    const combinedStrategyCall = await Promise.all([ await generateStrategy(), await generateKeyword() ])
    .then((res) => res)
    .catch((error) => [ null, null ]);

    const newStrategy = {
      strategy: combinedStrategyCall[0],
      option: combinedStrategyCall[1]
    }
    
    const { data: sData, error: sError } = await supabase
    .from('marketing')
    .update({
      [channelData[channel].shortCode]: newStrategy
    })
    .eq("id", marketingId)
    .select();

    let data = sData[0];
    let error = sError;

    if(error) {
      return res.status(500).json({ 
        status: false,
        error: error.message 
      });
    }

    res.status(200).json({ 
      status: true,
      data: data
    });
  } catch (error) {
    console.log({ error });

    res.status(500).json({ 
      status: false,
      error: error 
    });
  }
}
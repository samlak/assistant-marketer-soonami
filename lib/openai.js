import OpenAI from "openai";

const resource = 'assistant-marketer';
const model = 'AssistantMarketerV1'; 
const apiVersion = "2024-02-15-preview";
 
const apiKey = process.env.AZURE_OPENAI_API_KEY;

export const openai = new OpenAI({
  apiKey,
  baseURL: `https://${resource}.openai.azure.com/openai/deployments/${model}`,
  defaultQuery: { 'api-version': apiVersion },
  defaultHeaders: { 'api-key': apiKey },
});

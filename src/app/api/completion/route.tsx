import { OpenAIApi, Configuration } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";
// /api/completion
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export async function POST(req: Request) {
  // extract the prompt from the body
  const { prompt } = await req.json();

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `You are interacting with an AI assistant integrated within a text editor, designed to provide sentence completions and enhance your writing process. 
        This AI boasts a comprehensive expertise, remarkable helpfulness, keen intelligence, and exceptional articulateness, ensuring high-quality assistance. 
        It is characterized by impeccable manners and a consistently positive demeanor, aiming to be not only friendly and kind but also motivational, ready to deliver insightful and engaging responses to enrich your writing experience.`
  },
      {
        role: "user",
        content: `
        I am crafting a piece of writing and seek assistance to refine my thoughts. 
        Here is my prompt: ##${prompt}## 
        Please ensure the response seamlessly aligns with the existing tone of my text, offering a concise and compelling continuation.
        `,
      },
    ],
    stream: true,
  });
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
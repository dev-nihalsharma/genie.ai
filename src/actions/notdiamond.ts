import { NotDiamond } from 'notdiamond';
import { toast } from 'react-toastify';

const notDiamond = new NotDiamond({
  // Optional - automatically loads from environment variable
  apiKey: process.env.NEXT_PUBLIC_NOTDIAMOND_API_KEY,
  llmKeys: {
    openai: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    anthropic: process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY,
    google: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  },
});

export async function sendPrompt(prompt: string) {
  try {
    const result = await notDiamond.create({
      messages: [{ content: prompt, role: 'user' }],
      llmProviders: [
        // { provider: 'openai', model: 'gpt-4o-mini' },
        // { provider: 'anthropic', model: 'claude-3-sonnet-20240229' },
        { provider: 'google', model: 'gemini-1.5-pro-latest' },
        // { provider: 'perplexity', model: 'llama-3.1-sonar-large-128k-online' },
      ],
      tradeoff: 'latency',
    });

    if ('detail' in result!) {
      console.error('Error:', result.detail);
      return toast.error('Error: ' + result.detail);
    }

    console.log('Selected providers:', result!.providers);
    console.log(result?.content);

    return result?.content;
  } catch (error) {
    console.log(error);
    toast.error('Error: ' + error);
  }
}

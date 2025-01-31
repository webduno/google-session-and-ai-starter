// pages/api/getCompletion.ts

import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

type Data = {
  // Define the structure of your expected response here
  choices?: { text: string }[];
  error?: string;
};


const initialPrompt = "You are a legal assistance and template generator. You are given a prompt and you are to generate a guidance on which template to use for a legal document based on the prompt. Dont include introductory sentences, feedback questions, or anything else. Just the single message guidance."
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { prompt } = reqBody;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        // model: 'gpt-3.5-turbo-instruct',
        messages: [{role: "system", content:
          // `only respond in this JSON format: ${JSON.stringify(responseFormat)}, no more. ${prompt}`
          `${initialPrompt}. user request: ${prompt}`
        }],
        max_tokens: 256,
      }),
    });
    console.log("response from ai", response);
    // const data = await response.json() as Data;
    const data = await response.json();
    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'Error fetching data from OpenAI' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

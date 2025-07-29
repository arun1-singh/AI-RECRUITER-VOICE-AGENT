// import { FEEDBACK_PROMPT } from "@/app/auth/services/Constants";
// import { NextResponse } from "next/server";
// import OpenAI from "openai";

// export async function POST(req) {

//     const { conversation } = await req.json();

//     const FINAL_PROMPT = FEEDBACK_PROMPT.replace('{{conversation}}', JSON.stringify(conversation))

//     try {
//         const openai = new OpenAI({
//             baseURL: 'https://openrouter.ai/api/v1',
//             apiKey: process.env.OPENROUTER_API_KEY,
//         });

//         const completion = await openai.chat.completions.create({
//             model: 'google/gemini-2.0-flash-exp:free',
//             messages: [
//                 {
//                     role: 'user',
//                     content: FINAL_PROMPT
//                 }
//             ],
//         })
//         return NextResponse.json(completion.choices[0].message)
//     } catch (e) {
//         console.log(e)
//         return NextResponse.json(e)
//     }

// }

// import { FEEDBACK_PROMPT } from "@/app/auth/services/Constants";
// import { NextResponse } from "next/server";
// import OpenAI from "openai";

// export async function POST(req) {
//   try {
//     const { conversation } = await req.json();

//     if (!conversation || conversation.length === 0) {
//       return NextResponse.json(
//         { error: "Conversation data is missing or empty." },
//         { status: 400 }
//       );
//     }

//     const FINAL_PROMPT = FEEDBACK_PROMPT.replace(
//       "{{conversation}}",
//       JSON.stringify(conversation)
//     );

//     const openai = new OpenAI({
//       baseURL: "https://openrouter.ai/api/v1",
//       apiKey: process.env.OPENROUTER_API_KEY,
//     });

//     const completion = await openai.chat.completions.create({
//       model: "google/gemma-2-9b-it:free",
//       messages: [
//         {
//           role: "user",
//           content: FINAL_PROMPT,
//         },
//       ],
//     });

//     const aiMessage = completion?.choices?.[0]?.message;

//     if (!aiMessage) {
//       return NextResponse.json(
//         { error: "No response from AI model." },
//         { status: 502 }
//       );
//     }

//     return NextResponse.json(aiMessage);
//   } catch (error) {
//     console.error("AI Feedback Error:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error", details: error.message },
//       { status: 500 }
//     );
//   }

import { FEEDBACK_PROMPT } from "@/app/auth/services/Constants";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req) {
  try {
    const { conversation } = await req.json();

    if (!conversation || conversation.length === 0) {
      return NextResponse.json(
        { error: "Conversation data is missing or empty." },
        { status: 400 }
      );
    }

    const FINAL_PROMPT = FEEDBACK_PROMPT.replace(
      "{{conversation}}",
      JSON.stringify(conversation)
    );

    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "mistralai/mistral-7b-instruct", // you can switch to gpt-3.5 if needed
      messages: [
        {
          role: "user",
          content: FINAL_PROMPT,
        },
      ],
      temperature: 0.3,
    });

    const aiMessage = completion?.choices?.[0]?.message?.content?.trim();

    if (!aiMessage) {
      return NextResponse.json(
        { error: "No response from AI model." },
        { status: 502 }
      );
    }

    // Ensure it's valid JSON string (no backticks, markdown, etc.)
    if (!aiMessage.startsWith("{") || !aiMessage.endsWith("}")) {
      console.warn("Non-JSON response received:", aiMessage);
    }

    return NextResponse.json({ content: aiMessage });
  } catch (error) {
    console.error("AI Feedback Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}

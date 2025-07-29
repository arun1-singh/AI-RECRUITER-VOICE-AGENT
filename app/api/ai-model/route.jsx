// import { QUESTIONS_PROMPT } from '@/app/auth/services/Constants';
// import { NextResponse } from 'next/server';
// import OpenAI from 'openai';

// export async function POST(req) {

//     const { jobPosition, jobDescription, duration, type } = await req.json();
//     const FINAL_PROMPT = QUESTIONS_PROMPT.replace('{{jobTitle}}', jobPosition)
//         .replace('{{jobDescription}}', jobDescription)
//         .replace('{{duration}}', duration)
//         .replace('{{type}}', type)

//     console.log(FINAL_PROMPT);
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
//                     content: FINAL_PROMPT,
//                 },
//             ],
//         });
//         console.log(completion.choices[0].message);
//         return NextResponse.json(completion.choices[0].message)
//     } catch (e) {
//         console.log(e)
//         return NextResponse.json(e)
//     }

// }

// import { NextResponse } from 'next/server';
// import OpenAI from 'openai';

// export async function POST(req) {
//   const { jobPosition, jobDescription, duration, type } = await req.json();

//   // ✅ Updated hardcoded prompt (you can move to Constants.js if needed)
//   const FINAL_PROMPT = `
// Generate a JSON response for an interview with the following details:
// - Job Title: ${jobPosition}
// - Description: ${jobDescription}
// - Duration: ${duration}
// - Interview Type: ${type} (e.g. technical, behavioral, mixed)

// The JSON must follow this structure:

// {
//   "interviewTitle": "string",
//   "interviewDuration": "string",
//   "interviewQuestions": [
//     {
//       "question": "string",
//       "type": "Technical | Behavioral | Experience | Problem Solving"
//     }
//   ]
// }

// ❗ Only return valid JSON. Do NOT include any text, code comments, or markdown like \`\`\`json.
// `;

//   console.log("✅ Final Prompt:\n", FINAL_PROMPT);

//   try {
//     const openai = new OpenAI({
//       baseURL: 'https://openrouter.ai/api/v1',
//       apiKey: process.env.OPENROUTER_API_KEY,
//     });

//     const completion = await openai.chat.completions.create({
//       model: 'google/gemma-2-9b-it:free',
//       messages: [
//         {
//           role: 'user',
//           content: FINAL_PROMPT,
//         },
//       ],
//       response_format: 'json',
//     });

//     const rawContent = completion.choices[0]?.message?.content;
//     console.log("🧠 Raw GPT response:\n", rawContent);

//     if (!rawContent) {
//       throw new Error("No response from AI model");
//     }

//     // 🧹 Clean up if AI still wraps in ```json ```
//     const jsonText = rawContent.replace(/```json|```/g, '').trim();

//     const parsed = JSON.parse(jsonText);

//     const response = {
//       interviewTitle: parsed.interviewTitle || `${jobPosition} Initial Screening`,
//       interviewDuration: parsed.interviewDuration || `${duration} Minutes`,
//       interviewQuestions: parsed.interviewQuestions || [],
//     };

//     if (response.interviewQuestions.length === 0) {
//       console.warn("⚠️ GPT returned an empty interviewQuestions array.");
//     }

//     return NextResponse.json(response);
//   } catch (e) {
//     console.error("❌ API Internal Error:", e);
//     return NextResponse.json(
//       {
//         error: "Failed to generate questions",
//         details: e.message,
//       },
//       { status: 500 }
//     );
//   }
// }


// import { NextResponse } from 'next/server';
// import OpenAI from 'openai';

// export async function POST(req) {
//   const { jobPosition, jobDescription, duration, type } = await req.json();

//   const FINAL_PROMPT = `
// Generate a JSON response for an interview with the following details:
// - Job Title: ${jobPosition}
// - Description: ${jobDescription}
// - Duration: ${duration}
// - Interview Type: ${type} (e.g. technical, behavioral, mixed)

// The JSON must follow this structure:

// {
//   "interviewTitle": "string",
//   "interviewDuration": "string",
//   "interviewQuestions": [
//     {
//       "question": "string",
//       "type": "Technical | Behavioral | Experience | Problem Solving"
//     }
//   ]
// }

// ❗ Only return valid JSON. Do NOT include any text, explanation, markdown, or code blocks.
// `;

//   console.log("✅ Final Prompt:\n", FINAL_PROMPT);

//   try {
//     const openai = new OpenAI({
//       baseURL: 'https://openrouter.ai/api/v1',
//       apiKey: process.env.OPENROUTER_API_KEY,
//     });

//     const completion = await openai.chat.completions.create({
//       model: 'google/gemma-2-9b-it:free',
//       messages: [
//         {
//           role: 'user',
//           content: FINAL_PROMPT,
//         },
//       ],
//       response_format: 'json', // Still needed for OpenRouter to force JSON
//     });

//     const rawContent = completion.choices[0]?.message?.content;
//     console.log("🧠 Raw GPT response:\n", rawContent);

//     if (!rawContent || typeof rawContent !== 'string') {
//       throw new Error("Empty or invalid content returned from model");
//     }

//     const jsonText = rawContent.replace(/```json|```/g, '').trim();

//     let parsed;
//     try {
//       parsed = JSON.parse(jsonText);
//     } catch (parseErr) {
//       throw new Error("AI response was not valid JSON. Raw content:\n" + jsonText);
//     }

//     const response = {
//       interviewTitle: parsed.interviewTitle || `${jobPosition} Initial Screening`,
//       interviewDuration: parsed.interviewDuration || `${duration} Minutes`,
//       interviewQuestions: parsed.interviewQuestions || [],
//     };

//     if (!Array.isArray(response.interviewQuestions) || response.interviewQuestions.length === 0) {
//       console.warn("⚠️ GPT returned no questions.");
//     }

//     return NextResponse.json(response);
//   } catch (e) {
//     console.error("❌ API Internal Error:", e);
//     return NextResponse.json(
//       {
//         error: "Failed to generate questions",
//         details: e.message,
//       },
//       { status: 500 }
//     );
//   }
// }


import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req) {
  const { jobPosition, jobDescription, duration, type } = await req.json();

  const FINAL_PROMPT = `
You are a helpful AI that ONLY returns valid JSON.

Generate a JSON object for an interview with:
- Job Title: ${jobPosition}
- Description: ${jobDescription}
- Duration: ${duration}
- Interview Type: ${type} (e.g. technical, behavioral, mixed)

Follow this exact schema:

{
  "interviewTitle": "string",
  "interviewDuration": "string",
  "interviewQuestions": [
    {
      "question": "string",
      "type": "Technical | Behavioral | Experience | Problem Solving"
    }
  ]
}

❗ DO NOT include markdown (like \`\`\`json), explanation, or any other text. Just return raw JSON.
`;

  console.log("✅ Final Prompt:\n", FINAL_PROMPT);

  try {
    const openai = new OpenAI({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey: process.env.OPENROUTER_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: 'mistralai/mistral-7b-instruct', // ✅ better at structured output
      messages: [
        {
          role: 'user',
          content: FINAL_PROMPT,
        },
      ],
      response_format: 'json', // Optional with OpenRouter, but included for clarity
    });

    const rawContent = completion.choices[0]?.message?.content;
    console.log("🧠 Raw GPT response:\n", rawContent);

    if (!rawContent || typeof rawContent !== 'string') {
      throw new Error("Empty or invalid content returned from model");
    }

    // 🧹 Clean up and extract only JSON
    const jsonStart = rawContent.indexOf('{');
    const jsonEnd = rawContent.lastIndexOf('}');
    if (jsonStart === -1 || jsonEnd === -1) {
      throw new Error("No JSON object found in the response");
    }

    const cleanJson = rawContent.slice(jsonStart, jsonEnd + 1).trim();

    let parsed;
    try {
      parsed = JSON.parse(cleanJson);
    } catch (parseErr) {
      console.error("❌ JSON Parse Error:", parseErr);
      throw new Error("AI response was not valid JSON. Raw content:\n" + cleanJson);
    }

    const response = {
      interviewTitle: parsed.interviewTitle || `${jobPosition} Initial Screening`,
      interviewDuration: parsed.interviewDuration || `${duration} Minutes`,
      interviewQuestions: parsed.interviewQuestions || [],
    };

    if (!Array.isArray(response.interviewQuestions) || response.interviewQuestions.length === 0) {
      console.warn("⚠️ GPT returned no interview questions.");
    }

    return NextResponse.json(response);
  } catch (e) {
    console.error("❌ API Internal Error:", e);
    return NextResponse.json(
      {
        error: "Failed to generate questions",
        details: e.message,
      },
      { status: 500 }
    );
  }
}

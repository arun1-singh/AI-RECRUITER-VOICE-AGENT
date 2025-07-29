import { BriefcaseBusinessIcon, Calendar, LayoutDashboard, List, Puzzle, Settings, User2Icon, WalletCards,Coder2Icon, Badge,Code,User,Briefcase } from "lucide-react";

export const SideBarOptions=[
    {
        name:'Dashboard',
        icon:LayoutDashboard,
        path:'/dashboard'
    },
     {
        name:'Scheduled Interview',
        icon:Calendar,
        path:'/scheduled-interview'
    },
     {
        name:'All Interview',
        icon:List,
        path:'/all-interview'
    },
     {
        name:'Billing',
        icon:WalletCards,
        path:'/billing'
    },
     {
        name:'Settings',
        icon:Settings,
        path:'/settings'
    },
]

// export const InterviewType = [
//     {
//         title: 'Technical',
//         icon: Coder2Icon
//     },
//     {
//         title: 'Behavioral',
//         icon: User2Icon
//     },
//     {
//         title: 'Experience',
//         icon: BriefcaseBusinessIcon
//     },
//     {
//         title: 'Problem Solving',
//         icon: Puzzle
//     },
//     {
//         title: 'Leadership',
//         icon: Badge
//     }
// ]
export const InterviewType = [
  {
    title: 'Technical',
    icon: Code,
  },
  {
    title: 'Behavioral',
    icon: User,
  },
  {
    title: 'Experience',
    icon: Briefcase,
  },
  {
    title: 'Problem Solving',
    icon: Puzzle,
  },
  {
    title: 'Leadership',
    icon: Badge,
  },
];

export const QUESTIONS_PROMPT = `
You are an expert technical interviewer.

Your task is to generate a well-structured, time-optimized list of high-quality interview questions for the given role.

Inputs:
- Job Title: {{jobTitle}}
- Job Description: {{jobDescription}}
- Interview Duration: {{duration}} minutes
- Interview Type: {{type}} (e.g., In-Person, Phone Screen, Technical Round)

Instructions:
1. Carefully analyze the job description to extract:
   - Key responsibilities
   - Required skills (technical and soft)
   - Expected years of experience or seniority level
2. Generate a set of interview questions tailored to the provided duration:
   - Short interviews (≤30 minutes): prioritize core competencies and 1–2 deep dives.
   - Medium interviews (31–60 minutes): cover technical, behavioral, and problem-solving aspects.
   - Long interviews (>60 minutes): include multiple technical deep dives, behavioral insights, and scenario-based leadership/decision-making questions.
3. Match the tone and structure to a real-life {{type}} interview.
4. Classify each question into one of the following types:
   - Technical
   - Behavioral
   - Experience
   - Problem Solving
   - Leadership

Format your response in JSON format with array list of questions.

format: interviewQuestions = [
  {
    "question": " ",
    "type": "Technical" | "Behavioral" | "Experience" | "Problem Solving" | "Leadership"
  },
  ...
]

Goal:
Create a structured, relevant, and role-specific interview question plan for the {{jobTitle}} position that optimally uses the {{duration}}-minute {{type}} interview.
`;

// export const FEEDBACK_PROMPT = `
// Given the following interview conversation between the assistant and the user:

// {{conversation}}

// Please provide detailed feedback on the user's interview.

// Return ONLY a JSON response wrapped in triple backticks like this:

// \`\`\`json
// {
//   "feedback": {
//     "rating": {
//       "technicalSkills": 0,  // rating out of 10
//       "communication": 0,
//       "problemSolving": 0,
//       "experience": 0
//     },
//     "summary": "Write a concise 3-line summary about the interview.",
//     "recommendation": "Yes or No",
//     "recommendationMsg": "One line explaining the recommendation."
//   }
// }
// \`\`\`

// Make sure the JSON is valid and parsable.
// `;


export const FEEDBACK_PROMPT = `
You are an AI interview evaluator.

Given the following interview conversation between the assistant and the user:

{{conversation}}

Evaluate the candidate based on the conversation and return ONLY a valid JSON object. Do NOT include any markdown, backticks, explanation, or extra text. Your response must strictly follow this format:

{
  "feedback": {
    "rating": {
      "technicalSkills": 0,         // rating from 0 to 10
      "communication": 0,          // rating from 0 to 10
      "problemSolving": 0,         // rating from 0 to 10
      "experience": 0              // rating from 0 to 10
    },
    "summary": "Write a concise 3-line summary about the candidate's performance.",
    "recommendation": "Yes" | "No",
    "recommendationMsg": "One line explaining the recommendation."
  }
}

⚠️ Return only the JSON, without any markdown (e.g., \`\`\`json) or extra text. It must be directly parsable.
`;

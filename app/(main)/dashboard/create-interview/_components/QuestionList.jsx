// "use client"
// import { Loader2Icon } from 'lucide-react';
// import React, { useEffect, useState } from 'react'
// import { toast } from 'sonner';
// import axios from 'axios';

// function QuestionList({ formData }) {

//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         if(formData){
//         GenerateQuestionList();
//         }
//     }, [formData])

//     const GenerateQuestionList = async () => {
//         setLoading(true);
//         try {

//             const result = await axios.post('/api/ai-model', {
//                 ...formData
//             })
//             console.log(result.data);
//             setLoading(false);
//         } catch (e) {
//             console.error("API Error:", e?.response?.data || e.message || e);
//             toast(`Server Error: ${e?.response?.data?.error || e.message}`);
//             setLoading(false);
//         }
//     }
//     return (
//         <div>
//             {loading &&

//                 <div className='p-5 bg-blue-100 rounded-2xl border border-gray-100 flex gap-5 items-center'>
//                     <Loader2Icon className='animate-spin' />
//                     <div>
//                         <h2>Generating Interview Questions</h2>
//                         <p>Our AI is crafting personalized questions based on your job position </p>
//                     </div>
//                 </div>
//             }

//         </div>
//     )
// }

// export default QuestionList

// "use client";
// import { Loader2Icon } from "lucide-react";
// import React, { useEffect, useState } from "react";
// import { toast } from "sonner";
// import axios from "axios";

// function QuestionList({ formData }) {
//   const [loading, setLoading] = useState(true);

//   const [questionList,setQuestionList] = useState();

//   useEffect(() => {
//     if (formData) {
//       GenerateQuestionList();
//     }
//   }, [formData]);

//   const GenerateQuestionList = async () => {
//     setLoading(true);
//     try {
//       const result = await axios.post("/api/ai-model", {
//         ...formData,
//       });

//       // ✅ Format and log the response in your desired format
//       console.log({
//         role: "assistant",
//         content: `\`\`\`json\n${JSON.stringify(result.data.content, null, 2)}\n\`\`\``,
//         refusal: null,
//       });

//       const Content = result.data.content;
//       const FINAL_CONTENT=Content.replace('"```json','').replace('```','')
//       setQuestionList(JSON.parse(FINAL_CONTENT));

//       setLoading(false);
//     } catch (e) {
//       console.error("API Error:", e?.response?.data || e.message || e);
//       toast(`Server Error: ${e?.response?.data?.error || e.message}`);
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       {loading && (
//         <div className="p-5 bg-blue-100 rounded-2xl border border-primary flex gap-5 items-center">
//           <Loader2Icon className="animate-spin" />
//           <div>
//             <h2 className="font-medium">Generating Interview Questions</h2>
//             <p className="text-primary">
//               Our AI is crafting personalized questions based on your job
//               position
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default QuestionList;

// "use client";
// import { Loader2Icon } from "lucide-react";
// import React, { useEffect, useState } from "react";
// import { toast } from "sonner";
// import axios from "axios";

// function QuestionList({ formData }) {
//   const [loading, setLoading] = useState(true);
//   const [questionList, setQuestionList] = useState([]);

//   useEffect(() => {
//     if (formData) {
//       GenerateQuestionList();
//     }
//   }, [formData]);

//   const GenerateQuestionList = async () => {
//     setLoading(true);
//     try {
//       const result = await axios.post("/api/ai-model", {
//         ...formData,
//       });

//       console.log("✅ Full API response:", result.data);

//       const questions = result?.data?.interviewQuestions;

//       if (!questions || !Array.isArray(questions)) {
//         console.error("Invalid interviewQuestions format:", questions);
//         toast("Invalid question list received from AI");
//         setLoading(false);
//         return;
//       }

//       // Extract only the question text (optional)
//       const onlyQuestions = questions.map((q) => q.question);

//       // Log pretty JSON
//       console.log({
//         role: "assistant",
//         content: `\`\`\`json\n${JSON.stringify(onlyQuestions, null, 2)}\n\`\`\``,
//         refusal: null,
//       });

//       setQuestionList(onlyQuestions);
//     } catch (e) {
//       console.error("API Error:", e?.response?.data || e.message || e);
//       toast(`Server Error: ${e?.response?.data?.error || e.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       {loading && (
//         <div className="p-5 bg-blue-100 rounded-2xl border border-primary flex gap-5 items-center">
//           <Loader2Icon className="animate-spin" />
//           <div>
//             <h2 className="font-medium">Generating Interview Questions</h2>
//             <p className="text-primary">
//               Our AI is crafting personalized questions based on your job
//               position
//             </p>
//           </div>
//         </div>
//       )}

//       {!loading && questionList.length > 0 && (
//         <div className="mt-5 space-y-3">
//           {questionList.map((q, i) => (
//             <div key={i} className="p-4 bg-white rounded-xl border shadow">
//               <p className="text-sm font-medium text-gray-700">{q}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default QuestionList;

"use client";
import { Loader2, Loader2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { Button } from "@/components/ui/button";
import QuestionListContainer from "./QuestionListContainer";
import { supabase } from "@/app/auth/services/supabaseClient";
import { useUser } from "@/app/provider";
import { v4 as uuidv4 } from "uuid";

function QuestionList({ formData, onCreateLink }) {
  const [loading, setLoading] = useState(true);
  const [questionList, setQuestionList] = useState([]);
  const { user } = useUser();
  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    if (formData) {
      GenerateQuestionList();
    }
  }, [formData]);

  const GenerateQuestionList = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/ai-model", {
        ...formData,
      });

      console.log("✅ Full API response:", result.data);

      const questions = result?.data?.interviewQuestions;

      if (!questions || !Array.isArray(questions)) {
        console.error("Invalid interviewQuestions format:", questions);
        toast("Invalid question list received from AI");
        return;
      }

      setQuestionList(questions);

      console.log({
        role: "assistant",
        content: `\`\`\`json\n${JSON.stringify(questions, null, 2)}\n\`\`\``,
        refusal: null,
      });
    } catch (e) {
      console.error("API Error:", e?.response?.data || e.message || e);
      toast(`Server Error: ${e?.response?.data?.error || e.message}`);
    } finally {
      setLoading(false);
    }
  };

  const getBadgeColor = (type) => {
    switch ((type || "").toLowerCase()) {
      case "technical":
        return "bg-blue-100 text-blue-800";
      case "behavioral":
        return "bg-green-100 text-green-800";
      case "experience":
        return "bg-purple-100 text-purple-800";
      case "problem solving":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };


  const onFinish = async () => {
    setSaveLoading(true);
    const interview_id = uuidv4();

    const payload = {
      jobPosition: formData.jobPosition,
      jobDescription: formData.jobDescription,
      Duration: formData.duration,
      type: Array.isArray(formData.type) ? formData.type[0] : formData.type, // Fix here
      questionList: questionList, // Must be raw array
      userEmail: user?.email,
      interview_id,
    };

    console.log("📦 Payload to Supabase:", payload);

    const { data, error } = await supabase
      .from("interviews")
      .insert([payload])
      .select();

    //Update User Credits
    const userUpdate = await supabase
      .from('Users')
      .update({ credits: Number(user?.credits)-1 })
      .eq('email', user?.email)
      .select();

      console.log(userUpdate);

    setSaveLoading(false);

    onCreateLink(interview_id);

    if (error) {
      console.error("❌ Supabase insert error:", error);
      toast.error("Failed to save interview. Check console.");
    } else {
      console.log("✅ Interview saved to Supabase:", data);
      toast.success("Interview saved successfully!");
    }
  };

  return (
    <div>
      {loading && (
        <div className="p-5 bg-blue-100 rounded-2xl border border-primary flex gap-5 items-center">
          <Loader2Icon className="animate-spin w-6 h-6 text-blue-600" />
          <div>
            <h2 className="font-semibold text-lg text-blue-800">
              Generating Interview Questions
            </h2>
            <p className="text-sm text-blue-600">
              Our AI is crafting personalized questions based on your job position
            </p>
          </div>
        </div>
      )}

      {!loading && questionList.length > 0 && (
        <>
          <h2 className="text-2xl font-bold text-center text-primary mb-6 mt-8">
            🎯 Generated Interview Questions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {questionList.map((q, i) => (
              <div
                key={i}
                className="p-5 bg-white rounded-2xl border shadow-md hover:shadow-xl transition-shadow duration-200"
              >
                <p className="text-base font-semibold text-gray-800">{q.question}</p>
                <span
                  className={`inline-block mt-3 px-3 py-1 text-xs font-medium rounded-full ${getBadgeColor(
                    q.type
                  )}`}
                >
                  {q.type || "Unknown"}
                </span>
              </div>
            ))}
          </div>
        </>
      )}

      {!loading && questionList.length === 0 && (
        <p className="text-center text-gray-500 mt-6 text-sm">
          ❌ No questions were generated. Please check your input or try again.
        </p>
      )}

      {!loading && questionList.length > 0 && (
        <>
          <QuestionListContainer questionList={questionList} />
          <div className="flex justify-center mt-10 mb-8">
            <Button
              onClick={onFinish} disabled={saveLoading}
              className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md transition-all"
            >
              {saveLoading && <Loader2 className="animate-spin " />}
              Create Interview Link & Finish
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default QuestionList;


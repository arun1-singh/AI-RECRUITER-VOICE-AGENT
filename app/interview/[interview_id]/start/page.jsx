// 'use client';

// import { useContext, useEffect, useState, useRef } from 'react';
// import { InterviewDataContext } from '@/app/context/InterviewDataContext';
// import { Mic, Phone, Timer, Loader2 } from 'lucide-react';
// import Image from 'next/image';
// import Vapi from '@vapi-ai/web';
// import { motion } from 'framer-motion';
// import AlertConfirmation from './_components/AlertConfirmation';
// import { toast } from 'sonner';
// import axios from 'axios';
// import { supabase } from '@/app/auth/services/supabaseClient';
// import { useParams, useRouter } from 'next/navigation';

// function StartInterview() {
//   const { interviewInfo } = useContext(InterviewDataContext);
//   const vapiRef = useRef(null);
//   const conversationRef = useRef('');
//   const [activeUser, setActiveUser] = useState(false);
//   const [startTime, setStartTime] = useState(null);
//   const [duration, setDuration] = useState('00:00:00');
//   const [conversation, setConversation] = useState('');
//   const { interview_id } = useParams();
//   const router = useRouter();
//   const [loading, setLoading] = useState(false); // ← Track spinner state

//   // ⏱️ Timer logic
//   useEffect(() => {
//     let timer;
//     if (startTime) {
//       timer = setInterval(() => {
//         const now = new Date();
//         const diff = new Date(now - startTime);
//         const hrs = String(diff.getUTCHours()).padStart(2, '0');
//         const mins = String(diff.getUTCMinutes()).padStart(2, '0');
//         const secs = String(diff.getUTCSeconds()).padStart(2, '0');
//         setDuration(`${hrs}:${mins}:${secs}`);
//       }, 1000);
//     }
//     return () => clearInterval(timer);
//   }, [startTime]);

//   // 📞 VAPI Setup
//   useEffect(() => {
//     if (!vapiRef.current) {
//       vapiRef.current = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);

//       vapiRef.current.on('call-start', () => {
//         setStartTime(new Date());
//         toast('Call Connected...');
//       });

//       vapiRef.current.on('speech-start', () => setActiveUser(false));
//       vapiRef.current.on('speech-end', () => setActiveUser(true));

//       vapiRef.current.on('call-end', () => {
//         setStartTime(null);
//         toast('Interview Ended');
//         GenerateFeedback(conversationRef.current);
//       });

//       vapiRef.current.on('message', (message) => {
//         if (message?.conversation) {
//           setConversation(message.conversation);
//           conversationRef.current = message.conversation;
//         }
//       });
//     }

//     if (interviewInfo) {
//       startCall();
//     }
//   }, [interviewInfo]);

//   const startCall = () => {
//     let questionList = '';
//     interviewInfo?.interviewData?.questionList.forEach((item) => {
//       questionList += item?.question + ', ';
//     });

//     const assistantOptions = {
//       name: 'AI Recruiter',
//       firstMessage: `Hi ${interviewInfo?.userName}, how are you? Ready for your interview on ${interviewInfo?.interviewData?.jobPosition}?`,
//       transcriber: { provider: 'deepgram', model: 'nova-2', language: 'en-US' },
//       voice: { provider: 'playht', voiceId: 'jennifer' },
//       model: {
//         provider: 'openai',
//         model: 'gpt-4',
//         messages: [
//           {
//             role: 'system',
//             content: `
// You are an AI voice assistant conducting interviews.
// Ask the candidate the following React interview questions: ${questionList}
// Keep it friendly, witty, and give short feedback after each response.
// Wrap up after 5–7 questions.
//           `.trim(),
//           },
//         ],
//       },
//     };

//     vapiRef.current.start(assistantOptions);
//   };

//   // 🔴 Disconnect Interview
//   const stopInterview = () => {
//     if (loading) return;
//     setLoading(true);
//     if (vapiRef.current) {
//       vapiRef.current.stop();
//       setStartTime(null);
//       toast('Interview Ended');
//     }
//   };

//   // 🧠 Feedback logic
//   const GenerateFeedback = async (conv) => {
//     if (!conv?.length) {
//       console.error('No conversation data to process.');
//       return;
//     }

//     try {
//       const result = await axios.post('/api/ai-feedback', {
//         conversation: conv,
//       });

//       const content = result.data?.content || '';
//       const jsonMatch = content.match(/```json\s*([\s\S]*?)```/);
//       if (!jsonMatch || !jsonMatch[1]) return;

//       const cleanedContent = jsonMatch[1].trim();
//       let FINAL_CONTENT;
//       try {
//         FINAL_CONTENT = JSON.parse(cleanedContent);
//       } catch (err) {
//         console.error('JSON parsing error:', err);
//         return;
//       }

//       const { data, error } = await supabase
//         .from('interview-feedback')
//         .insert([
//           {
//             userName: interviewInfo?.userName,
//             userEmail: interviewInfo?.userEmail,
//             interview_id,
//             feedback: FINAL_CONTENT,
//             recommended: false,
//           },
//         ])
//         .select();

//       if (error) {
//         console.error('Supabase insert error:', error);
//       } else {
//         router.replace(`/interview/${interview_id}/completed`);
//       }
//     } catch (err) {
//       console.error('Feedback API Error:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 30 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.8 }}
//       className="min-h-screen bg-[#0e0e10] px-6 py-12 md:py-20 lg:px-48 xl:px-56 relative text-white overflow-hidden"
//     >
//       <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] opacity-60" />

//       {/* Header */}
      // <div className="relative mb-12 z-10">
      //   <div className="flex justify-between items-center">
      //     <motion.h2
      //       initial={{ opacity: 0, y: -20 }}
      //       animate={{ opacity: 1, y: 0 }}
      //       transition={{ duration: 0.7, delay: 0.2 }}
      //       className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-pink-500 via-blue-500 to-teal-300 bg-clip-text text-transparent"
      //     >
      //       AI Interview Session
      //     </motion.h2>

      //     <motion.div
      //       animate={{
      //         scale: [1, 1.08, 1],
      //         y: [0, -2, 0],
      //         textShadow: ['0 0 6px #00fff7', '0 0 16px #00ffcc', '0 0 6px #00fff7'],
      //       }}
      //       transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
      //       className="flex items-center gap-2 text-lg font-bold bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-500 bg-clip-text text-transparent animate-pulse-slow select-none"
      //     >
      //       <Timer className="w-6 h-6 text-cyan-300" />
      //       {duration}
      //     </motion.div>
      //   </div>
      // </div>

      // {/* Participant Panels */}
      // <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      //   {[true, false].map((isAI, idx) => (
      //     <motion.div
      //       key={idx}
      //       initial={{ opacity: 0, scale: 0.9, y: 10 }}
      //       animate={{ opacity: 1, scale: 1, y: 0 }}
      //       transition={{ delay: 0.3 + idx * 0.3, duration: 0.6 }}
      //       whileHover={{ scale: 1.04, rotateX: 3, rotateY: -3 }}
      //       className={`relative rounded-2xl bg-white/5 backdrop-blur-lg p-6 h-[400px] flex flex-col justify-center items-center shadow-2xl group overflow-hidden transition-all duration-500
      //         ${isAI && !activeUser ? 'ring-4 ring-[#ff00b3] shadow-[0_0_60px_#ff00b3] animate-pulse' : ''}
      //         ${!isAI && activeUser ? 'ring-4 ring-[#00fff7] shadow-[0_0_60px_#00fff7] animate-pulse' : ''}`}
      //     >
      //       <div className="absolute -inset-[2px] rounded-2xl pointer-events-none z-0 bg-[linear-gradient(110deg,#00fff7,#ff00b3,#00fff7)] bg-[length:200%_200%] animate-shimmer-border blur-sm opacity-30 group-hover:opacity-50" />
      //       <div className="z-10 text-center">
      //         {isAI ? (
      //           <>
      //             <Image src="/ai.png" alt="AI" width={80} height={80} className="mx-auto rounded-full border-2 mb-3" />
      //             <h2 className="text-cyan-400 font-bold">AI RECRUITER</h2>
      //             <p className="text-sm text-gray-300 mt-2">Your virtual interviewer powered by AI.</p>
      //           </>
      //         ) : (
      //           <>
      //             <div className="w-16 h-16 rounded-full bg-pink-500 text-white flex items-center justify-center text-xl font-bold mx-auto shadow-xl mb-3">
      //               {interviewInfo?.userName?.[0]?.toUpperCase() || 'U'}
      //             </div>
      //             <h2 className="font-bold text-pink-300">{interviewInfo?.userName || 'Candidate'}</h2>
      //             <p className="text-sm text-gray-300 mt-2">Get ready to showcase your skills.</p>
      //           </>
      //         )}
      //       </div>
      //     </motion.div>
      //   ))}
      // </div>

      // {/* Controls */}
      // <motion.div
      //   initial={{ opacity: 0, y: 40 }}
      //   animate={{ opacity: 1, y: 0 }}
      //   transition={{ delay: 0.9, duration: 0.6 }}
      //   className="flex flex-col items-center mt-16"
      // >
      //   <div className="flex gap-10">
      //     {/* Mic */}
      //     <motion.div
      //       whileTap={{ scale: 0.95 }}
      //       animate={{
      //         scale: [1, 1.08, 1],
      //         boxShadow: ['0 0 5px #22ff22', '0 0 25px #22ff22', '0 0 5px #22ff22'],
      //       }}
      //       transition={{ repeat: Infinity, duration: 2 }}
      //       className="h-16 w-16 rounded-full flex items-center justify-center bg-gradient-to-br from-green-500 to-green-700 text-white cursor-pointer hover:scale-110 transition duration-300 shadow-[0_0_20px_#00ff00]"
      //     >
      //       <Mic className="w-7 h-7" />
      //     </motion.div>

      //     {/* Phone (Stop) */}
      //     <AlertConfirmation stopInterview={stopInterview}>
      //       <motion.button
      //         whileTap={{ scale: 0.95 }}
      //         whileHover={{ scale: 1.1 }}
      //         disabled={loading}
      //         className={`h-16 w-16 rounded-full flex items-center justify-center ${
      //           loading
      //             ? 'bg-gradient-to-br from-gray-500 to-gray-700 cursor-not-allowed'
      //             : 'bg-gradient-to-br from-red-500 to-pink-700 hover:shadow-xl'
      //         } text-white shadow-[0_0_20px_#ff0066] transition-all duration-300`}
      //       >
      //         {loading ? (
      //           <motion.div
      //             className="animate-spin"
      //             animate={{ rotate: [0, 360] }}
      //             transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
      //           >
      //             <Loader2 className="w-7 h-7 text-white opacity-90" />
      //           </motion.div>
      //         ) : (
      //           <Phone className="w-7 h-7 drop-shadow-[0_0_8px_#ff0040]" />
      //         )}
      //       </motion.button>
      //     </AlertConfirmation>
      //   </div>
      //   <h2 className="text-gray-400 text-sm mt-6">Interview in Progress...</h2>
      // </motion.div>
//     </motion.div>
//   );
// }

// export default StartInterview;



"use client";

import { useContext, useEffect, useState, useRef } from 'react';
import { InterviewDataContext } from '@/app/context/InterviewDataContext';
import { Mic, Phone, Timer, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Vapi from '@vapi-ai/web';
import { motion } from 'framer-motion';
import AlertConfirmation from './_components/AlertConfirmation';
import { toast } from 'sonner';
import axios from 'axios';
import { supabase } from '@/app/auth/services/supabaseClient';
import { useParams, useRouter } from 'next/navigation';

function StartInterview() {
  const { interviewInfo } = useContext(InterviewDataContext);
  const vapiRef = useRef(null);
  const conversationRef = useRef('');
  const [activeUser, setActiveUser] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [duration, setDuration] = useState('00:00:00');
  const [conversation, setConversation] = useState('');
  const { interview_id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let timer;
    if (startTime) {
      timer = setInterval(() => {
        const now = new Date();
        const diff = new Date(now - startTime);
        const hrs = String(diff.getUTCHours()).padStart(2, '0');
        const mins = String(diff.getUTCMinutes()).padStart(2, '0');
        const secs = String(diff.getUTCSeconds()).padStart(2, '0');
        setDuration(`${hrs}:${mins}:${secs}`);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [startTime]);

  useEffect(() => {
    if (!vapiRef.current) {
      vapiRef.current = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);

      vapiRef.current.on('call-start', () => {
        setStartTime(new Date());
        toast('Call Connected...');
      });

      vapiRef.current.on('speech-start', () => setActiveUser(false));
      vapiRef.current.on('speech-end', () => setActiveUser(true));

      vapiRef.current.on('call-end', () => {
        setStartTime(null);
        toast('Interview Ended');

        setTimeout(() => {
          if (conversationRef.current && conversationRef.current.length > 0) {
            GenerateFeedback(conversationRef.current);
          } else {
            console.warn('conversationRef is empty even after delay.');
          }
        }, 1500);
      });

      vapiRef.current.on('message', (message) => {
        console.log('Received Vapi message:', message);
        if (message?.conversation) {
          setConversation(message.conversation);
          conversationRef.current = message.conversation;
        }
      });
    }

    if (interviewInfo) {
      startCall();
    }
  }, [interviewInfo]);

  const startCall = () => {
    let questionList = '';
    interviewInfo?.interviewData?.questionList.forEach((item) => {
      questionList += item?.question + ', ';
    });

    const assistantOptions = {
      name: 'AI Recruiter',
      firstMessage: `Hi ${interviewInfo?.userName}, how are you? Ready for your interview on ${interviewInfo?.interviewData?.jobPosition}?`,
      transcriber: { provider: 'deepgram', model: 'nova-2', language: 'en-US' },
      voice: { provider: 'playht', voiceId: 'jennifer' },
      model: {
        provider: 'openai',
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are an AI voice assistant conducting interviews. Ask the candidate the following React interview questions: ${questionList} Keep it friendly, witty, and give short feedback after each response. Wrap up after 5–7 questions.`.trim(),
          },
        ],
      },
    };

    vapiRef.current.start(assistantOptions);
  };

  const stopInterview = () => {
    if (loading) return;
    setLoading(true);
    if (vapiRef.current) {
      vapiRef.current.stop();
      setStartTime(null);
      toast('Interview Ended');
    }
  };

  const GenerateFeedback = async (conv) => {
    if (!conv?.length) {
      console.error('No conversation data to process.');
      return;
    }

    try {
      const result = await axios.post('/api/ai-feedback', { conversation: conv });
      const content = result.data?.content || '';

      let cleanedContent;
      const jsonMatch = content.match(/```json\s*([\s\S]*?)```/);

      if (jsonMatch && jsonMatch[1]) {
        cleanedContent = jsonMatch[1].trim();
      } else {
        console.warn('No JSON block found, trying raw JSON instead...');
        cleanedContent = content.trim();
      }

      let FINAL_CONTENT;
      try {
        FINAL_CONTENT = JSON.parse(cleanedContent);
      } catch (err) {
        console.error('JSON parsing failed:', err, '\nReceived content:', content);
        return;
      }

      const { error } = await supabase.from('interview-feedback').insert([
        {
          userName: interviewInfo?.userName,
          userEmail: interviewInfo?.userEmail,
          interview_id,
          feedback: FINAL_CONTENT,
          recommended: FINAL_CONTENT?.feedback?.recommendation === 'Yes',
        },
      ]);

      if (error) {
        console.error('Supabase insert error:', error);
      } else {
        console.log('✅ Feedback inserted successfully');
        router.replace(`/interview/${interview_id}/completed`);
      }
    } catch (err) {
      console.error('Feedback API Error:', err);
    } finally {
      setLoading(false);
    }
  };

    return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-[#0e0e10] px-6 py-12 md:py-20 lg:px-48 xl:px-56 relative text-white overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] opacity-60" />
      {/* UI remains unchanged */}
            <div className="relative mb-12 z-10">
        <div className="flex justify-between items-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-pink-500 via-blue-500 to-teal-300 bg-clip-text text-transparent"
          >
            AI Interview Session
          </motion.h2>

          <motion.div
            animate={{
              scale: [1, 1.08, 1],
              y: [0, -2, 0],
              textShadow: ['0 0 6px #00fff7', '0 0 16px #00ffcc', '0 0 6px #00fff7'],
            }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            className="flex items-center gap-2 text-lg font-bold bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-500 bg-clip-text text-transparent animate-pulse-slow select-none"
          >
            <Timer className="w-6 h-6 text-cyan-300" />
            {duration}
          </motion.div>
        </div>
      </div>

      {/* Participant Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {[true, false].map((isAI, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.3 + idx * 0.3, duration: 0.6 }}
            whileHover={{ scale: 1.04, rotateX: 3, rotateY: -3 }}
            className={`relative rounded-2xl bg-white/5 backdrop-blur-lg p-6 h-[400px] flex flex-col justify-center items-center shadow-2xl group overflow-hidden transition-all duration-500
              ${isAI && !activeUser ? 'ring-4 ring-[#ff00b3] shadow-[0_0_60px_#ff00b3] animate-pulse' : ''}
              ${!isAI && activeUser ? 'ring-4 ring-[#00fff7] shadow-[0_0_60px_#00fff7] animate-pulse' : ''}`}
          >
            <div className="absolute -inset-[2px] rounded-2xl pointer-events-none z-0 bg-[linear-gradient(110deg,#00fff7,#ff00b3,#00fff7)] bg-[length:200%_200%] animate-shimmer-border blur-sm opacity-30 group-hover:opacity-50" />
            <div className="z-10 text-center">
              {isAI ? (
                <>
                  <Image src="/ai.png" alt="AI" width={80} height={80} className="mx-auto rounded-full border-2 mb-3" />
                  <h2 className="text-cyan-400 font-bold">AI RECRUITER</h2>
                  <p className="text-sm text-gray-300 mt-2">Your virtual interviewer powered by AI.</p>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 rounded-full bg-pink-500 text-white flex items-center justify-center text-xl font-bold mx-auto shadow-xl mb-3">
                    {interviewInfo?.userName?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <h2 className="font-bold text-pink-300">{interviewInfo?.userName || 'Candidate'}</h2>
                  <p className="text-sm text-gray-300 mt-2">Get ready to showcase your skills.</p>
                </>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="flex flex-col items-center mt-16"
      >
        <div className="flex gap-10">
          {/* Mic */}
          <motion.div
            whileTap={{ scale: 0.95 }}
            animate={{
              scale: [1, 1.08, 1],
              boxShadow: ['0 0 5px #22ff22', '0 0 25px #22ff22', '0 0 5px #22ff22'],
            }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="h-16 w-16 rounded-full flex items-center justify-center bg-gradient-to-br from-green-500 to-green-700 text-white cursor-pointer hover:scale-110 transition duration-300 shadow-[0_0_20px_#00ff00]"
          >
            <Mic className="w-7 h-7" />
          </motion.div>

          {/* Phone (Stop) */}
          <AlertConfirmation stopInterview={stopInterview}>
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.1 }}
              disabled={loading}
              className={`h-16 w-16 rounded-full flex items-center justify-center ${
                loading
                  ? 'bg-gradient-to-br from-gray-500 to-gray-700 cursor-not-allowed'
                  : 'bg-gradient-to-br from-red-500 to-pink-700 hover:shadow-xl'
              } text-white shadow-[0_0_20px_#ff0066] transition-all duration-300`}
            >
              {loading ? (
                <motion.div
                  className="animate-spin"
                  animate={{ rotate: [0, 360] }}
                  transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                >
                  <Loader2 className="w-7 h-7 text-white opacity-90" />
                </motion.div>
              ) : (
                <Phone className="w-7 h-7 drop-shadow-[0_0_8px_#ff0040]" />
              )}
            </motion.button>
          </AlertConfirmation>
        </div>
        <h2 className="text-gray-400 text-sm mt-6">Interview in Progress...</h2>
      </motion.div>
      
    </motion.div>
  );
}

export default StartInterview;



  
'use client';

import React, { useContext, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Clock, Info, Loader2Icon, Video } from 'lucide-react';
import { toast } from 'sonner';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { supabase } from '@/app/auth/services/supabaseClient';
import { InterviewDataContext } from '@/app/context/InterviewDataContext';

const textAnimation = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 150,
      damping: 20,
      mass: 1,
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
};

const fadeInUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 15,
      delay,
    },
  },
});

function Interview() {
  const params = useParams();
  const interview_id = params?.interview_id;
  const [interviewData, setInterviewData] = useState(null);
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(false);
  const { interviewInfo, setInterviewInfo } = useContext(InterviewDataContext);
  const router = useRouter();
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    if (interview_id) {
      GetInterviewDetails();
    }
  }, [interview_id]);

  const GetInterviewDetails = async () => {
    try {
      const { data, error } = await supabase
        .from('interviews')
        .select('jobPosition, jobDescription, Duration, type')
        .eq('interview_id', interview_id);

      if (error) {
        toast.error('Error fetching interview data');
        return;
      }

      if (!data || data.length === 0) {
        toast.error('Invalid interview link');
        return;
      }

      setInterviewData(data[0]);
    } catch (e) {
      toast.error('Unexpected error occurred');
    }
  };

  const onJoinInterview = async () => {
    setLoading(true);

    let { data: Interviews, error } = await supabase
      .from('interviews')
      .select('*')
      .eq('interview_id', interview_id);

    if (error || !Interviews?.[0]) {
      toast.error('Failed to load interview details');
      setLoading(false);
      return;
    }

    setInterviewInfo({
      userName: userName,
      userEmail: userEmail,
      interviewData: Interviews[0],
    });

    setLoading(false);

    router.push(`/interview/${interview_id}/start`);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-tr from-blue-50 via-white to-purple-100 py-12 px-6 sm:px-12 md:px-20 lg:px-32 xl:px-48 overflow-hidden">
      {/* Ultra smooth floating background bubbles with gentle opacity and blur */}
      <motion.div
        animate={{ y: [0, 15, 0], x: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
        className="absolute top-14 left-12 w-36 h-36 sm:w-48 sm:h-48 bg-purple-300 opacity-25 rounded-full blur-3xl z-0"
      />
      <motion.div
        animate={{ y: [0, -20, 0], x: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
        className="absolute bottom-14 right-14 w-28 h-28 sm:w-36 sm:h-36 bg-blue-300 opacity-30 rounded-full blur-3xl z-0"
      />

      {/* Main Card */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={textAnimation}
        className="relative z-10 max-w-4xl w-full mx-auto flex flex-col items-center justify-center border border-gray-300 rounded-3xl bg-white shadow-2xl p-8 sm:p-12 md:p-16"
      >
        {/* Ultra dynamic platform title with reflective colorful border effect */}
        <motion.h2
          variants={fadeInUp(0.2)}
          className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-700 to-pink-600 text-3xl sm:text-4xl md:text-5xl text-center drop-shadow-lg select-none relative"
        >
          AI-Powered Interview Platform

          {/* Colorful glow effect using ::after pseudo-element */}
          <span className="absolute inset-0 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 opacity-40 blur-md rounded-full animate-pulse"></span>
        </motion.h2>

        {/* Job Position */}
        <motion.h3
          variants={fadeInUp(0.4)}
          className="font-bold text-gray-900 text-center mt-6 text-2xl sm:text-3xl md:text-4xl leading-tight"
        >
          {interviewData?.jobPosition || 'Loading Interview Title...'}
        </motion.h3>

        {/* Duration with icon */}
        <motion.div
          variants={fadeInUp(0.6)}
          className="flex gap-3 items-center text-indigo-600 mt-3 text-lg sm:text-xl font-semibold"
        >
          <Clock className="w-5 h-5" />
          <span>{interviewData?.Duration || '...'} </span>
        </motion.div>

        {/* Name Input */}
        <motion.div variants={fadeInUp(0.8)} className="w-full mt-10 max-w-xl">
          <label htmlFor="userName" className="block mb-2 text-gray-700 font-semibold text-base sm:text-lg">
            Enter your full name
          </label>
          <Input
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="e.g. John Smith"
            className="bg-gray-50 focus-visible:ring-indigo-500 border border-gray-300 transition-all rounded-lg px-4 py-3 text-lg"
          />
        </motion.div>

        {/* Email Input */}
        <motion.div variants={fadeInUp(1)} className="w-full mt-6 max-w-xl">
          <label htmlFor="userEmail" className="block mb-2 text-gray-700 font-semibold text-base sm:text-lg">
            Enter your Email
          </label>
          <Input
            id="userEmail"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="e.g. john@gmail.com"
            type="email"
            className="bg-gray-50 focus-visible:ring-indigo-500 border border-gray-300 transition-all rounded-lg px-4 py-3 text-lg"
          />
        </motion.div>

        {/* Info Box */}
        <motion.div
          variants={fadeInUp(1.2)}
          className="p-5 bg-indigo-50 border border-indigo-200 flex flex-col sm:flex-row gap-4 rounded-xl mt-8 w-full max-w-xl"
        >
          <Info className="text-indigo-600 mt-1 min-w-[24px] h-6 w-6" />
          <div>
            <h4 className="font-semibold text-indigo-900 mb-2 text-lg sm:text-xl">Before you begin</h4>
            <ul className="text-indigo-800 list-disc ml-6 space-y-2 text-base sm:text-lg">
              <li>Test your camera and microphone</li>
              <li>Ensure you have a stable internet connection</li>
              <li>Find a quiet place for the interview</li>
            </ul>
          </div>
        </motion.div>

             {/* Join Button */}
        <motion.div
          variants={fadeInUp(1.4)}
          whileHover={{ scale: 1.08, boxShadow: '0 0 20px rgba(99, 102, 241, 0.8)' }}
          whileTap={{ scale: 0.95 }}
          className="w-full mt-10"
        >
          <Button
            className="w-full font-bold flex gap-2 justify-center items-center text-white bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 shadow-lg rounded-lg py-3"
            disabled={loading || !userName || !userEmail}
            onClick={onJoinInterview}
          >
            {loading ? (
              <Loader2Icon className="animate-spin text-white w-5 h-5" />
            ) : (
              <Video className="w-5 h-5" />
            )}
            {loading ? 'Joining Interview...' : 'Join Interview'}
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Interview;


// import React from 'react'
// import  moment from 'moment'

// function InterviewCard({interview}) {
//   return (
//     <div className='p-5 bg-white rounded-lg border'>
//         <div className='flex items-center justify-between'>
//             <div className='h-[40px] w-[40px] bg-primary rounded-full'>
//                 <h2 className='text-sm'>{moment(interview?.created_at).format('DD MMM yyy')}</h2>
                

//             </div>
//             <h2 className='mt-3  font-bold text-lg'>
//               {interview?.jobPosition}  
//             </h2>
//             <h2 className='mt-2'>{interview?.duration}</h2>
//         </div>
//     </div>
//   )
// }

// export default InterviewCard



// 'use client';

// import React from 'react';
// import moment from 'moment';
// import { motion } from 'framer-motion';
// import { Button } from '@/components/ui/button';
// import { Copy, Send } from 'lucide-react';
// import { toast } from 'sonner';

// function InterviewCard({ interview }) {

//    const url = process.env.NEXT_PUBLIC_HOST_URL +  interview?.interview_id;
//   const copyLink = () => {
   
//     navigator.clipboard.writeText(url);
//     toast('🔗 Interview link copied to clipboard!');
//   };

//   const onSend=()=>{
//           window.location.href="mailto:accounts@arunsingh.com?subject=AiCruiter Interview Link & body=Interview Link:"+ url
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 50, scale: 0.95 }}
//       animate={{ opacity: 1, y: 0, scale: 1 }}
//       whileHover={{ scale: 1.03 }}
//       whileTap={{ scale: 0.98 }}
//       transition={{ type: 'spring', stiffness: 100, damping: 15 }}
//       className="group relative overflow-hidden p-6 rounded-2xl bg-white shadow-md border border-gray-200 hover:shadow-xl transition-all duration-300 ease-in-out w-full max-w-lg min-h-[300px]"
//     >
//       {/* Top Row */}
//       <div className="flex justify-between items-center">
//         <div className="h-12 w-12 rounded-full bg-blue-600 shadow-md animate-pulse" />
//         <span className="text-sm text-gray-500 font-medium">
//           {moment(interview?.created_at).format('DD MMM YYYY')}
//         </span>
//       </div>

//       {/* Job Info */}
//       <div className="mt-5">
//         <h2 className="text-xl font-bold text-black">
//           Job Position: {interview?.jobPosition || 'N/A'}
//         </h2>
//         <p className="text-md font-bold text-gray-900 mt-1">
//           Duration: {interview?.Duration || 'N/A'}
//         </p>
//       </div>

//       {/* Buttons */}
//       <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
//         <Button
//           variant="outline"
//           onClick={copyLink}
//           className="flex items-center justify-center gap-2 text-sm border-gray-300 hover:bg-gray-100 w-full"
//         >
//           <Copy className="h-4 w-4" /> Copy Link
//         </Button>
//         <Button
//           className="flex items-center justify-center gap-2 text-sm bg-blue-600 text-white hover:bg-blue-700 w-full" onClick={onSend}
//         >
//           <Send className="h-4 w-4" /> Send
//         </Button>
//       </div>
//     </motion.div>
//   );
// }

// export default InterviewCard;


'use client';

import React from 'react';
import moment from 'moment';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Copy, Send } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

function InterviewCard({ interview , viewDetail=false }) {
  const url = process.env.NEXT_PUBLIC_HOST_URL + interview?.interview_id;

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    toast('🔗 Interview link copied to clipboard!');
  };

  const onSend = () => {
    window.location.href =
      'mailto:accounts@arunsingh.com?subject=AiCruiter Interview Link&body=Interview Link: ' + url;
  };

  return (
    <div className="relative group w-full max-w-lg mx-auto z-10">
      {/* Outer Multicolor Glow */}
      <div className="absolute -inset-1 rounded-2xl bg-[conic-gradient(from_0deg_at_50%_50%,#ff00cc,#3333ff,#00ffff,#00ff00,#ffff00,#ff6600,#ff0000,#ff00cc)] blur-xl opacity-70 group-hover:opacity-100 animate-spin-slow pointer-events-none z-[-1]" />

      {/* Actual Card */}
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 100, damping: 15 }}
        className="relative z-10 overflow-hidden p-6 rounded-2xl bg-white shadow-lg border border-gray-200 w-full min-h-[300px]"
      >
        {/* Top Row */}
        <div className="flex justify-between items-center">
          <div className="h-12 w-12 rounded-full bg-blue-600 shadow-md animate-pulse" />
          <span className="text-sm text-gray-500 font-medium">
            {moment(interview?.created_at).format('DD MMM YYYY')}
          </span>
        </div>

        {/* Job Info */}
        <div className="mt-5">
          <h2 className="text-xl font-bold text-black">
            Job Position: {interview?.jobPosition || 'N/A'}
          </h2>
          <p className="text-md font-bold text-gray-900 mt-1 flex justify-between ">
            Duration: {interview?.Duration || 'N/A'}
            <span className='text-green-700'>{interview['interview-feedback']?.length} Candidates</span>
          </p>
        </div>

        {/* Buttons */}
    {!viewDetail?<div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          <Button
            variant="outline"
            onClick={copyLink}
            className="flex items-center justify-center gap-2 text-sm border-gray-300 hover:bg-gray-100 w-full"
          >
            <Copy className="h-4 w-4" /> Copy Link
          </Button>
          <Button
            onClick={onSend}
            className="flex items-center justify-center gap-2 text-sm bg-blue-600 text-white hover:bg-blue-700 w-full"
          >
            <Send className="h-4 w-4" /> Send
          </Button>
        </div> : <Link href={ '/scheduled-interview/' + interview?.interview_id + "/details" } ><Button className="mt-10 w-full" variant="outline">View Detail<ArrowRight/></Button> </Link>}
      </motion.div> 
    </div>
  );
}

export default InterviewCard;

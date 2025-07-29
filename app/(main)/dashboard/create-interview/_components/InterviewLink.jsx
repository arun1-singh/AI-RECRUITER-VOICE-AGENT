// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { ArrowLeft, Clock, Copy,List, Mail, Plus } from 'lucide-react'
// import Image from 'next/image'
// import React from 'react'

// function InterviewLink({interviewId,formData}) {

//     const GetInterviewUrl=()=>{
//         const url=process.env.NEXT_PUBLIC_HOST_URL+'/'+interviewId
//         return url;
//     }
//   return (
//     <div className='flex flex-col items-center w-full justify-center mt-10 '>
//         <Image src={'/check.png'} alt='check' width={200} height={200} className='w-[50px] h-[50px]'/>
//         <h2 className='font-bold text-lg mt-4'>Your AI Interview is Ready!</h2>
//         <p className='font-medium mt-3'>Share this link with your candidates to start the interview process.</p>
//         <div className='w-full p-7 mt-6 rounded-lg bg-white'>
//             <div className='flex justify-between items-center '>
//                 <h2 className='font-bold'>Interview Link</h2>
//                 <h2 className='p-1 px-2 text-primary bg-blue-50 rounded-xl'>Valid for 30 Days</h2>
//                 </div>
//                  <div className='mt-3 flex gap-3 items-center '>
//                     <Input defaultValue={GetInterviewUrl()} disabled={true} />
//                     <Button><Copy/>Copy Link</Button>
//                 </div>
//                 <hr className='my-5'/>
//                 <div className='flex gap-5'>
//                     <h2 className='text-sm text-gray-500 flex gap-2 items-center'><Clock className='h-4 w-4'/> {formData?.duration}</h2>
//                         <h2 className='text-sm text-gray-500 flex gap-2 items-center'><List className='h-4 w-4'/> 10 Questions</h2>
                            
//                 </div>
//         </div>
//         <div className='mt-7 bg-white p-5 rounded-lg w-full'>
//             <h2 className='font-bold'>Share Via</h2>
//             <div className='flex gap-7 mt-2'>
//             <Button variant={'outline'} className='w-full'><Mail/>Email</Button>
//             <Button variant={'outline'} className='w-full'><Mail/>Slack</Button>
//             <Button variant={'outline'} className='w-full'><Mail/>Whatsapp</Button>
//             </div>

//         </div>
//         <div className='flex w-full gap-5 justify-between mt-6 '>
//             <Button variant={'outline'}><ArrowLeft/>Back to Dashboard</Button>
//             <Button><Plus/>Create New Interview</Button>

//         </div>
//     </div>
//   )
// }

// export default InterviewLink

'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Clock, Copy, List, Mail, Plus } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'
import { FaWhatsapp, FaSlack } from 'react-icons/fa' // ✅ real icons
import Link from 'next/link'
import { toast } from 'sonner'

function InterviewLink({ interview_id, formData }) {

    const url = process.env.NEXT_PUBLIC_HOST_URL + '/' + interview_id;

  const GetInterviewUrl = () => {
    return url;
  }


  const onCopyLink=async()=>{
     await navigator.clipboard.writeText(url);
     toast('Link Copied')
  }
  return (
    <div className="flex flex-col items-center w-full max-w-3xl mx-auto justify-center mt-10 px-6">
      
      {/* ✅ Animated Check Icon with Live Glow */}
      <motion.div
        className="bg-green-100 rounded-full p-5"
        animate={{
          scale: [1, 1.15, 1],
          boxShadow: ['0 0 0px #34D399', '0 0 20px #34D399', '0 0 0px #34D399']
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Image src="/check.png" alt="check" width={80} height={80} className="w-[60px] h-[60px]" />
      </motion.div>

      <h2 className="font-bold text-2xl mt-6 text-center text-gray-800">Your AI Interview is Ready!</h2>
      <p className="text-gray-600 mt-2 text-center text-sm">Share this link with your candidates to start the interview process.</p>

      {/* ✅ Interview Link Section */}
      <div className="w-full p-6 mt-6 rounded-xl bg-white shadow-md border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-lg text-gray-800">Interview Link</h2>
          <span className="text-xs text-blue-600 bg-blue-100 px-3 py-1 rounded-full">Valid for 30 Days</span>
        </div>

        <div className="flex gap-3 items-center">
          <Input defaultValue={GetInterviewUrl()} disabled className="bg-gray-50" />
          <Button variant="default" className="flex gap-2 items-center" onClick={()=>onCopyLink()}><Copy className="w-4 h-4" />Copy Link</Button>
        </div>

        <hr className="my-6 border-gray-200" />

        <div className="flex gap-5 text-sm text-gray-600">
          <div className="flex items-center gap-2"><Clock className="h-4 w-4" /> {formData?.duration}</div>
          <div className="flex items-center gap-2"><List className="h-4 w-4" /> 10 Questions</div>
        </div>
      </div>

      {/* ✅ Share Via Buttons (Updated Icons) */}
      <div className="mt-7 bg-white p-6 rounded-xl w-full shadow-sm border border-gray-100">
        <h2 className="font-semibold text-gray-800 mb-4">Share Via</h2>
        <div className="flex flex-wrap md:flex-nowrap gap-4 justify-between w-full">
          <div className="flex-1">
            <Button variant="outline" className="w-full flex gap-2 justify-center items-center">
              <Mail className="h-4 w-4" />Email
            </Button>
          </div>
          <div className="flex-1">
            <Button variant="outline" className="w-full flex gap-2 justify-center items-center">
              <FaSlack className="h-4 w-4" />Slack
            </Button>
          </div>
          <div className="flex-1">
            <Button variant="outline" className="w-full flex gap-2 justify-center items-center">
              <FaWhatsapp className="h-4 w-4" />WhatsApp
            </Button>
          </div>
        </div>
      </div>

      {/* ✅ Bottom Buttons */}
      <div className="flex w-full gap-5 justify-between mt-8">
        <Link href={'/dashboard'}>
        <Button variant="outline" className="flex gap-2"><ArrowLeft className="w-4 h-4" />Back to Dashboard</Button></Link>
        <Link href={'/create-interview'}>
        <Button className="flex gap-2"><Plus className="w-4 h-4" />Create New Interview</Button></Link>
      </div>
    </div>
  )
}

export default InterviewLink

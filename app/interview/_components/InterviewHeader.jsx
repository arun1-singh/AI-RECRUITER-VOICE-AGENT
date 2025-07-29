// import Image from 'next/image'
// import React from 'react'

// function InterviewHeader() {
//   return (
//     <div className='p-4 shadow-sm'>
//       <Image src={'/logo.png'} alt='logo' width={200} height={100} className='w-[140px] rounded-full' /> 
//     </div>
//   )
// }

// export default InterviewHeader

'use client'
import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'

const InterviewHeader = () => {
  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="sticky top-4 z-50 w-[95%] max-w-3xl mx-auto bg-white/30 backdrop-blur-lg border border-white/20 shadow-lg rounded-3xl px-6 py-4"
    >
      <div className="relative flex flex-col items-center justify-center">
        {/* Glowing animated aura */}
        <motion.div
          animate={{
            scale: [1, 1.12, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: 'easeInOut',
          }}
          className="absolute w-[160px] h-[160px] sm:w-[200px] sm:h-[200px] rounded-full bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-500 blur-3xl z-0"
        />

        {/* Logo */}
        <motion.div
          animate={{ y: [0, -6, 0], rotate: [0, 1, -1, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          whileHover={{
            scale: 1.1,
            boxShadow: '0px 8px 30px rgba(99, 102, 241, 0.6)',
          }}
          className="z-10"
        >
          <Image
            src="/logo.png"
            alt="logo"
            width={160}
            height={100}
            className="w-[120px] sm:w-[150px] md:w-[170px] rounded-full border-2 border-white shadow-xl transition duration-300"
          />
        </motion.div>

        {/* Tagline */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-4 text-sm sm:text-base text-center font-semibold"
        >
          <motion.span
            animate={{
              opacity: [1, 0.8, 1],
              x: [0, -2, 2, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent"
          >
            Your AI Interview Assistant — Fast. Smart. Human-like.
          </motion.span>
        </motion.h2>
      </div>
    </motion.header>
  )
}

export default InterviewHeader

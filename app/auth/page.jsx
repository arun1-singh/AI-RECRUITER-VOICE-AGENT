// import React from 'react'
// import Image from 'next/image'

// function Login() {
//   return (
//     <div className='flex flex-col items-center justify-center h-screen'>
//       <div className='flex flex-col items-center'>
//         <Image src={'/logo.png'} alt='logo' width={400} height={100} className='w-[180px]'/>
//         <div>
//           <Image src={'/login.png'} alt='login' width={600} height={400} className='w-[400px] h-[250px] mb-10'/>

//         </div>
//       </div>
//     </div>
//   )
// }

// export default Login
// "use client"
// import React from 'react'
// import Image from 'next/image'
// import { Button } from '@/components/ui/button'
// import { supabase } from './services/supabaseClient'

// function Login() {

//   /**
//    * Used to Sign With Google
//    */
//   const signInWithGoogle=async()=>{
//     const {error} = await supabase.auth.signInWithOAuth({
//       provider:'google'
//     })
//     if(error)
//     {
//       console.error('Error:',error.message)
//     }

//   }
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-sky-50 to-sky-100 p-4">
//       {/* Container for Logo + Image */}
//       <div className="flex flex-col items-center rounded-2xl p-6 shadow-lg bg-white hover:scale-[1.01] transition-all duration-300 ease-in-out">
        
//         {/* AI Recruiter Logo */}
//         <Image
//           src="/logo.png"
//           alt="AI Recruiter"
//           width={400}
//           height={100}
//           className="w-[180px] object-contain mb-0 hover:scale-105 transition-transform duration-300"
//         />

//         {/* AI Resource Management Image */}
//         <Image
//           src="/login.png"
//           alt="AI Resource Management"
//           width={600}
//           height={400}
//           className="w-[400px] h-[250px] object-contain mt-0 hover:scale-105 transition-transform duration-300"
//         />
//         <h2 className="text-2xl font-bold text-center mt-5">Welcome To AI-RECRUITER</h2>
//         <p className='text-gray-500 text-center'>Sign In With Google Authentication </p>
//         <Button className="mt-7 w-full" onClick={signInWithGoogle}>Login With Google</Button>
//       </div>
//     </div>
//   )
// }

// export default Login

// 'use client';

// import React, { useEffect, useState } from 'react';
// import Image from 'next/image';
// import { useRouter } from 'next/navigation';
// import { Button } from '@/components/ui/button';
// import { supabase } from './services/supabaseClient';

// function Login() {
//   const router = useRouter();
//   const [checkingSession, setCheckingSession] = useState(true);

//   useEffect(() => {
//     // Optional: Automatically redirect if session exists
//     const checkSession = async () => {
//       const { data: { session } } = await supabase.auth.getSession();
//       if (session) {
//         router.push('/dashboard');
//       } else {
//         setCheckingSession(false);
//       }
//     };
//     checkSession();
//   }, [router]);

//   const signInWithGoogle = async () => {
//     const { data: { session } } = await supabase.auth.getSession();

//     // Force sign-out to always go through Google OAuth flow again
//     if (session) {
//       await supabase.auth.signOut();
//     }

//     const { error } = await supabase.auth.signInWithOAuth({
//       provider: 'google',
//       options: {
//         redirectTo: `${window.location.origin}/auth/callback`,
//       },
//     });

//     if (error) {
//       console.error('OAuth Error:', error.message);
//     }
//   };

//   if (checkingSession) {
//     return <div className="text-center py-20 text-xl text-gray-600">Checking session...</div>;
//   }

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-sky-50 to-sky-100 p-4">
//       <div className="flex flex-col items-center rounded-2xl p-6 shadow-lg bg-white hover:scale-[1.01] transition-all duration-300 ease-in-out">
//         <Image
//           src="/logo.png"
//           alt="AI Recruiter"
//           width={400}
//           height={100}
//           className="w-[180px] object-contain mb-0 hover:scale-105 transition-transform duration-300"
//         />
//         <Image
//           src="/login.png"
//           alt="AI Resource Management"
//           width={600}
//           height={400}
//           className="w-[400px] h-[250px] object-contain mt-0 hover:scale-105 transition-transform duration-300"
//         />
//         <h2 className="text-2xl font-bold text-center mt-5">Welcome To AI-RECRUITER</h2>
//         <p className="text-gray-500 text-center">Sign In With Google Authentication</p>
//         <Button className="mt-7 w-full" onClick={signInWithGoogle}>
//           Login With Google
//         </Button>
//       </div>
//     </div>
//   );
// }

// export default Login;


'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { supabase } from './services/supabaseClient';

function Login() {
  const router = useRouter();
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        router.push('/dashboard');
      } else {
        setCheckingSession(false);
      }
    };

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        router.push('/dashboard');
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  // ✅ REPLACE OLD FUNCTION with this one
  const signInWithGoogle = async () => {
    await supabase.auth.signOut();         // 1. Sign out from Supabase
    localStorage.clear();                  // 2. Clear cache if any

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          prompt: 'select_account',       // ✅ 3. Force Google account picker
        },
      },
    });

    if (error) {
      console.error('OAuth Error:', error.message);
    }
  };

  if (checkingSession) {
    return (
      <div className="text-center py-20 text-xl text-gray-600">
        Checking session...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-sky-50 to-sky-100 p-4">
      <div className="flex flex-col items-center rounded-2xl p-6 shadow-lg bg-white hover:scale-[1.01] transition-all duration-300 ease-in-out">
        <Image
          src="/logo.png"
          alt="AI Recruiter"
          width={400}
          height={100}
          className="w-[180px] object-contain mb-0 hover:scale-105 transition-transform duration-300"
        />
        <Image
          src="/login.png"
          alt="AI Resource Management"
          width={600}
          height={400}
          className="w-[400px] h-[250px] object-contain mt-0 hover:scale-105 transition-transform duration-300"
        />
        <h2 className="text-2xl font-bold text-center mt-5">
          Welcome To AI-RECRUITER
        </h2>
        <p className="text-gray-500 text-center">
          Sign In With Google Authentication
        </p>
        <Button className="mt-7 w-full" onClick={signInWithGoogle}>
          Login With Google
        </Button>
      </div>
    </div>
  );
}

export default Login;


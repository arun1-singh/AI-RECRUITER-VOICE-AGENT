// 'use client';

// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { supabase } from '@/app/auth/services/supabaseClient';

// export default function Callback() {
//   const router = useRouter();

//   useEffect(() => {
//     const redirect = async () => {
//       const { data: { session } } = await supabase.auth.getSession();
//       if (session) {
//         router.push('/dashboard');
//       } else {
//         router.push('/auth'); // fallback
//       }
//     };
//     redirect();
//   }, [router]);

//   return <div className="text-center py-20 text-xl text-gray-600">Redirecting...</div>;
// }


'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/app/auth/services/supabaseClient';

export default function Callback() {
  const router = useRouter();

  useEffect(() => {
    const verifySession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (session && session.user && !error) {
        router.push('/dashboard');
      } else {
        await supabase.auth.signOut();     // Clean up
        localStorage.clear();              // Clear any possible leftovers
        router.push('/auth');              // Send to login
      }
    };

    verifySession();
  }, [router]);

  return (
    <div className="text-center py-20 text-xl text-gray-600">
      Redirecting...
    </div>
  );
}

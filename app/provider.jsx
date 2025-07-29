// "use client"
// import React, { useContext, useEffect, useState } from "react";
// import { supabase } from "./auth/services/supabaseClient";
// import { UserDetailContext } from "./context/UserDetailContext";

// function Provider({ children }) {


//     const [user, setUser] = useState();
//     useEffect(() => {
//         CreateNewUser();
//     }, [])

//     const CreateNewUser = () => {

//         supabase.auth.getUser().then(async ({ data: { user } }) => {

//             //Check if user already exists
//             let { data: Users, error } = await supabase
//                 .from('Users')
//                 .select("*")
//                 .eq('email', user?.email);
//             console.log(Users)


//             //If not then create new user
//             if (Users?.length == 0) {
//                 const { data, error } = await supabase.from("Users")
//                     .insert([
//                         {
//                             name: user?.user_metadata?.name,
//                             email: user?.email,
//                             picture: user?.user_metadata?.picture
//                         }
//                     ])
//                 console.log(data);
//                 setUser(data);
//                 return;
//             }
//             setUser(Users[0]);
//         })

//         //Check if user already exists

//         //If not then create new user
//     }
//     return (

//         <UserDetailContext.Provider value={{ user, setUser }}>
//             <div>{children}</div>
//         </UserDetailContext.Provider>
//     )
// }
// export default Provider

// export const useUser = () => {
//     const context = useContext(UserDetailContext);
//     return context;
// }
// 'use client';

// import React, { useEffect } from 'react';
// import { supabase } from './auth/services/supabaseClient';

// function Provider({ children }) {
//   useEffect(() => {
//     console.log('✅ Provider mounted');
//     CreateNewUser();
//   }, []);

//   const CreateNewUser = () => {
//     console.log('🚀 Running CreateNewUser');

//     supabase.auth.getUser().then(async ({ data: { user }, error: authError }) => {
//       if (authError) {
//         console.error('❌ Auth error:', authError.message);
//         return;
//       }

//       if (!user) {
//         console.warn('⚠️ No authenticated user found');
//         return;
//       }

//       console.log('👤 Authenticated user:', user);

//       // Check if user already exists
//       const { data: Users, error: selectError } = await supabase
//         .from('Users')
//         .select('*')
//         .eq('email', user.email);

//       if (selectError) {
//         console.error('❌ Error fetching Users table:', selectError.message);
//         return;
//       }

//       console.log('ℹ️ Existing users found:', Users?.length);

//       // If not then create new user
//       if (!Users || Users.length === 0) {
//         console.warn('⚠️ User not found in Users table. Inserting now...');

//         const { data: insertData, error: insertError } = await supabase
//           .from('Users')
//           .insert([
//             {
//               name: user.user_metadata?.name || 'Unnamed',
//               email: user.email,
//               picture: user.user_metadata?.picture || null,
//             },
//           ]);

//         if (insertError) {
//           console.error('❌ Insert error:', insertError.message);
//         } else {
//           console.log('✅ New user inserted successfully:', insertData);
//         }
//       } else {
//         console.log('✅ User already exists in Users table. Skipping insert.');
//       }
//     });
//   };

//   return <div>{children}</div>;
// }

// export default Provider;

"use client";

import React, { useContext, useEffect, useState } from "react";
import { supabase } from "./auth/services/supabaseClient";
import { UserDetailContext } from "./context/UserDetailContext";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

function Provider({ children }) {
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchOrCreateUser = async () => {
      try {
        const {
          data: { user: authUser },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError || !authUser) {
          console.warn("⚠️ No authenticated user found or auth error:", authError?.message);
          return;
        }

        // Check if user already exists
        const { data: existingUsers, error: fetchError } = await supabase
          .from("Users")
          .select("*")
          .eq("email", authUser.email);

        if (fetchError) {
          console.error("❌ Error fetching users:", fetchError.message);
          return;
        }

        if (!existingUsers || existingUsers.length === 0) {
          // Insert new user
          const { data: newUser, error: insertError } = await supabase
            .from("Users")
            .insert([
              {
                name: authUser.user_metadata?.name || "Unnamed",
                email: authUser.email,
                picture: authUser.user_metadata?.picture || null,
              },
            ])
            .select(); // Ensure we get inserted row back

          if (insertError) {
            console.error("❌ Error inserting new user:", insertError.message);
            return;
          }

          console.log("✅ New user created:", newUser[0]);
          setUser(newUser[0]);
        } else {
          console.log("✅ User exists:", existingUsers[0]);
          setUser(existingUsers[0]);
        }
      } catch (err) {
        console.error("❌ Unexpected error in fetchOrCreateUser:", err);
      }
    };

    fetchOrCreateUser();
  }, []);

  return (
    <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}>
    <UserDetailContext.Provider value={{ user, setUser }}>
      {children}
    </UserDetailContext.Provider>
    </PayPalScriptProvider>
  );
}

export default Provider;

// Custom hook
export const useUser = () => {
  const context = useContext(UserDetailContext);
  if (!context) {
    throw new Error("useUser must be used within a UserDetailContext.Provider");
  }
  return context;
};

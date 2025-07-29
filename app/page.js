// 'use client';

// import { useState, useEffect } from 'react';
// import { supabase } from './auth/services/supabaseClient';
// import { motion } from 'framer-motion';
// import { Button } from '@/components/ui/button';
// import { ArrowRight, Mic, Clock, BarChart3, Users, Play } from 'lucide-react';

// export default function LandingPage() {
//   const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 20);
//     window.addEventListener('scroll', handleScroll);

    
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const features = [
//     {
//       icon: Clock,
//       title: 'Automated Scheduling',
//       desc: 'Easily schedule interviews with AI without any manual coordination.',
//     },
//     {
//       icon: BarChart3,
//       title: 'Smart Analytics',
//       desc: 'Receive performance metrics and feedback with actionable insights.',
//     },
//     {
//       icon: Users,
//       title: 'Bias-Free Evaluation',
//       desc: 'Fair and objective interviews that reduce unconscious hiring bias.',
//     },
//   ];

//   const steps = [
//     {
//       step: '1',
//       title: 'Create Interview',
//       desc: 'Set up your job requirements and customize interview questions.',
//     },
//     {
//       step: '2',
//       title: 'Share with Candidates',
//       desc: 'Send interview links to candidates to complete at their convenience.',
//     },
//     {
//       step: '3',
//       title: 'Review Results',
//       desc: 'Get AI-analyzed results, transcripts, and candidate comparisons.',
//     },
//   ];

//   return (
//     <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 text-slate-900 overflow-hidden">
//       {/* Floating Background Animations */}
//       <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
//         <motion.div
//           initial={{ opacity: 0, y: -40 }}
//           animate={{ opacity: 0.1, y: 0 }}
//           transition={{ duration: 1.5, delay: 0.5 }}
//           className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur-3xl animate-pulse"
//         />
//         <motion.div
//           initial={{ opacity: 0, x: 100 }}
//           animate={{ opacity: 0.15, x: 0 }}
//           transition={{ duration: 1.5, delay: 1 }}
//           className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-tr from-blue-400 to-violet-500 rounded-full blur-2xl animate-pulse"
//         />
//       </div>

//       {/* HEADER */}
//       <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-lg shadow-slate-900/5' : 'bg-transparent'}`}>
//         <div className="container mx-auto px-6 lg:px-8">
//           <div className="flex h-16 items-center justify-between">
//             <div className="flex items-center gap-3 group">
//               <div className="relative">
//                 <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
//                 <Mic className="relative h-8 w-8 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
//               </div>
//               <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
//                 AiCruiter
//               </span>
//             </div>
//             <nav className="hidden md:flex items-center gap-8">
//               {['Features', 'How It Works', 'Pricing'].map((item) => (
//                 <a
//                   key={item}
//                   href={`#${item.toLowerCase().replace(' ', '-')}`}
//                   className="text-slate-600 hover:text-blue-600 font-medium transition-all duration-300 relative group"
//                 >
//                   {item}
//                   <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 group-hover:w-full transition-all duration-300"></span>
//                 </a>
//               ))}
//             </nav>
//             <Button onClick={async () => {
//                   const { data: { session } } = await supabase.auth.getSession();
//                   if (session) {
//                     window.location.href = '/dashboard';
//                   } else {
//                     window.location.href = '/auth';
//                   }
//                 }} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
//               Dashboard
//             </Button>
//           </div>
//         </div>
//       </header>

//       {/* HERO SECTION */}
//       <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 z-10">
//         <div className="container mx-auto px-6 lg:px-8 relative">
//           <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
//             <motion.div
//               initial={{ opacity: 0, y: 50 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 1.2 }}
//               className="space-y-8"
//             >
//               <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
//                 <span className="text-slate-900">AI-Powered</span>
//                 <br />
//                 <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-gradient">
//                   Interview Assistant
//                 </span>
//                 <br />
//                 <span className="text-slate-900">for Modern Recruiters</span>
//               </h1>
//               <p className="text-xl text-slate-600 leading-relaxed max-w-2xl">
//                 Let our AI voice agent conduct candidate interviews while you focus on finding the perfect match.
//                 Save time, reduce bias, and improve your hiring process with cutting-edge technology.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-4">
//                 <Button onClick={async () => {
//                 const { data: { session } } = await supabase.auth.getSession();
//                 if (session) {
//                   window.location.href = '/dashboard';
//                 } else {
//                   window.location.href = '/auth';
//                 }
//               }} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group">
//                   Create Interview
//                   <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
//                 </Button>
//                 <Button variant="outline" className="border-2 border-slate-300 hover:border-blue-600 hover:text-blue-600 transition-all duration-300 hover:shadow-lg">
//                   Watch Demo
//                 </Button>
//               </div>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, y: 60 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 1 }}
//               className="relative"
//             >
//               <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 group">
//                 <img
//                   src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg"
//                   alt="AI Interview Assistant Interface"
//                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
//                 />
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <div className="relative">
//                     <div className="absolute inset-0 bg-white/20 backdrop-blur-md rounded-full animate-ping"></div>
//                     <Button
//                       size="lg"
//                       className="relative bg-white/90 hover:bg-white text-blue-600 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 rounded-full p-6"
//                     >
//                       <Play className="h-8 w-8 ml-1" fill="currentColor" />
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* FEATURES SECTION */}
//       <section id="features" className="py-20 bg-white text-center z-10 relative">
//         <div className="container mx-auto px-6">
//           <motion.h2 className="text-4xl font-bold mb-12">Streamline Your Hiring Process</motion.h2>
//           <h3 className="font-bold my-5 text-xl text-gray-500">AiCruiter helps you save time and find better candidates with our advanced AI interview technology.</h3>
//           <div className="grid md:grid-cols-3 gap-8">
//             {features.map((f, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8, delay: i * 0.2 }}
//                 className="p-6 border border-slate-200 rounded-xl shadow hover:shadow-lg bg-slate-50"
//               >
//                 <f.icon className="w-10 h-10 mb-4 text-blue-600" />
//                 <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
//                 <p className="text-slate-600">{f.desc}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* HOW IT WORKS SECTION */}
//       <section id="how-it-works" className="py-24 bg-slate-50 text-center z-10 relative">
//         <div className="container mx-auto px-6">
//           <motion.h2 className="text-4xl md:text-5xl font-bold mb-4">How AiCruiter Works</motion.h2>
//           <p className="text-gray-500 text-lg mb-12">Three simple steps to transform your recruitment process</p>
//           <div className="grid md:grid-cols-3 gap-12">
//             {steps.map((item, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.7, delay: i * 0.2 }}
//                 className="space-y-4"
//               >
//                 <div className="w-14 h-14 mx-auto rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-lg">
//                   {item.step}
//                 </div>
//                 <h3 className="text-xl font-semibold">{item.title}</h3>
//                 <p className="text-gray-500 max-w-sm mx-auto">{item.desc}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA SECTION */}
//       <section className="py-20 bg-white text-center z-10 relative">
//         <div className="container mx-auto px-6">
//           <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Ready to Transform Your Hiring Process?</h2>
//           <p className="text-lg text-slate-600 mb-8">Join hundreds of companies already using AiCruiter to find the best talent.</p>
//           <div className="flex flex-col sm:flex-row justify-center gap-4">
//             <Button onClick={() => window.location.href = '/auth'} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow">Get Started for Free</Button>
//             <Button variant="outline" onClick={() => window.location.href = '/auth'} className="px-6 py-3 border rounded-xl shadow">Schedule a Demo</Button>
//           </div>
//         </div>
//       </section>

//       {/* FOOTER */}
//       <footer className="bg-slate-900 text-white py-12 text-center mt-20">
//         <div className="container mx-auto px-6">
//           <div className="flex flex-col items-center space-y-4">
//             <Mic className="h-10 w-10 text-blue-400" />
//             <p className="text-lg font-semibold">AiCruiter — Your AI Interview Assistant</p>
//             <p className="text-sm text-slate-400">© 2025 AiCruiter. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>
//     </main>
//   );
// }

// 'use client';

// import { useState, useEffect } from 'react';
// import { supabase } from './auth/services/supabaseClient';
// import { motion } from 'framer-motion';
// import { Button } from '@/components/ui/button';
// import { ArrowRight, Mic, Clock, BarChart3, Users, Play } from 'lucide-react';

// export default function LandingPage() {
//   const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 20);
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const navigateToAuth = async () => {
//     window.location.href = '/auth';
//   };

//   const features = [
//     {
//       icon: Clock,
//       title: 'Automated Scheduling',
//       desc: 'Easily schedule interviews with AI without any manual coordination.',
//     },
//     {
//       icon: BarChart3,
//       title: 'Smart Analytics',
//       desc: 'Receive performance metrics and feedback with actionable insights.',
//     },
//     {
//       icon: Users,
//       title: 'Bias-Free Evaluation',
//       desc: 'Fair and objective interviews that reduce unconscious hiring bias.',
//     },
//   ];

//   const steps = [
//     {
//       step: '1',
//       title: 'Create Interview',
//       desc: 'Set up your job requirements and customize interview questions.',
//     },
//     {
//       step: '2',
//       title: 'Share with Candidates',
//       desc: 'Send interview links to candidates to complete at their convenience.',
//     },
//     {
//       step: '3',
//       title: 'Review Results',
//       desc: 'Get AI-analyzed results, transcripts, and candidate comparisons.',
//     },
//   ];

//   return (
//     <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 text-slate-900 overflow-hidden">
//       <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
//         <motion.div initial={{ opacity: 0, y: -40 }} animate={{ opacity: 0.1, y: 0 }} transition={{ duration: 1.5, delay: 0.5 }} className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur-3xl animate-pulse" />
//         <motion.div initial={{ opacity: 0, x: 100 }} animate={{ opacity: 0.15, x: 0 }} transition={{ duration: 1.5, delay: 1 }} className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-tr from-blue-400 to-violet-500 rounded-full blur-2xl animate-pulse" />
//       </div>
//       <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-lg shadow-slate-900/5' : 'bg-transparent'}`}>
//         <div className="container mx-auto px-6 lg:px-8">
//           <div className="flex h-16 items-center justify-between">
//             <div className="flex items-center gap-3 group">
//               <div className="relative">
//                 <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
//                 <Mic className="relative h-8 w-8 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
//               </div>
//               <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">AiCruiter</span>
//             </div>
//             <nav className="hidden md:flex items-center gap-8">
//               {['Features', 'How It Works', 'Pricing'].map((item) => (
//                 <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-slate-600 hover:text-blue-600 font-medium transition-all duration-300 relative group">
//                   {item}
//                   <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 group-hover:w-full transition-all duration-300"></span>
//                 </a>
//               ))}
//             </nav>
//             <Button onClick={navigateToAuth} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">Dashboard</Button>
//           </div>
//         </div>
//       </header>
//       <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 z-10">
//         <div className="container mx-auto px-6 lg:px-8 relative">
//           <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
//             <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }} className="space-y-8">
//               <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
//                 <span className="text-slate-900">AI-Powered</span><br />
//                 <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-gradient">Interview Assistant</span><br />
//                 <span className="text-slate-900">for Modern Recruiters</span>
//               </h1>
//               <p className="text-xl text-slate-600 leading-relaxed max-w-2xl">
//                 Let our AI voice agent conduct candidate interviews while you focus on finding the perfect match. Save time, reduce bias, and improve your hiring process with cutting-edge technology.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-4">
//                 <Button onClick={navigateToAuth} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group">
//                   Create Interview
//                   <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
//                 </Button>
//                 <Button variant="outline" className="border-2 border-slate-300 hover:border-blue-600 hover:text-blue-600 transition-all duration-300 hover:shadow-lg">Watch Demo</Button>
//               </div>
//             </motion.div>
//             <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="relative">
//               <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 group">
//                 <img src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg" alt="AI Interview Assistant Interface" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <div className="relative">
//                     <div className="absolute inset-0 bg-white/20 backdrop-blur-md rounded-full animate-ping"></div>
//                     <Button size="lg" className="relative bg-white/90 hover:bg-white text-blue-600 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 rounded-full p-6">
//                       <Play className="h-8 w-8 ml-1" fill="currentColor" />
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </section>
//       <section id="features" className="py-20 bg-white text-center z-10 relative">
//         <div className="container mx-auto px-6">
//           <motion.h2 className="text-4xl font-bold mb-12">Streamline Your Hiring Process</motion.h2>
//           <h3 className="font-bold my-5 text-xl text-gray-500">AiCruiter helps you save time and find better candidates with our advanced AI interview technology.</h3>
//           <div className="grid md:grid-cols-3 gap-8">
//             {features.map((f, i) => (
//               <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: i * 0.2 }} className="p-6 border border-slate-200 rounded-xl shadow hover:shadow-lg bg-slate-50">
//                 <f.icon className="w-10 h-10 mb-4 text-blue-600" />
//                 <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
//                 <p className="text-slate-600">{f.desc}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>
//       <section id="how-it-works" className="py-24 bg-slate-50 text-center z-10 relative">
//         <div className="container mx-auto px-6">
//           <motion.h2 className="text-4xl md:text-5xl font-bold mb-4">How AiCruiter Works</motion.h2>
//           <p className="text-gray-500 text-lg mb-12">Three simple steps to transform your recruitment process</p>
//           <div className="grid md:grid-cols-3 gap-12">
//             {steps.map((item, i) => (
//               <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: i * 0.2 }} className="space-y-4">
//                 <div className="w-14 h-14 mx-auto rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-lg">{item.step}</div>
//                 <h3 className="text-xl font-semibold">{item.title}</h3>
//                 <p className="text-gray-500 max-w-sm mx-auto">{item.desc}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>
//       <section className="py-20 bg-white text-center z-10 relative">
//         <div className="container mx-auto px-6">
//           <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Ready to Transform Your Hiring Process?</h2>
//           <p className="text-lg text-slate-600 mb-8">Join hundreds of companies already using AiCruiter to find the best talent.</p>
//           <div className="flex flex-col sm:flex-row justify-center gap-4">
//             <Button onClick={navigateToAuth} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow">Get Started for Free</Button>
//             <Button variant="outline" onClick={navigateToAuth} className="px-6 py-3 border rounded-xl shadow">Schedule a Demo</Button>
//           </div>
//         </div>
//       </section>
//       <footer className="bg-slate-900 text-white py-12 text-center mt-20">
//         <div className="container mx-auto px-6">
//           <div className="flex flex-col items-center space-y-4">
//             <Mic className="h-10 w-10 text-blue-400" />
//             <p className="text-lg font-semibold">AiCruiter — Your AI Interview Assistant</p>
//             <p className="text-sm text-slate-400">© 2025 AiCruiter. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>
//     </main>
//   );
// }


'use client';

import { useState, useEffect } from 'react';
import { supabase } from './auth/services/supabaseClient';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Mic, Clock, BarChart3, Users, Play, LogOut } from 'lucide-react';

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);

    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };

    fetchSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      listener.subscription.unsubscribe();
    };
  }, []);

  const navigateToAuth = () => {
    window.location.href = '/auth';
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    window.location.href = '/auth';
  };

  const features = [
    {
      icon: Clock,
      title: 'Automated Scheduling',
      desc: 'Easily schedule interviews with AI without any manual coordination.',
    },
    {
      icon: BarChart3,
      title: 'Smart Analytics',
      desc: 'Receive performance metrics and feedback with actionable insights.',
    },
    {
      icon: Users,
      title: 'Bias-Free Evaluation',
      desc: 'Fair and objective interviews that reduce unconscious hiring bias.',
    },
  ];

  const steps = [
    {
      step: '1',
      title: 'Create Interview',
      desc: 'Set up your job requirements and customize interview questions.',
    },
    {
      step: '2',
      title: 'Share with Candidates',
      desc: 'Send interview links to candidates to complete at their convenience.',
    },
    {
      step: '3',
      title: 'Review Results',
      desc: 'Get AI-analyzed results, transcripts, and candidate comparisons.',
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 text-slate-900 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <motion.div initial={{ opacity: 0, y: -40 }} animate={{ opacity: 0.1, y: 0 }} transition={{ duration: 1.5, delay: 0.5 }} className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur-3xl animate-pulse" />
        <motion.div initial={{ opacity: 0, x: 100 }} animate={{ opacity: 0.15, x: 0 }} transition={{ duration: 1.5, delay: 1 }} className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-tr from-blue-400 to-violet-500 rounded-full blur-2xl animate-pulse" />
      </div>
      <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-lg shadow-slate-900/5' : 'bg-transparent'}`}>
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                <Mic className="relative h-8 w-8 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">AiCruiter</span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              {['Features', 'How It Works', 'Pricing'].map((item) => (
                <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-slate-600 hover:text-blue-600 font-medium transition-all duration-300 relative group">
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
            </nav>
            {session ? (
              <div className="flex gap-2">
                <Button onClick={() => window.location.href = '/dashboard'} className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:shadow-xl transition hover:scale-105">Dashboard</Button>
                <Button onClick={handleLogout} variant="outline" className="border border-blue-600 text-blue-600 hover:bg-blue-50 transition-all flex gap-2">
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            ) : (
              <Button onClick={navigateToAuth} className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:shadow-xl transition hover:scale-105">Login</Button>
            )}
          </div>
        </div>
      </header>

      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 z-10">
        <div className="container mx-auto px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }} className="space-y-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-slate-900">AI-Powered</span><br />
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-gradient">Interview Assistant</span><br />
                <span className="text-slate-900">for Modern Recruiters</span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed max-w-2xl">
                Let our AI voice agent conduct candidate interviews while you focus on finding the perfect match. Save time, reduce bias, and improve your hiring process with cutting-edge technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={navigateToAuth} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group">
                  Create Interview
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
                <Button variant="outline" className="border-2 border-slate-300 hover:border-blue-600 hover:text-blue-600 transition-all duration-300 hover:shadow-lg">Watch Demo</Button>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="relative">
              <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 group">
                <img src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg" alt="AI Interview Assistant Interface" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-white/20 backdrop-blur-md rounded-full animate-ping"></div>
                    <Button size="lg" className="relative bg-white/90 hover:bg-white text-blue-600 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 rounded-full p-6">
                      <Play className="h-8 w-8 ml-1" fill="currentColor" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 bg-white text-center z-10 relative">
        <div className="container mx-auto px-6">
          <motion.h2 className="text-4xl font-bold mb-12">Streamline Your Hiring Process</motion.h2>
          <h3 className="font-bold my-5 text-xl text-gray-500">AiCruiter helps you save time and find better candidates with our advanced AI interview technology.</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: i * 0.2 }} className="p-6 border border-slate-200 rounded-xl shadow hover:shadow-lg bg-slate-50">
                <f.icon className="w-10 h-10 mb-4 text-blue-600" />
                <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                <p className="text-slate-600">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-24 bg-slate-50 text-center z-10 relative">
        <div className="container mx-auto px-6">
          <motion.h2 className="text-4xl md:text-5xl font-bold mb-4">How AiCruiter Works</motion.h2>
          <p className="text-gray-500 text-lg mb-12">Three simple steps to transform your recruitment process</p>
          <div className="grid md:grid-cols-3 gap-12">
            {steps.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: i * 0.2 }} className="space-y-4">
                <div className="w-14 h-14 mx-auto rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-lg">{item.step}</div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-gray-500 max-w-sm mx-auto">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white text-center z-10 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Ready to Transform Your Hiring Process?</h2>
          <p className="text-lg text-slate-600 mb-8">Join hundreds of companies already using AiCruiter to find the best talent.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button onClick={navigateToAuth} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow">Get Started for Free</Button>
            <Button variant="outline" onClick={navigateToAuth} className="px-6 py-3 border rounded-xl shadow">Schedule a Demo</Button>
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 text-white py-12 text-center mt-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center space-y-4">
            <Mic className="h-10 w-10 text-blue-400" />
            <p className="text-lg font-semibold">AiCruiter — Your AI Interview Assistant</p>
            <p className="text-sm text-slate-400">© 2025 AiCruiter. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

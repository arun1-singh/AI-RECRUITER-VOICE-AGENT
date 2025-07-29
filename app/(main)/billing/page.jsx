"use client";

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Plus, Zap } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useUser } from "@/app/provider";
import { motion } from 'framer-motion';
import { PayPalButtons } from '@paypal/react-paypal-js';
import PayButton from './_components/PayButton';

function Billing() {
  const { user } = useUser();

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <main className="flex-1 p-4 md:p-6 bg-gradient-to-br from-gray-900 via-black to-gray-900 min-h-screen text-white">
      {/* Header */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <div className="relative overflow-hidden rounded-3xl shadow-2xl">
          <div className="absolute inset-0 z-0 bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-fuchsia-500 via-yellow-400 to-sky-500 opacity-40 blur-3xl animate-pulse" />
          <div className="relative z-10 bg-black rounded-3xl px-8 py-6">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text animate-pulse">
              Billing
            </h1>
            <p className="text-gray-300 text-xl mt-2">Add more interview credits to your account</p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Credits Card */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="relative rounded-3xl overflow-hidden shadow-xl">
            <div className="absolute -inset-[3px] z-0 rounded-[inherit] bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-pink-500 via-yellow-400 to-purple-500 animate-[spin_4s_linear_infinite] blur-sm" />
            <Card className="relative z-10 rounded-3xl bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-2xl text-cyan-400">Your Credits</CardTitle>
                <CardDescription className="text-gray-400">Current usage and remaining credits</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-start gap-4">
                <div className="text-xl font-bold text-green-400">3 interviews left</div>
                <Progress value={15} className="w-full animate-pulse" />
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-xl">
                  <Plus className="mr-2 h-4 w-4" /> Add More Credits
                </Button>
              </CardFooter>
            </Card>
          </div>
        </motion.div>

        {/* Purchase Plans */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.7, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          {[
            {
              price: "$5",
              label: "20 interviews",
              features: ["Basic interview templates", "Email support"],
              icon: <CreditCard className="mr-2 h-4 w-4" />,
              gradient: "from-gray-800 to-gray-700",
            },
            {
              price: "$12",
              label: "50 interviews",
              features: ["All interview templates", "Priority support", "Basic analytics"],
              icon: <Zap className="mr-2 h-4 w-4" />,
              gradient: "from-blue-700 to-blue-500",
              highlighted: true,
            },
            {
              price: "$25",
              label: "120 interviews",
              features: ["All interview templates", "24/7 support", "Advanced analytics"],
              icon: <CreditCard className="mr-2 h-4 w-4" />,
              gradient: "from-purple-700 to-pink-500",
            }
          ].map((plan, i) => (
            <motion.div
              key={i}
              className="relative rounded-3xl overflow-hidden shadow-xl"
              whileHover={{ scale: 1.08 }}
            >
              <div className="absolute -inset-[3px] z-0 rounded-[inherit] bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-pink-500 via-yellow-400 to-purple-500 animate-[spin_4s_linear_infinite] blur-sm" />
              <Card className={`relative z-10 rounded-3xl p-5 shadow-2xl transition-all duration-300 bg-gradient-to-br ${plan.gradient} text-white hover:shadow-[0_0_30px_10px_rgba(255,255,255,0.2)] ${plan.highlighted ? 'scale-105' : ''}`}>
                <CardHeader>
                  <CardTitle className="text-3xl font-bold text-white drop-shadow-lg">{plan.price}</CardTitle>
                  <CardDescription className="text-gray-300">{plan.label}</CardDescription>
                </CardHeader>
                <CardContent className="text-base space-y-2">
                  <ul className="list-disc pl-5">
                    {plan.features.map((feature, j) => (
                      <li key={j}>{feature}</li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  {/* <Button className="w-full shadow-md bg-white text-black hover:bg-gray-200">
                    {plan.icon} Purchase Credits
                  </Button> */}
                   <PayButton amount={5} credits={20} />
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}

export default Billing;
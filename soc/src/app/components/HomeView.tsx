"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Globe } from "./Globe";
import { MetricCounter } from "./MetricCounter";
import { TabsWithDescription } from "./TabsWithDescription";

interface HomeViewProps {
  data: Array<{
    date: string;
    provider: string;
    capacity_gpu: number;
    available_gpu: number;
    utilization_gpu: number;
    leases: number;
    daily_earnings: number;
    protocol_earnings: number;
  }>;
}
const words = ["Hosting", "Renting", "Managing"];

const HomeView = ({ data }: HomeViewProps) => {
  const router = useRouter();
  const [showContent, setShowContent] = useState(false);
  const [globalGlitch, setGlobalGlitch] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 500);
    const interval = setInterval(() => {
      setWordIndex((current) => (current + 1) % words.length);
    }, 2500); // Increased from 2500 to 3500 for slower cycling

    // Global glitch effect trigger
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.6) {
        setGlobalGlitch(true);
        setTimeout(() => setGlobalGlitch(false), 500);
      }
    }, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
      clearInterval(glitchInterval);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white">
      <div className="text-center flex flex-col items-center pt-2">
        <h1 className="text-7xl font-bold flex items-center justify-center m-0 p-0">
          <div className="flex items-center">
            <div className="relative w-[350px] h-[120px] flex justify-end">
              {" "}
              {/* Added flex justify-end */}
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={wordIndex}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -40, opacity: 0 }}
                  transition={{
                    y: {
                      type: "spring",
                      stiffness: 200,
                      damping: 25,
                      duration: 0.5,
                    },
                    opacity: {
                      duration: 0.3,
                      ease: "easeInOut",
                    },
                  }}
                  className="absolute right-0 h-full flex items-center" /* Changed to right-0 */
                >
                  <span
                    className="bg-clip-text text-transparent 
                             bg-gradient-to-r from-red-500 to-red-800
                             leading-relaxed pb-4 text-right" /* Added text-right */
                  >
                    {words[wordIndex]}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
            <span className="text-white ml-4 flex-shrink-0 min-w-fit">
              GPUs?
            </span>{" "}
            {/* Added min-w-fit */}
          </div>
        </h1>
        {/* Quok it! text with enhanced metallic effect */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, delay: 0.4 }}
          className="relative group -mt-6 text-center"
        >
          <span className="text-6xl font-bold inline-block metallic-text transition-transform duration-300">
            Quok it!
          </span>
        </motion.div>
        {/* VARIATIONS BEGIN  */}
        {/* Option 1: Modern Chrome Effect */}
        {/* <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative group mt-6 text-center"
          >
            <span className="text-5xl font-bold inline-block chrome-text cursor-pointer hover:scale-105 transition-transform duration-300">
              Quok it!
            </span>
          </motion.div> */}
        {/* Option 2: Glossy Effect */}
        {/* <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative group mt-6 text-center"
          >
            <span className="text-5xl font-bold inline-block glossy-text cursor-pointer hover:scale-105 transition-transform duration-300">
              Quok it!
            </span>
          </motion.div> */}
        {/* Option 3: Neon Glow */}
        {/* <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative group mt-6 text-center"
          >
            <span className="text-5xl font-bold inline-block neon-text cursor-pointer hover:scale-105 transition-transform duration-300">
              Quok it!
            </span>
          </motion.div> */}
        {/* Laser Outline Trace Effect */}
        {/* <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative group mt-6 text-center"
          >
            <svg
              className="absolute top-0 left-0 w-full h-full"
              width="0"
              height="0"
            >
              <defs>
                <linearGradient
                  id="laser-gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                  <stop offset="50%" stopColor="rgba(255,255,255,0.9)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                </linearGradient>
              </defs>
            </svg>
            <span className="text-5xl font-bold inline-block laser-outline-text cursor-pointer">
              Quok it!
            </span>
          </motion.div> */}
        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg text-gray-400 max-w-2xl mx-auto mt-6"
        >
          The trust layer for decentralized compute
        </motion.p>
        {/* Content Container with Metrics and Globe */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center max-w-6xl mx-auto mt-8" // Reduced from mt-8 to mt-4
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-center justify-center gap-2 
               text-red-500 text-3xl font-bold mb-12" // Reduced from mb-12 to mb-8
          >
            <span className="h-3 w-3 rounded-full bg-red-500 animate-pulse" />
            Coming Soon
          </motion.div>

          {/* Metrics in horizontal layout */}
          <div className="flex justify-center gap-16">
            <MetricCounter
              label="Networks Tracked"
              metricType="networks"
              isGlitching={globalGlitch}
            />
            <MetricCounter
              label="Total GPUs"
              metricType="total"
              isGlitching={globalGlitch}
            />
            <MetricCounter
              label="Available GPUs"
              metricType="available"
              isGlitching={globalGlitch}
            />
            <MetricCounter
              label="Network Utilization"
              metricType="utilization"
              isGlitching={globalGlitch}
            />
            <MetricCounter
              label="Daily Revenue"
              metricType="revenue"
              isGlitching={globalGlitch}
            />
          </div>
        </motion.div>

        {/* Globe Container */}
        {/* <div className="absolute inset-0 flex items-center justify-center">
          <Globe data={data} />
        </div> */}
        {/* New bottom section with tabs and button */}
        <motion.div
          className="absolute bottom-24 left-0 right-0 z-20 flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <TabsWithDescription />

          <motion.button
            onClick={() => router.push("/app")}
            className="px-16 py-4 text-xl font-semibold
                      bg-[#cc0000] text-white
                      rounded-full
                      shadow-[0_0_15px_rgba(204,0,0,0.5)]
                      hover:shadow-[0_0_30px_rgba(204,0,0,0.8)]
                      transform hover:scale-105 
                      transition-all duration-300
                      w-[280px]
                      mt-8" // Added margin top for spacing from tabs
          >
            Join Waitlist
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};
export default HomeView;

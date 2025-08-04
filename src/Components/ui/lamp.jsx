"use client";
import React from "react";
import { motion, useAnimation } from "framer-motion";

export default function LampDemo() {
  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl">
        Build lamps <br /> the right way
      </motion.h1>
    </LampContainer>
  );
}

export const LampContainer = ({
  children,
  className = "",
}) => {
  const controls = useAnimation();

  React.useEffect(() => {
    controls.start({
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    });
  }, [controls]);

  return (
    <div
      className={`relative flex min-h-[500px] flex-col items-center justify-center overflow-hidden bg-white w-full z-0 ${className}`}
    >
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0">
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          animate={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto right-1/2 h-56 w-[30rem] translate-y-[-30%] translate-x-[15%] rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 opacity-50 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0.5 }}
          animate={controls}
          className="absolute inset-auto left-1/2 h-56 w-[30rem] translate-y-[-30%] translate-x-[-50%] rounded-full bg-gradient-to-r from-blue-600 to-sky-400 opacity-50 blur-3xl"
        />
        <div className="relative z-10 flex flex-col items-center px-4">
          {children}
        </div>
      </div>
    </div>
  );
};

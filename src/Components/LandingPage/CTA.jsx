import React from 'react';
import { motion } from 'framer-motion';

const EnhancedCTA = () => {
  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 12 
      }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.05,
      boxShadow: "0 10px 15px -3px rgba(69, 68, 223, 0.2), 0 4px 6px -2px rgba(69, 68, 223, 0.1)",
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      }
    },
    tap: { 
      scale: 0.98 
    }
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background with purple gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-[#f5f5ff] to-[#ebe9ff] z-0"></div>
      
      {/* Animated shapes */}
      <motion.div
        className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#4544DF]/5 z-0"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 10, 0],
          y: [0, -10, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <motion.div
        className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#4544DF]/5 z-0"
        animate={{
          scale: [1, 1.1, 1],
          x: [0, -15, 0],
          y: [0, 15, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          <motion.h2 
            className="text-4xl font-medium mb-6 text-gray-900"
            variants={itemVariants}
          >
            Ready to make a difference in a child's health journey?
          </motion.h2>
          
          <motion.p 
            className="text-gray-600 text-lg mb-10 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Whether you're a doctor or a parent, Nourasense helps you act early and accurately.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={itemVariants}
          >
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="px-8 py-4 bg-[#4544DF] text-white rounded-full font-medium transition-colors duration-300 hover:bg-[#3635b2]"
            >
              Start Free Trial
            </motion.button>
            
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="px-8 py-4 bg-white text-[#4544DF] border-2 border-[#4544DF] rounded-full font-medium transition-colors duration-300 hover:bg-[#EBE9FF]"
            >
              Talk to Us
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default EnhancedCTA;
"use client";

import React, { useState, useEffect } from "react";
import { Card, Carousel } from "../ui/apple-cards-carousel";

export function AppleCardsCarouselDemo() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const visibleCards = isMobile ? data.slice(0, 4) : data;
  const remainingCount = isMobile ? data.length - 4 : 0;

  const cards = visibleCards.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-10 md:py-20 px-4">
      <h2 className="max-w-7xl mx-auto text-2xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        Get to Know Nourasense
      </h2>
      <p className="max-w-7xl mx-auto text-base md:text-xl text-neutral-600 dark:text-neutral-400 mt-4">
        Your trusted companion in detecting and monitoring child growth issues, developmental delays, and malnutrition risks — from birth to 19 years. Empowering parents and doctors with smart, actionable insights.
      </p>
      <Carousel items={cards} />
      {isMobile && remainingCount > 0 && (
        <div className="text-center mt-4 text-neutral-600 dark:text-neutral-400">
          +{remainingCount} more features
        </div>
      )}
    </div>
  );
}

const DummyContent = ({ description }) => {
  return (
    <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-6 md:p-14 rounded-3xl mb-4">
      <p className="text-neutral-600 dark:text-neutral-400 text-sm md:text-2xl font-sans max-w-3xl mx-auto">
        {description}
      </p>
    </div>
  );
};

const data = [
  {
    category: "AI Diagnosis",
    title: "Early Diagnosis with AI",
    src: "https://cdn.pixabay.com/photo/2019/04/26/07/14/medical-4156800_1280.jpg",
    content: <DummyContent description="Spot early warning signs using intelligent algorithms trained to detect growth and nutrition-related anomalies — before they become serious." />,
  },
  {
    category: "Growth Tracking",
    title: "Growth Tracking for Parents",
    src: "https://cdn.pixabay.com/photo/2017/01/29/21/16/nurse-2019420_1280.jpg",
    content: <DummyContent description="Easily track your child's height, weight, BMI, and milestones — with personalized alerts and guidance, right from your phone." />,
  },
  {
    category: "Analytics",
    title: "Analytics for Doctors",
    src: "https://cdn.pixabay.com/photo/2017/08/01/00/38/medical-2562308_1280.jpg",
    content: <DummyContent description="Unlock rich, visual insights into each child's growth trajectory. Make data-driven decisions with ease, supported by AI-backed reports." />,
  },
  {
    category: "Nutrition",
    title: "Nutrient Analysis",
    src: "https://cdn.pixabay.com/photo/2017/06/21/09/19/spoon-2426623_1280.jpg",
    content: <DummyContent description="Get a snapshot of your child's daily nutrient intake. Identify gaps in diet and get clear recommendations to fill them." />,
  },
  {
    category: "Diet Planning",
    title: "Diet Plan Optimization",
    src: "https://cdn.pixabay.com/photo/2017/03/13/13/39/meal-plan-2139580_1280.jpg",
    content: <DummyContent description="Customized diet plans tailored to age, growth data, and medical conditions — for healthier, happier children." />,
  },
  {
    category: "Chatbot",
    title: "WhatsApp Chatbot",
    src: "https://cdn.pixabay.com/photo/2017/12/02/14/38/contact-us-2993000_1280.jpg",
    content: <DummyContent description="Instant support through our friendly AI chatbot — available 24/7 on WhatsApp to guide, remind, and respond to parent queries." />,
  },
  {
    category: "Healthcare",
    title: "Refer for In-Person Checkups",
    src: "https://cdn.pixabay.com/photo/2020/03/14/17/05/virus-4931227_1280.jpg",
    content: <DummyContent description="When needed, Nourasense connects you to nearby clinics and specialists — closing the loop between digital and physical care." />,
  },
  {
    category: "Security",
    title: "Secure & Confidential",
    src: "https://cdn.pixabay.com/photo/2017/12/22/08/01/security-3033716_1280.jpg",
    content: <DummyContent description="All your data is protected with end-to-end encryption. Your child's health journey stays private, safe, and confidential — always." />,
  },
];

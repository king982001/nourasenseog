import React, { useEffect, useRef } from 'react';
import { AnimatedTooltip } from '../ui/animated-tooltip';

const PartnersSection = () => {
  const scrollRef = useRef(null);
  
  // Sample partner logos - replace with actual partner logos
  const partners = [
    { name: "Microsoft", logo: "https://via.placeholder.com/120x60?text=Microsoft" },
    { name: "Allianz", logo: "https://via.placeholder.com/120x60?text=Allianz" },
    { name: "Gothaer", logo: "https://via.placeholder.com/120x60?text=Gothaer" },
    { name: "Medis", logo: "https://via.placeholder.com/120x60?text=Medis" },
    { name: "PZU", logo: "https://via.placeholder.com/120x60?text=PZU" },
    { name: "Teladoc", logo: "https://via.placeholder.com/120x60?text=Teladoc" },
    { name: "Diagnostikare", logo: "https://via.placeholder.com/120x60?text=Diagnostikare" },
    { name: "Everlight", logo: "https://via.placeholder.com/120x60?text=Everlight" },
    { name: "Health+", logo: "https://via.placeholder.com/120x60?text=Health+" },
    { name: "MedTech", logo: "https://via.placeholder.com/120x60?text=MedTech" },
    { name: "CareFirst", logo: "https://via.placeholder.com/120x60?text=CareFirst" },
    { name: "Novartis", logo: "https://via.placeholder.com/120x60?text=Novartis" },
  ];
  
  const people = [
    {
      id: 1,
      name: "John Doe",
      designation: "Software Engineer",
      image:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
    },
    {
      id: 2,
      name: "Robert Johnson",
      designation: "Product Manager",
      image:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 3,
      name: "Jane Smith",
      designation: "Data Scientist",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 4,
      name: "Emily Davis",
      designation: "UX Designer",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 5,
      name: "Tyler Durden",
      designation: "Soap Developer",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
    },
    {
      id: 6,
      name: "Dora",
      designation: "The Explorer",
      image:
        "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3534&q=80",
    },
  ];
  // Duplicate the partners array to create seamless scrolling effect
  const duplicatedPartners = [...partners, ...partners];
  
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
     
        <div className="text-center mt-12">
          <h2 className="text-2xl font-extralight text-gray-900">
            We've helped hundreds of organizations since 2012
          </h2>
        </div>
      <div className='flex flex-row items-center justify-center pt-8'>
      <AnimatedTooltip items={people} />

      </div>
      </div>
    </section>
  );
};

export default PartnersSection;
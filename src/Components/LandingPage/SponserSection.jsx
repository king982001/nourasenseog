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
      name: "Dr. Ayesha Khan",
      designation: "Cardiologist",
      image: "2.jpeg",
    },
    {
      id: 2,
      name: "Dr. Ravi Mehra",
      designation: "Orthopedic Surgeon",
      image: "3.jpeg",
    },
    {
      id: 3,
      name: "Nurse Jennifer Lee",
      designation: "Senior Nurse",
      image: "4.jpeg",
    },
    {
      id: 4,
      name: "Dr. Marcus Silva",
      designation: "Radiologist",
      image: "5.jpeg",
    }
  ];
  
  
  
  // Duplicate the partners array to create seamless scrolling effect
  const duplicatedPartners = [...partners, ...partners];
  
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
     
        <div className="text-center mt-12">
          <h2 className="text-2xl font-extralight text-gray-900">
          We’ve partnered with 20+ hospitals & clinics since 2025
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
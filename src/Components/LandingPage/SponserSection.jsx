import React, { useEffect, useRef, useState } from 'react';
import { AnimatedTooltip } from '../ui/animated-tooltip';

const PartnersSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  
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
      name: "Aashray Children Hospital",
      designation: "Partner Hospital",
      image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&auto=format&fit=crop&q=60",
    },
    {
      id: 2,
      name: "Krishna Children & Dental Hospital",
      designation: "Partner Hospital",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop&q=60",
    },
    {
      id: 3,
      name: "Kanha Children Hospital & Vaccination Centre",
      designation: "Partner Hospital", 
      image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&auto=format&fit=crop&q=60",
    },
    {
      id: 4,
      name: "Bhanu Children Hospital",
      designation: "Partner Hospital",
      image: "https://images.unsplash.com/photo-1596541223130-5d31a73fb6c6?w=800&auto=format&fit=crop&q=60",
    },
    {
      id: 5,
      name: "Apple Children Hospital",
      designation: "Sampurna Swasthyam",
      image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&auto=format&fit=crop&q=60",
    },
    {
      id: 6,
      name: "Abhijan Clinic & Child Care",
      designation: "Partner Clinic",
      image: "https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=800&auto=format&fit=crop&q=60",
    },
    {
      id: 7,
      name: "NIDAN CLINIC",
      designation: "Partner Clinic",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop&q=60",
    },
    {
      id: 8,
      name: "Maa Children Hospital",
      designation: "Partner Hospital",
      image: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&auto=format&fit=crop&q=60",
    },
    {
      id: 9,
      name: "EESHTA CLINIC",
      designation: "Partner Clinic",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop&q=60",
    },
    {
      id: 10,
      name: "Nikunj Clinic",
      designation: "Partner Clinic",
      image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&auto=format&fit=crop&q=60",
    },
    {
      id: 11,
      name: "KALRAV CHILDREN HOSPITAL",
      designation: "Partner Hospital",
      image: "https://images.unsplash.com/photo-1559000357-f6b52ddfbe37?w=800&auto=format&fit=crop&q=60",
    },
    {
      id: 12,
      name: "Shraddha Clinic",
      designation: "Partner Clinic",
      image: "https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=800&auto=format&fit=crop&q=60",
    },
    {
      id: 13,
      name: "Shreeji Clinic",
      designation: "Partner Clinic",
      image: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=800&auto=format&fit=crop&q=60",
    },
    {
      id: 14,
      name: "Ashirwad Clinic",
      designation: "Partner Clinic",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop&q=60",
    },
    {
      id: 15,
      name: "NIsarg Clinic",
      designation: "Partner Clinic",
      image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&auto=format&fit=crop&q=60",
    },
    {
      id: 16,
      name: "Gayatri Hospital",
      designation: "Partner Hospital",
      image: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&auto=format&fit=crop&q=60",
    }
  ];

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  const displayedPeople = isMobile ? people.slice(0, 4) : people;
  const remainingCount = isMobile ? people.length - 4 : 0;
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mt-12">
          <h2 className="text-2xl font-extralight text-gray-900">
            We've partnered with {people.length}+ hospitals & clinics since 2025
          </h2>
        </div>
        <div className='flex flex-row items-center justify-center pt-8 flex-wrap gap-4'>
          <AnimatedTooltip items={displayedPeople} />
          {isMobile && remainingCount > 0 && (
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-200">
              <span className="text-gray-600 font-medium">+{remainingCount}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
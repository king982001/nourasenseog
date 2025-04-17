import React, { useEffect, useRef } from 'react';

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
  
  // Duplicate the partners array to create seamless scrolling effect
  const duplicatedPartners = [...partners, ...partners];
  
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let animationId;
    let scrollPosition = 0;
    
    const scroll = () => {
      if (scrollContainer) {
        scrollPosition += 0.5; // Adjust speed here
        
        // Reset scroll position when reached half of the content
        if (scrollPosition >= scrollContainer.scrollWidth / 2) {
          scrollPosition = 0;
        }
        
        scrollContainer.scrollLeft = scrollPosition;
      }
      
      animationId = requestAnimationFrame(scroll);
    };
    
    scroll();
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden">
          <div 
            ref={scrollRef}
            className="flex items-center overflow-x-hidden w-full"
            style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="flex space-x-16 py-8 animate-scroll">
              {duplicatedPartners.map((partner, index) => (
                <div key={index} className="flex flex-shrink-0 items-center justify-center h-16">
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="h-8 md:h-10 opacity-70 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <h2 className="text-2xl font-extralight text-gray-900">
            We've helped hundreds of organizations since 2012
          </h2>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
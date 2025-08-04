import { useEffect } from 'react';
import Hero from 'src/Components/LandingPage/Hero';
import PartnersSection from 'src/Components/LandingPage/SponserSection';
import UseCasesAndModules from 'src/Components/LandingPage/Modules';
import { AnimatedTestimonials } from 'src/Components/ui/animated-testimonials';
import { AppleCardsCarouselDemo } from 'src/Components/LandingPage/Cards';
import { NavbarDemo } from 'src/Components/LandingPage/Header';
import Footer from 'src/Components/LandingPage/Footer';
import Workflow from 'src/Components/LandingPage/Workflow';
import CTA from 'src/Components/LandingPage/CTA';
// Add custom styles for the entire app
const globalStyles = `
  /* Import Google Fonts */
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500&display=swap');
  
  /* Custom styles */
  html {
    scroll-behavior: smooth;
  }
  
  body {
    font-family: 'Inter', sans-serif;
    font-weight: 300;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-weight: 300;
  }
`;

const LandingPage = () => {
  useEffect(() => {
    // Set document title
    document.title = "NouraSense - Child Growth Monitoring Platform";
    
    // Create a style element and append global styles
    const styleElement = document.createElement('style');
    styleElement.innerHTML = globalStyles;
    document.head.appendChild(styleElement);
    
    // Cleanup
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);
  const testimonials = [
    {
      quote:
        "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
      name: "Sarah Chen",
      designation: "Product Manager at TechFlow",
      src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
      name: "Michael Rodriguez",
      designation: "CTO at InnovateSphere",
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
      name: "Emily Watson",
      designation: "Operations Director at CloudScale",
      src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
      name: "James Kim",
      designation: "Engineering Lead at DataPro",
      src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
      name: "Lisa Thompson",
      designation: "VP of Technology at FutureNet",
      src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];
  return (
    <div className="min-h-screen bg-white">
      <NavbarDemo />

      <section id="hero">
        <Hero />
      </section>
      <section id="partners">
        <PartnersSection />
      </section>
      {/* <Features /> */}
      {/* <UseCases /> */}
      {/* <section id="testimonials">
        <AnimatedTestimonials testimonials={testimonials} />
      </section> */}
      <section id="solutions">
        <AppleCardsCarouselDemo/>
      </section>
      <section id="platform">
        <UseCasesAndModules />
      </section>
      <section id="workflow">
        <Workflow />
      </section>
      <section id="cta">
        <CTA />
      </section>
      <section id="support">
        <Footer />
      </section>
    </div>
  );
};

export default LandingPage;
const HowItWorks = () => {
    const steps = [
      {
        number: "1",
        title: "Create Account",
        description: "Start by creating a secure account with us. This step is simple and quick, allowing you to access personalized child growth diagnostics. Once registered, you can easily manage multiple child/patient profiles from a single account.",
        image: "/api/placeholder/450/350",
        alt: "Create account illustration",
        reversed: false
      },
      {
        number: "2",
        title: "Fast, Automatic Diagnoses",
        description: "After setting up your account, enter your child's/patient's anthropomorphic measurements, such as height, weight, and head circumference. Our advanced algorithms will analyze these inputs, delivering an accurate assessment in seconds.",
        image: "/api/placeholder/450/350",
        alt: "Diagnosis process illustration",
        reversed: true
      },
      {
        number: "3",
        title: "Tailored Medical Reporting",
        description: "Our system generates a comprehensive report detailing your child's growth metrics, including potential areas of concern. Access it anytime, download, or share it with healthcare professionals directly from your dashboard.",
        image: "/api/placeholder/450/350",
        alt: "Medical reporting illustration",
        reversed: false
      }
    ];
  
    return (
      <section id="how-it-works" className="py-16 bg-[#F9F8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extralight mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 font-extralight max-w-3xl mx-auto">
              Three simple steps to transform your approach to child growth monitoring
            </p>
          </div>
  
          <div className="space-y-20">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className={`lg:flex items-center gap-12 ${step.reversed ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className="lg:w-1/2 mb-8 lg:mb-0">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#4544DF] text-white text-lg font-extralight mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-2xl font-extralight mb-4">{step.title}</h3>
                  <p className="text-gray-600 font-extralight mb-6">
                    {step.description}
                  </p>
                  {step.number === "1" && (
                    <a 
                      href="#signup" 
                      className="px-5 py-2 bg-[#4544DF] text-white rounded font-extralight hover:bg-[#3c3cbb] transition inline-block"
                    >
                      Get Started
                    </a>
                  )}
                </div>
                <div className="lg:w-1/2">
                  <img 
                    src={step.image} 
                    alt={step.alt}
                    className="w-full rounded-lg"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default HowItWorks;
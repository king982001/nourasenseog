import React, { useEffect } from 'react';

const Pricing = () => {
  // Nourasense color palette
 

  const plans = [
    {
      id: "1",
      name: "Personal Plan",
      emoji: "👋",
      tagline: "Perfect for individual practitioners",
      pricing: {
        monthly: 1999,
        yearly: 19990,
      },
      features: [
        "Manage up to 100 patients",
        "Support for 1 doctor",
        "Generate 50 reports/month",
        "Electronic Health Records",
        "Appointment Scheduling",
        "Basic Analytics",
        "Email Support"
      ],
      isPrimary: false
    },
    {
      id: "2",
      name: "Business Plan",
      emoji: "💪",
      tagline: "Ideal for growing practices",
      pricing: {
        monthly: 4999,
        yearly: 49990,
        additionalDoctorCost: 1499,
      },
      features: [
        "Manage up to 500 patients",
        "Support for 5 doctors",
        "Generate 200 reports/month",
        "Advanced Analytics",
        "Priority Support",
        "Custom Branding",
        "Phone Support"
      ],
      isPrimary: true
    },
    {
      id: "3",
      name: "Enterprise Plan",
      emoji: "🚀",
      tagline: "For large healthcare organizations",
      pricing: {
        monthly: 9999,
        yearly: 99990,
        additionalDoctorCost: 999,
      },
      features: [
        "Unlimited patients",
        "Support for 15+ doctors",
        "Unlimited reports",
        "Dedicated Account Manager",
        "API Access",
        "On-site Training",
        "24/7 Priority Support"
      ],
      isPrimary: false
    }
  ];

  const [billingCycle, setBillingCycle] = React.useState("monthly");

  useEffect(() => {
    // Set document title
    document.title = "NouraSense - Pricing Plans";
  }, []);

  const getPriceString = (price) => {
    const formattedPrice = price.toLocaleString();
    return `₹${formattedPrice}`;
  };

  const PricingCard = ({ plan }) => {
    const price = billingCycle === "monthly" ? plan.pricing.monthly : plan.pricing.yearly;
    const savings = billingCycle === "yearly"
      ? (((plan.pricing.monthly * 12 - plan.pricing.yearly) / (plan.pricing.monthly * 12)) * 100).toFixed(0)
      : 0;

    return (
      <div className="relative h-full">
        <div 
          className={`flex flex-col p-6 rounded-xl h-full border transition-all duration-300 hover:shadow-lg ${
            plan.isPrimary ? 'bg-white border-blue-400 shadow-md' : 'bg-gray-50 border-gray-100'
          }`}
        >
          <div className="mb-4">
            <span className="text-2xl mr-2">{plan.emoji}</span>
            <h3 className="text-xl font-normal mt-3 mb-2 text-gray-800">
              {plan.name}
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              {plan.tagline}
            </p>
          </div>

          <div className="flex items-baseline mb-5">
            <span className="text-4xl font-bold text-gray-800">
              {getPriceString(price)}
            </span>
            <span className="ml-1 text-xs text-gray-500">
              /{billingCycle === "monthly" ? "mo" : "yr"}
            </span>
          </div>
          
          {billingCycle === "yearly" && savings > 0 && (
            <p className="text-xs mb-4 font-medium text-green-500">
              Save {savings}% with yearly billing
            </p>
          )}

          <button 
            className={`w-full py-2.5 px-4 rounded-lg font-medium text-sm transition-colors duration-200 mb-5 ${
              plan.isPrimary 
                ? 'bg-blue-500 text-white hover:bg-blue-600' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Get 14 days free trial
          </button>

          <div className="text-xs uppercase font-medium text-gray-500 mb-3">
            BEST FOR FREE
          </div>
          
          <div className="flex-grow">
            <ul className="space-y-3">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <div className="text-blue-500 mr-2 mt-0.5 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <span className="text-gray-600 text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {plan.pricing.additionalDoctorCost && (
            <div className="mt-4 text-xs text-gray-500">
              Additional doctor: ₹{plan.pricing.additionalDoctorCost}/doctor/month
            </div>
          )}
        </div>
        
        {plan.isPrimary && (
          <div className="absolute -top-3 left-0 right-0 flex justify-center">
            <span className="px-3 py-0.5 rounded-full text-xs font-medium bg-blue-500 text-white shadow-md">
              Most popular
            </span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 text-gray-800">
            Plans that scale with business
          </h1>
          <p className="mb-6 max-w-2xl mx-auto text-sm text-gray-600">
            NouraSense gives you the tools you need to create a truly professional
            healthcare monitoring system for your practice.
          </p>

          <div className="inline-flex items-center rounded-full p-1 border border-gray-200 mb-6">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                className="sr-only"
                name="billingCycle"
                checked={billingCycle === "monthly"}
                onChange={() => setBillingCycle("monthly")}
              />
              <span className={`px-4 py-1 rounded-full text-xs ${
                billingCycle === "monthly" 
                  ? 'bg-gray-900 text-white' 
                  : 'text-gray-700'
              }`}>
                Monthly Plan
              </span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                className="sr-only"
                name="billingCycle"
                checked={billingCycle === "yearly"}
                onChange={() => setBillingCycle("yearly")}
              />
              <span className={`px-4 py-1 rounded-full text-xs ${
                billingCycle === "yearly" 
                  ? 'bg-gray-900 text-white' 
                  : 'text-gray-700'
              }`}>
                Yearly Plan {billingCycle === "yearly" && <span className="text-blue-400 ml-1">(Save 20%)</span>}
              </span>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch mb-14">
          {plans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>
      </div>
      
      <div className="bg-gray-50 py-10 mt-4">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <h3 className="text-xl font-normal mb-2 text-gray-800">
              Need a Custom Solution?
            </h3>
            <p className="mb-4 max-w-2xl mx-auto text-xs text-gray-600">
              Contact our team for a personalized consultation. We'll help you find the perfect solution for your healthcare practice.
            </p>
            <button
              className="px-6 py-2 rounded-lg font-medium text-sm transition-colors duration-200 bg-gray-900 text-white hover:bg-gray-800">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
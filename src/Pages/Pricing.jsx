import React from "react";
import { useAllPricingPlans } from "src/Hooks/Hooks.js";
import BackButton from "src/Components/BackButton.jsx";
import { useBuySubscription } from "src/Hooks/DoctorHooks";
// import {} from "razorpay"
const Pricing = () => {
  const { data, isLoading, isError } = useAllPricingPlans();
  const [billingCycle, setBillingCycle] = React.useState("monthly");
  const { mutate: subscribe } = useBuySubscription();
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary-blue"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            Unable to load pricing plans
          </h3>
          <p className="text-gray-600">Please try again later</p>
        </div>
      </div>
    );
  }

  const formatValue = (value) => {
    if (value === -1) return "Unlimited";
    return value;
  };

  const formatFeatureName = (name) => {
    return name
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
  };

  const getTagline = (planName) => {
    switch (planName) {
      case "PersonalPlan":
        return "Perfect for individual practitioners";
      case "BussinessPlan":
        return "Ideal for growing practices";
      case "EnterPrisePlan":
        return "For large healthcare organizations";
      default:
        return "";
    }
  };

  const PricingCard = ({ plan, isMiddle }) => {
    const price =
      billingCycle === "monthly" ? plan.pricing.monthly : plan.pricing.yearly;
    const savings =
      billingCycle === "yearly"
        ? (
            ((plan.pricing.monthly * 12 - plan.pricing.yearly) /
              (plan.pricing.monthly * 12)) *
            100
          ).toFixed(0)
        : 0;

    const handleSubscription = async (planId) => {
      const doctor = JSON.parse(localStorage.getItem("DoctorAccount"));
      if (!doctor) {
        alert("Please login to subscribe to a plan");
        return;
      }
      const isMonthly = billingCycle === "monthly" ? true : false;
      subscribe(
        { isMonthly, planId },
        {
          onSuccess: (data) => {
            const { order } = data.data;
            const options = {
              key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Replace with your RazorPay Key ID
              amount: order.amount,
              currency: order.currency,
              name: "Nourasense",
              description: "Test Transaction",
              order_id: order.id,
              handler: (response) => {
                alert(
                  `Payment Successful! Payment ID: ${response.razorpay_payment_id}`
                );
              },
              prefill: {
                name: "Saleh",
                email: "salehkhatri29@example.com",
                contact: "9999999999",
              },
              theme: {
                color: "#3399cc",
              },
            };
            console.log("Opening Razorpay Payment Gateway", options);

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
          },
        }
      );
    };

    return (
      <div className="relative">
        {isMiddle && (
          <div className="absolute -top-4 left-0 right-0 text-center">
            <span className="bg-primary-blue text-white px-4 py-1 rounded-full text-sm font-medium">
              ★ Recommended ★
            </span>
          </div>
        )}
        <div
          className={`flex flex-col p-6 rounded-lg shadow-lg ${
            isMiddle
              ? "border-2 border-primary-blue bg-white z-10 h-full"
              : "border border-gray-200 bg-white h-full"
          }`}
        >
          <h3 className="text-2xl font-serif font-bold text-primary-blue mb-1">
            {plan.name.replace(/([A-Z])/g, " $1").trim()}
          </h3>
          <p className="text-gray-600 text-sm mb-4">{getTagline(plan.name)}</p>

          <div className="flex items-baseline mt-4 mb-2">
            <span className="text-4xl font-bold text-primary-blue">
              ₹{price.toLocaleString()}
            </span>
            <span className="ml-1 text-gray-500">
              /{billingCycle === "monthly" ? "mo" : "yr"}
            </span>
          </div>
          {billingCycle === "yearly" && savings > 0 && (
            <p className="text-sm text-green-600 mb-6">
              Save {savings}% with yearly billing
            </p>
          )}

          <div className="flex-grow">
            <div className="mb-4">
              <p className="font-medium mb-2 text-primary-blue">
                Key Features:
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="mr-2 text-primary-blue">👥</span>
                  <span>
                    Manage up to{" "}
                    <strong>
                      {formatValue(plan.features.patientManagementLimit)}
                    </strong>{" "}
                    patients
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-primary-blue">👨‍⚕️</span>
                  <span>
                    Support for{" "}
                    <strong>{formatValue(plan.doctorsLimit)}</strong> doctors
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-primary-blue">📊</span>
                  <span>
                    Generate{" "}
                    <strong>
                      {formatValue(plan.features.reportLimitPerMonth)}
                    </strong>{" "}
                    reports/month
                  </span>
                </li>
              </ul>
            </div>

            <div className="mb-4">
              <p className="font-medium mb-2 text-primary-blue">
                Everything you need:
              </p>
              <ul className="space-y-2">
                {Object.entries(plan.features)
                  .filter(([key, value]) => typeof value === "boolean" && value)
                  .map(([key]) => (
                    <li key={key} className="flex items-center">
                      <span className="text-primary-blue mr-2">✓</span>
                      {formatFeatureName(key)}
                    </li>
                  ))}
              </ul>
            </div>

            {plan.pricing.additionalDoctorCost && (
              <div className="mt-4 text-sm text-gray-600">
                Additional doctor cost: ₹{plan.pricing.additionalDoctorCost}
                /doctor/month
              </div>
            )}
          </div>

          <button
            onClick={() => handleSubscription(plan._id)}
            className={`mt-6 w-full py-3 px-6 rounded-lg font-medium ${
              isMiddle
                ? "bg-primary-blue text-white hover:bg-blue-800"
                : "border-2 border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white"
            } transition-colors duration-200`}
          >
            {"Get Started Now"}
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <BackButton />
      <div className="max-w-7xl mx-auto px-4 py-12 mt-8">
        <div className="text-center mb-12">
          <span className="text-primary-blue font-medium">Pricing Plans</span>
          <h2 className="text-4xl font-serif font-bold text-primary-blue mb-3">
            Choose the Perfect Plan for Your Practice
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Select a plan that best fits your needs. All plans include access to
            core features, regular updates, and our commitment to your success.
          </p>
          <div className="inline-flex items-center bg-gray-100 rounded-lg p-1">
            <button
              className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                billingCycle === "monthly"
                  ? "bg-primary-blue text-white"
                  : "text-gray-600 hover:text-primary-blue"
              }`}
              onClick={() => setBillingCycle("monthly")}
            >
              Monthly
            </button>
            <button
              className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                billingCycle === "yearly"
                  ? "bg-primary-blue text-white"
                  : "text-gray-600 hover:text-primary-blue"
              }`}
              onClick={() => setBillingCycle("yearly")}
            >
              Yearly
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {data?.plans.map((plan, index) => (
            <PricingCard key={plan._id} plan={plan} isMiddle={index === 1} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Pricing;

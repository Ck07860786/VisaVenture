import React from "react";
import { motion } from "framer-motion";

const steps = [
  {
    id: 1,
    title: "Step 1: Create an Account",
    description: "Sign up to get started with your visa application.",
    icon: "📝",
  },
  {
    id: 2,
    title: "Step 2: Submit Documents",
    description: "Upload your personal and business documents securely.",
    icon: "📄",
  },
  {
    id: 3,
    title: "Step 3: Choose an Agent",
    description: "Select the best agent based on budget, ratings, and reviews.",
    icon: "👤",
  },
  {
    id: 4,
    title: "Step 4: Track Your Application",
    description: "Get real-time updates on your visa status.",
    icon: "📍",
  },
  {
    id: 5,
    title: "Step 5: Receive Your Visa",
    description: "Complete the process and receive your visa hassle-free.",
    icon: "🎉",
  },
];

const VisaSteps = () => {
  return (
    <div className="bg-transparent mt-20 py-16 px-4 md:px-20 text-gray-800">
      <h2 className="text-4xl font-bold text-center mb-10">
        How Visa Venture Works
      </h2>
      <div className="flex flex-col md:flex-row items-center justify-center gap-6">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }} // Trigger animation when 30% of the component is visible
            transition={{ delay: index * 0.4, duration: 2 }} // Slowed duration and increased delay
            className="bg-transparent shadow-lg rounded-lg p-6 w-full md:w-1/5 text-center transform hover:scale-105 transition-transform"
          >
            <div className="text-5xl mb-4">{step.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-sm text-gray-600">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default VisaSteps;

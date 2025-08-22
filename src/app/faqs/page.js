"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const faqs = [
  {
    question: "How does ReBridge work?",
    answer:
      "ReBridge connects waste generators directly with recyclers, eliminating middlemen and increasing profits for users while promoting sustainability."
  },
  {
    question: "Who can sell waste on ReBridge?",
    answer:
      "Anyone from individual households to large industries can schedule pickups and sell recyclable waste through the platform."
  },
  {
    question: "How are delivery routes optimized?",
    answer:
      "Pickup routes are planned based on user-specified frequency and location, minimizing fuel use and maximizing efficiency for delivery partners."
  },
  {
    question: "How am I paid for the waste I sell?",
    answer:
      "Payments are calculated based on the weight of recyclable waste and frequency of collection as set in the app."
  },
  {
    question: "What materials can be recycled?",
    answer:
      "We currently support the recycling of plastic, paper, metals, e-waste, and more. The app provides clear categories during the scheduling process."
  }
];

export default function FAQPage() {
  const [index, setIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % faqs.length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + faqs.length) % faqs.length);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-green-600 mb-10">
          FAQs
        </h1>

        <div className="flex items-center justify-between space-x-4 mb-6">
          <button
            onClick={handlePrev}
            className="p-2 bg-white border rounded-full shadow hover:bg-green-100 transition"
            aria-label="Previous"
          >
            <ChevronLeft className="text-green-600" />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="bg-white p-8 rounded-2xl shadow-md flex-1 text-center"
            >
              <h2 className="text-2xl font-semibold text-green-600 mb-4">
                {faqs[index].question}
              </h2>
              <p className="text-gray-700 text-lg">{faqs[index].answer}</p>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={handleNext}
            className="p-2 bg-white border rounded-full shadow hover:bg-green-100 transition"
            aria-label="Next"
          >
            <ChevronRight className="text-green-600" />
          </button>
        </div>

        {/* View All FAQs Button */}
        {!showAll && (
          <div className="text-center mt-6">
            <button
              onClick={() => setShowAll(true)}
              className="text-green-600 font-medium hover:underline transition"
            >
              View all FAQs
            </button>
          </div>
        )}

        {/* All FAQs List */}
        {showAll && (
          <div className="mt-10 space-y-6">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
              >
                <h3 className="text-lg font-semibold text-green-600 mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

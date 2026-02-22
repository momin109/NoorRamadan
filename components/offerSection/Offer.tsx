import React from "react";
import { Offer as OfferType } from "@/types/offer.types";
import { CheckIcon, SparklesIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

interface OfferProps {
  offers: OfferType[];
}

const Offer: React.FC<OfferProps> = ({ offers }) => {
  // Function to get badge color based on badge text
  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "Most Popular":
        return "bg-gradient-to-r from-purple-600 to-pink-500";
      case "Best Value":
        return "bg-gradient-to-r from-blue-600 to-cyan-500";
      case "Starter":
        return "bg-gradient-to-r from-green-600 to-emerald-500";
      case "Professional":
        return "bg-gradient-to-r from-orange-600 to-red-500";
      default:
        return "bg-gradient-to-r from-gray-600 to-gray-500";
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            Our Premium Packages
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            আপনার ব্যবসার চাহিদা অনুযায়ী সেরা প্যাকেজটি নির্বাচন করুন। প্রতিটি
            প্ল্যান যত্নসহকারে এবং সূক্ষ্ম বিবেচনায় প্রস্তুত করা হয়েছে।
          </p>
        </motion.div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {offers.map((offer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="relative group"
            >
              {/* Card */}
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden h-full flex flex-col">
                {/* Badge */}
                <div
                  className={`absolute top-6 right-6 ${getBadgeColor(offer.badge)} text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg z-10`}
                >
                  <span className="flex items-center gap-1">
                    <SparklesIcon className="w-4 h-4" />
                    {offer.badge}
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-8 flex flex-col h-full">
                  {/* Title */}
                  <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                    {offer.title}
                  </h3>

                  {/* Price Section */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-gray-900 dark:text-white">
                        {offer.offerPrice}
                      </span>
                      <span className="text-lg text-gray-500 dark:text-gray-400 line-through">
                        {offer.originalPrice}
                      </span>
                    </div>
                    <p className="text-sm text-green-600 dark:text-green-400 font-semibold mt-1">
                      Save 50%
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="flex-grow">
                    <ul className="space-y-3">
                      {offer.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600 dark:text-gray-300">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      window.open(
                        `https://wa.me/8801797764148?text=${encodeURIComponent(
                          `I want to order ${offer.title}`,
                        )}`,
                        "_blank",
                      );
                    }}
                    className={`mt-8 w-full py-3 px-6 rounded-xl font-semibold text-white shadow-lg transition-all duration-300 ${
                      offer.badge === "Most Popular"
                        ? "bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600"
                        : offer.badge === "Best Value"
                          ? "bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600"
                          : offer.badge === "Professional"
                            ? "bg-gradient-to-r from-orange-600 to-red-500 hover:from-orange-700 hover:to-red-600"
                            : "bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-800 hover:to-gray-700"
                    }`}
                  >
                    Order Now
                  </motion.button>
                </div>
              </div>

              {/* Most Popular Highlight */}
              {offer.badge === "Most Popular" && (
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-600 to-pink-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12 text-gray-500 dark:text-gray-400 text-sm"
        >
          * All packages include free installation and 30 days support
        </motion.div>
      </div>
    </section>
  );
};

export default Offer;

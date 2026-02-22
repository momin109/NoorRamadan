import React from "react";
import { Offer } from "@/types/offer.types";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

interface OfferMinimalProps {
  offers: Offer[];
}

const OfferMinimal: React.FC<OfferMinimalProps> = ({ offers }) => {
  return (
    <section className="py-16 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light mb-3 text-gray-900 dark:text-white">
            Choose Your Perfect Plan
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Simple, transparent pricing for everyone
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {offers.map((offer, index) => (
            <div key={index} className="relative group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-300"></div>

              <div className="relative p-6 bg-white dark:bg-gray-800 ring-1 ring-gray-200 dark:ring-gray-700 rounded-lg hover:shadow-xl transition-all duration-300">
                {/* Badge */}
                <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full mb-4">
                  {offer.badge}
                </span>

                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {offer.title}
                </h3>

                <div className="mb-4">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    {offer.offerPrice}
                  </span>
                  <span className="ml-2 text-sm text-gray-500 line-through">
                    {offer.originalPrice}
                  </span>
                </div>

                <ul className="space-y-2 mb-6">
                  {offer.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center text-sm text-gray-600 dark:text-gray-300"
                    >
                      <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button className="w-full py-2 px-4 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200">
                  Choose Plan
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OfferMinimal;

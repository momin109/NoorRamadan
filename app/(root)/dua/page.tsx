"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MoonIcon,
  SunIcon,
  SparklesIcon,
  ClockIcon,
  HeartIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { BookOpenIcon } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// Dua Data (Iftar)
const iftarDua = {
  arabic: "بِسْمِ اللَّهِ — الْحَمْدُ لِلَّهِ",
  banglaUccharon: "বিসমিল্লাহ — আলহামদুলিল্লাহ",
  banglaMeaning:
    "খাওয়ার শুরুতে ‘বিসমিল্লাহ’ বলবো এবং খাওয়ার শেষে ‘আলহামদুলিল্লাহ’ বলবো।",
  reference:
    "খাওয়ার শুরুতে আল্লাহর নাম নেওয়া সুন্নাহ (সহীহ বুখারি, সহীহ মুসলিম)। খাবার শেষে আল্লাহর প্রশংসা করা সুন্নাহ (সহীহ বুখারি)।",
  time: "ইফতারের সময়ের সুন্নাহ",
};

// Hadith Data
const hadiths = [
  {
    arabic:
      "لِلصَّائِمِ فَرْحَتَانِ: فَرْحَةٌ عِنْدَ فِطْرِهِ، وَفَرْحَةٌ عِنْدَ لِقَاءِ رَبِّهِ",
    bangla:
      "রোজাদারের জন্য দুইটি আনন্দ রয়েছে: একটি ইফতারের সময় এবং অন্যটি তার রবের সাক্ষাতে।",
    reference: "সহীহ বুখারী ১৯০৪",
    category: "রোজার মর্যাদা",
  },
  {
    arabic:
      "مَنْ صَامَ رَمَضَانَ إِيمَانًا وَاحْتِسَابًا غُفِرَ لَهُ مَا تَقَدَّمَ مِنْ ذَنْبِهِ",
    bangla:
      "যে ব্যক্তি ঈমানের সাথে সওয়াবের আশায় রমযানের রোযা রাখে, তার পূর্ববর্তী গুনাহ ক্ষমা করে দেয়া হয়।",
    reference: "সহীহ বুখারী ৩৮",
    category: "রমজানের ফজিলত",
  },
];

interface RamadanSectionProps {
  offers?: any[]; // If you want to pass offers
}

const RamadanSection: React.FC<RamadanSectionProps> = ({ offers = [] }) => {
  const [selectedHadith, setSelectedHadith] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Iftar time (example for Bangladesh)

  // Rotate Hadith every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedHadith((prev) => (prev + 1) % hadiths.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <Navbar />
      <section className="relative">
        {/* 🌙 Top Dua Section - Matching previous design */}
        <div className="relative py-20 px-4 overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 dark:from-gray-900 dark:via-emerald-950 dark:to-teal-950">
          {/* Background Grid Pattern - Same as Offer component */}
          <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]"></div>

          {/* Animated Blobs - Same as previous */}
          <div className="absolute top-0 -left-4 w-72 h-72 bg-emerald-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-teal-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-amber-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

          <div className="relative max-w-4xl mx-auto">
            {/* Header Badge - Same style as Offer component */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-block mb-4"
              >
                <span className="px-6 py-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white text-sm font-semibold shadow-lg shadow-amber-500/30 flex items-center gap-2">
                  <MoonIcon className="w-4 h-4" />
                  রমজানুল মোবারক ২০২৬
                  <SunIcon className="w-4 h-4" />
                </span>
              </motion.div>
            </motion.div>

            {/* Main Dua Card - Matching Offer card design */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative group"
            >
              {/* Glow Effect for Popular - Like Most Popular badge */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>

              {/* Card - Same style as Offer cards */}
              <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl">
                {/* Time Badge - Same badge style */}
                <div className="absolute -top-4 right-8 z-20">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full blur-md opacity-60"></div>
                    <div className="relative px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full text-white text-xs font-bold flex items-center gap-1">
                      <SparklesIcon className="w-3 h-3" />
                      {iftarDua.time}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="text-center">
                  {/* Moon Icon - Like the icons in Website Types */}
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-white shadow-xl mb-8"
                  >
                    <MoonIcon className="w-8 h-8" />
                  </motion.div>

                  {/* Arabic Text */}
                  <p
                    className="font-arabic text-3xl md:text-4xl lg:text-5xl text-white leading-loose mb-6"
                    dir="rtl"
                  >
                    {iftarDua.arabic}
                  </p>

                  {/* Bengali Translation - Same text style */}
                  <div className="space-y-3 mb-6">
                    <p className="text-amber-200 text-lg md:text-xl font-bangla">
                      {iftarDua.banglaUccharon}
                    </p>
                    <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto font-bangla">
                      {iftarDua.banglaMeaning}
                    </p>
                  </div>

                  {/* Reference - Like feature list items */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full">
                    <CheckBadgeIcon className="w-4 h-4 text-amber-400" />
                    <span className="text-sm text-amber-300/70">
                      {iftarDua.reference}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* 📖 Bottom Hadith Section - Matching previous design */}
        <div className="relative py-20 px-4 overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          {/* Background Grid */}
          <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25"></div>

          {/* Decorative Divider - Crescent with gradient line */}
          <div className="absolute top-0 left-0 right-0 flex justify-center">
            <div className="w-full max-w-7xl mx-auto px-4">
              <div className="flex items-center gap-2">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent"></div>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full blur-md opacity-50"></div>
                  <MoonIcon className="relative w-6 h-6 text-amber-500" />
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent"></div>
              </div>
            </div>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  হাদিসের আলো
                </span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                রমজানের ফজিলত সম্পর্কে রাসূল ﷺ-এর বাণী
              </p>
            </motion.div>

            {/* Hadith Card - Same style as Offer cards */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedHadith}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="relative group"
              >
                <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden">
                  {/* Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-500 opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>

                  <div className="relative p-8 md:p-10">
                    {/* Category Badge - Like Most Popular badge style */}
                    <div className="flex justify-center mb-6">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full blur-md opacity-30"></div>
                        <div className="relative px-4 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full text-sm font-semibold">
                          {hadiths[selectedHadith].category}
                        </div>
                      </div>
                    </div>

                    {/* Arabic Text */}
                    <p
                      className="text-center font-arabic text-2xl md:text-3xl text-gray-800 dark:text-gray-200 leading-loose mb-6"
                      dir="rtl"
                    >
                      {hadiths[selectedHadith].arabic}
                    </p>

                    {/* Bangla Translation */}
                    <p className="text-center text-lg md:text-xl text-gray-700 dark:text-gray-300 font-bangla mb-6">
                      {hadiths[selectedHadith].bangla}
                    </p>

                    {/* Reference */}
                    <div className="text-center">
                      <span className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 dark:bg-amber-900/30 rounded-full text-sm text-amber-700 dark:text-amber-400">
                        <BookOpenIcon className="w-4 h-4" />
                        {hadiths[selectedHadith].reference}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {hadiths.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedHadith(index)}
                  className={`transition-all duration-300 ${
                    selectedHadith === index
                      ? "w-8 h-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                      : "w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full hover:bg-amber-400"
                  }`}
                />
              ))}
            </div>

            {/* Additional Reminder */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-10 text-center"
            >
              <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2">
                <HeartIcon className="w-4 h-4 text-amber-500" />
                রাসূল ﷺ বলেছেন: "যে ব্যক্তি রমজানে একটি নেক কাজ করে, সে যেন অন্য
                মাসে ৭০টি ফরজ আদায় করল।"
                <HeartIcon className="w-4 h-4 text-amber-500" />
              </p>
            </motion.div>
          </div>
        </div>

        {/* CTA Section - Matching previous design */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="py-16 px-4 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-900 dark:to-gray-800"
        >
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                আপনার ওয়েবসাইট দরকার?
              </span>
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              ফ্রি কোন্সালটেশনের জন্য আজই যোগাযোগ করুন। রমজানের বিশেষ প্রার্থনা
              আমাদের সাথে থাকুক।
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold shadow-lg shadow-emerald-500/30 hover:shadow-xl transition-all duration-300 flex items-center gap-2"
              >
                <SparklesIcon className="w-5 h-5" />
                ফ্রি কোট নিন
              </motion.button>

              <motion.a
                href="https://wa.me/8801234567890"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-green-600 text-white rounded-xl font-semibold shadow-lg shadow-green-500/30 hover:shadow-xl transition-all duration-300 flex items-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.077 4.928C17.191 3.041 14.683 2 12.006 2c-5.118 0-9.29 4.172-9.29 9.29 0 1.637.427 3.238 1.24 4.642L2.5 21.5l5.568-1.456c1.354.745 2.875 1.138 4.438 1.138 5.117 0 9.29-4.172 9.29-9.29 0-2.481-.966-4.812-2.719-6.564zM12.006 19.68c-1.357 0-2.685-.365-3.823-1.055l-.274-.162-3.312.867.885-3.228-.178-.285c-.759-1.212-1.161-2.618-1.161-4.067 0-4.256 3.462-7.718 7.718-7.718 2.063 0 4.002.804 5.46 2.262 1.458 1.458 2.262 3.397 2.262 5.46 0 4.256-3.462 7.718-7.718 7.718z" />
                </svg>
                WhatsApp করুন
              </motion.a>
            </div>
          </div>
        </motion.div>

        <style jsx>{`
          @keyframes blob {
            0%,
            100% {
              transform: translate(0, 0) scale(1);
            }
            33% {
              transform: translate(30px, -50px) scale(1.1);
            }
            66% {
              transform: translate(-20px, 20px) scale(0.9);
            }
          }
          .animate-blob {
            animation: blob 7s infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animation-delay-4000 {
            animation-delay: 4s;
          }
          .font-arabic {
            font-family: "Amiri", serif;
          }
          .font-bangla {
            font-family: "Noto Sans Bengali", sans-serif;
          }
        `}</style>
      </section>
      <Footer />
    </div>
  );
};

export default RamadanSection;

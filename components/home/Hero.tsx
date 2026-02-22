"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ArrowRight,
  Clock,
  Moon,
  Sparkles,
  Star,
  Sun,
  CloudMoon,
  Heart,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// Helper function to format time
function fmt12h(hhmm: string) {
  if (!hhmm) return "--:-- --";
  const [hh, mm] = hhmm.split(":").map(Number);
  const ampm = hh >= 12 ? "PM" : "AM";
  const h12 = hh % 12 === 0 ? 12 : hh % 12;
  return `${h12}:${String(mm).padStart(2, "0")} ${ampm}`;
}

// Get today's date
function todayISO() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

interface HeroProps {
  divisionName?: string;
  districtName?: string;
  selectedTimes?: Array<{
    date: string;
    ramadanDay: number;
    sehriEnd: string;
    iftar: string;
  }>;
}

export function Hero({
  divisionName,
  districtName,
  selectedTimes = [],
}: HeroProps) {
  const [mounted, setMounted] = useState(false);

  // Get today's times from selectedTimes
  const todayTimes = (() => {
    if (!selectedTimes || selectedTimes.length === 0) return null;
    const today = todayISO();
    return selectedTimes.find((t) => t.date === today) || null;
  })();

  // Format times - Dynamic from selectedTimes
  const sehriTime = todayTimes ? fmt12h(todayTimes.sehriEnd) : "৪:২৭ AM";
  const iftarTime = todayTimes ? fmt12h(todayTimes.iftar) : "৬:২৪ PM";
  const ramadanDay = todayTimes?.ramadanDay || 1;

  // Format location display
  const displayDistrict = districtName || "ঢাকা";
  const displayDivision = divisionName || "ঢাকা";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 min-h-[400px] sm:min-h-[550px] md:min-h-[600px] lg:min-h-[650px] xl:min-h-[700px] flex items-center">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[url('/images/islamic-pattern.svg')] bg-repeat opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
      </div>

      {/* Animated Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Crescent Moons */}
        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 right-[10%] text-amber-500/20"
        >
          <Moon className="w-32 h-32" />
        </motion.div>

        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-20 left-[5%] text-amber-500/10"
        >
          <CloudMoon className="w-40 h-40" />
        </motion.div>

        {/* Animated Stars */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * 2000,
              y: Math.random() * 1000,
              scale: 0,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            className="absolute text-amber-400"
          >
            <Star className="w-1 h-1 fill-current" />
          </motion.div>
        ))}
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 -right-4 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-4000"></div>

      {/* Main Content */}
      <div className="container relative z-20 mx-auto px-4 py-8 sm:py-10 md:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            {/* Premium Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex flex-wrap items-center gap-2 md:gap-3 mb-4 md:mb-6 lg:mb-8"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full blur-md opacity-60"></div>
                <div className="relative px-3 py-1 md:px-4 md:py-1.5 lg:px-5 lg:py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full text-white text-xs md:text-sm font-bold flex items-center gap-1 md:gap-2 shadow-xl">
                  <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
                  <span>রমজান ২০২৬ / ১৪৪৭ হি.</span>
                </div>
              </div>

              <div className="flex items-center gap-1 px-2 py-1 md:px-3 md:py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <Heart className="w-2 h-2 md:w-3 md:h-3 text-amber-400" />
                <span className="text-[10px] md:text-xs text-white/90">
                  পবিত্র মাস
                </span>
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold mb-2 md:mb-3 lg:mb-4 leading-[1.2] md:leading-tight"
            >
              <span className="block bg-gradient-to-r from-white via-white to-amber-200 bg-clip-text text-transparent mb-1 md:mb-2">
                প্রতিটি মুহূর্তে ঈমান,
              </span>
              <span className="block bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
                প্রতিটি পদক্ষেপে সফলতা
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xs sm:text-sm md:text-base lg:text-lg text-white/80 mb-4 md:mb-6 lg:mb-8 max-w-lg leading-relaxed"
            >
              আপনার শহরের সঠিক সেহরি ও ইফতারের সময়সূচি দেখুন। পাশাপাশি এই পবিত্র
              রমজানে আপনার ব্যবসাকে এগিয়ে নিতে আমাদের প্রিমিয়াম ওয়েবসাইট সেবায়
              পাচ্ছেন বিশেষ ৫০% ছাড়।
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-row gap-2 md:gap-3 lg:gap-4"
            >
              <Link href="/sehri" className="w-1/2 sm:w-auto">
                <Button
                  size="lg"
                  className="group relative w-full sm:w-auto
        px-3 py-2.5 text-[11px]
        md:px-6 md:py-4 md:text-sm
        lg:px-8 lg:py-6 lg:text-base
        bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700
        text-white font-bold rounded-xl shadow-2xl shadow-amber-500/30 hover:shadow-amber-500/40
        transition-all duration-300 overflow-hidden"
                >
                  <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="relative flex items-center justify-center gap-1 md:gap-2 lg:gap-3">
                    <Clock className="h-3 w-3 md:h-4 md:w-4 lg:h-5 lg:w-5" />
                    সেহরির সময় দেখুন
                    <ArrowRight className="h-3 w-3 md:h-4 md:w-4 lg:h-5 lg:w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </Link>

              <Link href="/services" className="w-1/2 sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="group relative w-full sm:w-auto
        px-3 py-2.5 text-[11px]
        md:px-6 md:py-4 md:text-sm
        lg:px-8 lg:py-6 lg:text-base
        border-2 border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20
        text-white font-bold rounded-xl transition-all duration-300"
                >
                  <span className="flex items-center justify-center gap-1 md:gap-2 lg:gap-3">
                    <Sparkles className="h-3 w-3 md:h-4 md:w-4 lg:h-5 lg:w-5 text-amber-300" />
                    ৫০% ওয়েব অফার নিন
                    <ArrowRight className="h-3 w-3 md:h-4 md:w-4 lg:h-5 lg:w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-wrap items-center gap-3 md:gap-4 lg:gap-6 mt-4 md:mt-6 lg:mt-10 pt-3 md:pt-4 lg:pt-6 border-t border-white/10"
            >
              {[
                { label: "প্রজেক্ট", value: "১০০+" },
                { label: "ছাড়", value: "৫০%" },
                { label: "সাপোর্ট", value: "২৪/৭" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1 md:gap-2 lg:gap-3"
                >
                  <div className="h-5 w-5 md:h-6 md:w-6 lg:h-8 lg:w-8 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                    <Star className="h-2 w-2 md:h-3 md:w-3 lg:h-4 lg:w-4 text-white fill-current" />
                  </div>
                  <div>
                    <p className="text-[8px] md:text-[10px] lg:text-xs text-white/60">
                      {item.label}
                    </p>
                    <p className="text-xs md:text-sm lg:text-base font-semibold text-white">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Decorative Elements */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block relative"
          >
            {/* Premium Glass Card */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 rounded-3xl blur-2xl opacity-30"></div>
              <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-6 xl:p-8 border border-white/10">
                {/* Iftar Time Display - Dynamic */}
                <div className="text-center mb-4 xl:mb-6">
                  <div className="inline-flex p-2 xl:p-3 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 mb-2 xl:mb-3">
                    <Sun className="h-5 w-5 xl:h-6 xl:w-6 text-white" />
                  </div>
                  <h3 className="text-lg xl:text-xl font-bold text-white mb-1">
                    আজকের ইফতার
                  </h3>
                  <p className="text-2xl xl:text-3xl font-bold text-amber-400">
                    {iftarTime}
                  </p>
                  <p className="text-xs text-white/60 mt-1">
                    {displayDistrict} জেলা, {displayDivision} বিভাগ
                  </p>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-2 my-3 xl:my-4">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                  <Moon className="w-4 h-4 text-amber-400" />
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                </div>

                {/* Sehri Time Display - Dynamic */}
                <div className="text-center">
                  <div className="inline-flex p-2 xl:p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 mb-2 xl:mb-3">
                    <Moon className="h-5 w-5 xl:h-6 xl:w-6 text-white" />
                  </div>
                  <h3 className="text-lg xl:text-xl font-bold text-white mb-1">
                    আজকের সেহরি শেষ
                  </h3>
                  <p className="text-2xl xl:text-3xl font-bold text-blue-400">
                    {sehriTime}
                  </p>
                  <p className="text-xs text-white/60 mt-1">
                    রমজান {ramadanDay}, ২০২৬
                  </p>
                </div>

                {/* Quick Stats - Dynamic */}
                <div className="grid grid-cols-2 gap-2 xl:gap-3 mt-4 xl:mt-6">
                  <div className="text-center p-2 bg-white/5 rounded-xl">
                    <p className="text-xs text-white/60">রমজান দিন</p>
                    <p className="text-lg font-bold text-white">{ramadanDay}</p>
                  </div>
                  <div className="text-center p-2 bg-white/5 rounded-xl">
                    <p className="text-xs text-white/60">বাকি দিন</p>
                    <p className="text-lg font-bold text-white">
                      {30 - ramadanDay}
                    </p>
                  </div>
                </div>

                {/* Show selection info if available */}
                {selectedTimes.length > 0 && (
                  <div className="mt-3 text-center">
                    <p className="text-xs text-amber-300/70">
                      * {displayDistrict} জেলার জন্য ডাইনামিক টাইম
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Floating Badge */}
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -top-4 -right-4"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full blur-md opacity-60"></div>
                <div className="relative px-2 py-1 xl:px-3 xl:py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full text-white text-xs font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  ৫০% ছাড়
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-12 md:h-16 lg:h-24 bg-gradient-to-t from-slate-900 to-transparent"></div>

      <style jsx>{`
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.5;
          }
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}

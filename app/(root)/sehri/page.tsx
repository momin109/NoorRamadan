"use client";

import { useState, useMemo } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ArrowRight,
  Moon,
  Calendar,
  Heart,
  Star,
  Sparkles,
  Clock,
  BookOpen,
  Sun,
  CloudMoon,
  Timer,
  CheckCircle,
  Phone,
  MessageSquare,
} from "lucide-react";
import { motion } from "framer-motion";

import { PrayerTimes } from "@/components/ramadan/PrayerTimes";
import { RamadanCalendar } from "@/components/ramadan/Calendar";

type DayTimes = {
  date: string;
  ramadanDay: number;
  sehriEnd: string;
  iftar: string;
};

// Dua Data
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

// Helper function to format time to 12-hour format
function fmt12h(hhmm: string) {
  const [hh, mm] = hhmm.split(":").map(Number);
  const ampm = hh >= 12 ? "PM" : "AM";
  const h12 = hh % 12 === 0 ? 12 : hh % 12;
  return `${h12}:${String(mm).padStart(2, "0")} ${ampm}`;
}

// Get today's date in YYYY-MM-DD format
function todayISO() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export default function Page() {
  const [divisionName, setDivisionName] = useState("");
  const [districtName, setDistrictName] = useState("");
  const [selectedTimes, setSelectedTimes] = useState<DayTimes[]>([]);
  const [selectedHadith, setSelectedHadith] = useState(0);

  // Get today's times from selectedTimes
  const todayTimes = useMemo(() => {
    if (!selectedTimes.length) return null;
    const today = todayISO();
    return selectedTimes.find((t) => t.date === today) || null;
  }, [selectedTimes]);

  // Format times for display
  const sehriTime = todayTimes ? fmt12h(todayTimes.sehriEnd) : "--:-- --";
  const iftarTime = todayTimes ? fmt12h(todayTimes.iftar) : "--:-- --";

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 pointer-events-none"></div>

      {/* Animated Blobs */}
      <div className="fixed top-20 -left-4 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob pointer-events-none"></div>
      <div className="fixed top-40 -right-4 w-72 h-72 bg-amber-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000 pointer-events-none"></div>
      <div className="fixed -bottom-8 left-20 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000 pointer-events-none"></div>

      <Navbar />

      <main className="flex-1 relative z-10">
        {/* Hero Section with Dua */}
        <section className="relative pt-8 pb-20 overflow-hidden">
          <div className="container max-w-7xl mx-auto px-4">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-block mb-4"
              >
                <span className="px-6 py-2 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-sm font-semibold shadow-lg shadow-emerald-500/30 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  রমজানুল মোবারক ২০২৬ / ১৪৪৭ হিজরি
                </span>
              </motion.div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-600 bg-clip-text text-transparent">
                  পবিত্র রমজান মাসের
                </span>
                <br />
                <span className="text-gray-900 dark:text-white">
                  সম্পূর্ণ গাইডলাইন
                </span>
              </h1>

              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                সঠিক সময়ে সেহরি ও ইফতার, পবিত্র দোয়া ও হাদিস — আপনার রমজানকে
                করুন অর্থবহ ও বরকতময়।
              </p>
            </motion.div>

            {/* Dua Card - Top */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative max-w-4xl mx-auto mb-16 group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>

              <div className="relative bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 rounded-3xl p-8 md:p-10 shadow-2xl border border-white/10">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-emerald-400 to-teal-400 rounded-t-3xl"></div>

                <div className="text-center">
                  <div className="inline-flex p-4 rounded-2xl bg-white/10 backdrop-blur-sm text-white shadow-xl mb-6">
                    <CloudMoon className="w-8 h-8" />
                  </div>

                  <p
                    className="font-arabic text-2xl md:text-3xl lg:text-4xl text-white leading-loose mb-6"
                    dir="rtl"
                  >
                    {iftarDua.arabic}
                  </p>

                  <div className="space-y-3 mb-6">
                    <p className="text-emerald-200 text-lg md:text-xl font-bangla">
                      {iftarDua.banglaUccharon}
                    </p>
                    <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto font-bangla">
                      {iftarDua.banglaMeaning}
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm text-emerald-300/70">
                      📚 {iftarDua.reference}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Quick Stats - Dynamic Times */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-8 mb-28"
            >
              {[
                { icon: Clock, label: "সেহরি শেষ", value: sehriTime },
                { icon: Timer, label: "ইফতার", value: iftarTime },
                { icon: Calendar, label: "রমজান", value: "৩০ দিন" },
                { icon: BookOpen, label: "দোয়া", value: "সহীহ হাদিস" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5 }}
                  className="flex items-center gap-3 bg-white dark:bg-gray-800 px-6 py-3 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
                >
                  <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg text-white">
                    <stat.icon className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {stat.label}
                    </p>
                    <p className="font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Location Info - Shows current selection */}
            {divisionName && districtName && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center mb-4"
              >
                <p className="text-sm text-emerald-600 dark:text-emerald-400">
                  📍 {districtName}, {divisionName} -{" "}
                  {todayTimes ? `রমজান ${todayTimes.ramadanDay}` : ""}
                </p>
              </motion.div>
            )}

            {/* Prayer Times Card */}
            <div className="relative max-w-4xl mx-auto">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-600 rounded-2xl blur opacity-30"></div>

              <div className="relative">
                <PrayerTimes
                  divisionName={divisionName}
                  setDivisionName={setDivisionName}
                  districtName={districtName}
                  setDistrictName={setDistrictName}
                  setSelectedTimes={setSelectedTimes}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Calendar Section */}
        <section className="py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent"></div>

          <div className="container max-w-7xl mx-auto px-4 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-full text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-4">
                <Calendar className="h-4 w-4" />
                <span>রমজান ক্যালেন্ডার ২০২৬</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  সেহরি ও ইফতারের
                </span>
                <br />
                <span className="text-gray-900 dark:text-white">
                  সম্পূর্ণ সময়সূচি
                </span>
              </h2>

              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                আপনার বিভাগ ও জেলা নির্বাচন করে দেখুন সঠিক সেহরি ও ইফতারের সময়
              </p>
            </motion.div>

            <div className="max-w-5xl mx-auto">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-600 rounded-3xl opacity-30 group-hover:opacity-50 blur transition duration-1000"></div>

                <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-1">
                  <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden">
                    {selectedTimes.length ? (
                      <RamadanCalendar
                        times={selectedTimes}
                        districtName={districtName}
                        divisionName={divisionName}
                      />
                    ) : (
                      <div className="p-16 text-center">
                        <div className="inline-flex p-4 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 mb-4">
                          <Calendar className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 text-lg">
                          প্রথমে উপরের ফর্ম থেকে আপনার বিভাগ ও জেলা নির্বাচন
                          করুন
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Features Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="grid md:grid-cols-3 gap-6 mt-16"
              >
                {[
                  {
                    icon: Star,
                    title: "প্রতিদিনের দোয়া",
                    description: "সহীহ হাদিস থেকে সংগৃহীত রোজার দোয়া",
                    gradient: "from-emerald-600 to-teal-600",
                  },
                  {
                    icon: Heart,
                    title: "ফজিলত ও পুরস্কার",
                    description: "প্রতিটি দিনের বিশেষ ফজিলত ও আমল",
                    gradient: "from-teal-600 to-amber-600",
                  },
                  {
                    icon: Sparkles,
                    title: "বিশেষ রাতসমূহ",
                    description: "লাইলাতুল কদর ও অন্যান্য গুরুত্বপূর্ণ রাত",
                    gradient: "from-amber-600 to-emerald-600",
                  },
                ].map((feature, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -10 }}
                    className="relative group"
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity`}
                    ></div>
                    <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
                      <div
                        className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.gradient} text-white shadow-lg mb-4`}
                      >
                        <feature.icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Hadith Section - Bottom */}
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-900 dark:to-gray-800"></div>

          {/* Decorative Divider */}
          <div className="absolute top-0 left-0 right-0 flex justify-center">
            <div className="w-full max-w-7xl mx-auto px-4">
              <div className="flex items-center gap-2">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent"></div>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full blur-md opacity-50"></div>
                  <Moon className="relative w-6 h-6 text-amber-500" />
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent"></div>
              </div>
            </div>
          </div>

          <div className="container max-w-4xl mx-auto px-4 relative mt-12">
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
                রাসূলুল্লাহ ﷺ-এর বাণী — আমাদের পথ প্রদর্শক
              </p>
            </motion.div>

            {/* Hadith Card */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>

              <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-10 shadow-2xl">
                <div className="absolute -top-4 left-8">
                  <div className="px-4 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full text-sm font-semibold">
                    {hadiths[selectedHadith].category}
                  </div>
                </div>

                <div className="text-center mt-4">
                  <p
                    className="font-arabic text-2xl md:text-3xl text-gray-800 dark:text-gray-200 leading-loose mb-6"
                    dir="rtl"
                  >
                    {hadiths[selectedHadith].arabic}
                  </p>

                  <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 font-bangla mb-6">
                    {hadiths[selectedHadith].bangla}
                  </p>

                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 dark:bg-amber-900/30 rounded-full">
                    <BookOpen className="w-4 h-4 text-amber-500" />
                    <span className="text-sm text-amber-700 dark:text-amber-400">
                      {hadiths[selectedHadith].reference}
                    </span>
                  </div>
                </div>

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
              </div>
            </div>

            {/* Additional Reminder */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8 flex items-center justify-center gap-2"
            >
              <Heart className="w-4 h-4 text-amber-500" />
              রাসূল ﷺ বলেছেন: "যে ব্যক্তি রমজানে একটি নেক কাজ করে, সে যেন অন্য
              মাসে ৭০টি ফরজ আদায় করল।"
              <Heart className="w-4 h-4 text-amber-500" />
            </motion.p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-900 dark:to-gray-800">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                আপনার ওয়েবসাইট দরকার?
              </span>
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              রমজান স্পেশাল অফার নিন আজই। ফ্রি কোন্সালটেশনের জন্য যোগাযোগ করুন।
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact">
                <Button className="px-8 py-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold text-lg shadow-lg shadow-emerald-500/30 hover:shadow-xl transition-all duration-300">
                  ফ্রি কোট নিন
                </Button>
              </Link>
              <a
                href="https://wa.me/8801797764148"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="px-8 py-6 bg-green-600 text-white rounded-xl font-semibold text-lg shadow-lg shadow-green-500/30 hover:shadow-xl transition-all duration-300 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />

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
          font-family: "Amiri", "Scheherazade New", serif;
        }
        .font-bangla {
          font-family: "Noto Sans Bengali", sans-serif;
        }
      `}</style>
    </div>
  );
}

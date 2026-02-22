"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Star,
  Sparkles,
  Moon,
  Calendar,
  Clock,
  BookOpen,
  Heart,
  MessageSquare,
} from "lucide-react";
import { PrayerTimes } from "@/components/ramadan/PrayerTimes";
import { RamadanCalendar } from "@/components/ramadan/Calendar";
import { useState, useMemo } from "react";
import { offers } from "@/data/offers";
import Offer from "@/components/offerSection/Offer";
import { motion } from "framer-motion";

type DayTimes = {
  date: string;
  ramadanDay: number;
  sehriEnd: string;
  iftar: string;
};

// Helper function to format time
function fmt12h(hhmm: string) {
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

export default function Home() {
  const [divisionName, setDivisionName] = useState("");
  const [districtName, setDistrictName] = useState("");
  const [selectedTimes, setSelectedTimes] = useState<DayTimes[]>([]);

  // Get today's times
  const todayTimes = useMemo(() => {
    if (!selectedTimes.length) return null;
    const today = todayISO();
    return selectedTimes.find((t) => t.date === today) || null;
  }, [selectedTimes]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 pointer-events-none"></div>

      {/* Animated Blobs */}
      <div className="fixed top-20 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob pointer-events-none"></div>
      <div className="fixed top-40 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000 pointer-events-none"></div>
      <div className="fixed -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000 pointer-events-none"></div>

      <Navbar />

      <main className="flex-1 relative z-10">
        <Hero
          divisionName={divisionName}
          districtName={districtName}
          selectedTimes={selectedTimes}
        />

        {/* Ramadan Welcome Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="container mt-8 mb-28"
        >
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur-xl opacity-30"></div>
            <div className="relative bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-6 text-white shadow-2xl">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <Moon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">রমজানুল মোবারক ২০২৬</h3>
                    <p className="text-emerald-100">
                      পবিত্র মাসের সময়সূচি দেখুন
                    </p>
                  </div>
                </div>
                {todayTimes && (
                  <div className="flex gap-4">
                    <div className="text-center">
                      <p className="text-sm text-emerald-100">সেহরি শেষ</p>
                      <p className="text-2xl font-bold">
                        {fmt12h(todayTimes.sehriEnd)}
                      </p>
                    </div>
                    <div className="w-px h-10 bg-white/20"></div>
                    <div className="text-center">
                      <p className="text-sm text-emerald-100">ইফতার</p>
                      <p className="text-2xl font-bold">
                        {fmt12h(todayTimes.iftar)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Prayer Times Section */}
        <section className="container relative z-20 mb-20 mt-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <PrayerTimes
              divisionName={divisionName}
              setDivisionName={setDivisionName}
              districtName={districtName}
              setDistrictName={setDistrictName}
              setSelectedTimes={setSelectedTimes}
            />
          </motion.div>
        </section>

        {/* Quick Stats - Dynamic */}
        {selectedTimes.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="container mb-12"
          >
            <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "মোট দিন", value: "৩০", icon: Calendar },
                {
                  label: "রমজান",
                  value: todayTimes?.ramadanDay || "-",
                  icon: Star,
                },
                {
                  label: "সেহরি শেষ",
                  value: todayTimes ? fmt12h(todayTimes.sehriEnd) : "-",
                  icon: Clock,
                },
                {
                  label: "ইফতার",
                  value: todayTimes ? fmt12h(todayTimes.iftar) : "-",
                  icon: Moon,
                },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg text-white">
                      <stat.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {stat.label}
                      </p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Calendar Preview Section */}
        <section className="py-16 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent"></div>

          <div className="container relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 rounded-full text-purple-600 dark:text-purple-400 text-sm font-medium mb-4">
                <Calendar className="h-4 w-4" />
                <span>রমজান ক্যালেন্ডার ২০২৬</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                  সেহরি ও ইফতারের
                </span>
                <br />
                <span className="text-gray-900 dark:text-white">
                  সম্পূর্ণ সময়সূচি
                </span>
              </h2>

              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                আপনার বিভাগ ও জেলা নির্বাচন করে দেখুন ৩০ দিনের সঠিক সময়সূচি
              </p>
            </motion.div>

            <div className="max-w-5xl mx-auto">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl opacity-30 group-hover:opacity-50 blur transition duration-1000"></div>

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
                        <div className="inline-flex p-4 rounded-2xl bg-purple-100 dark:bg-purple-900/30 mb-4">
                          <Calendar className="w-8 h-8 text-purple-600 dark:text-purple-400" />
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

              {/* Navigation Buttons */}
              <div className="flex flex-wrap gap-4 justify-center mt-8">
                <Link href="/ramadan">
                  <Button
                    variant="outline"
                    size="lg"
                    className="gap-2 border-purple-200 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-900/30"
                  >
                    <Calendar className="h-4 w-4" />
                    সম্পূর্ণ ক্যালেন্ডার দেখুন
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>

                <Link href="/dua">
                  <Button
                    size="lg"
                    className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg shadow-purple-500/30"
                  >
                    <BookOpen className="h-4 w-4" />
                    দোয়া ও হাদিস দেখুন
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white dark:bg-gray-800/50">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  কেন আমাদের বেছে নেবেন?
                </span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                আমরা দিই প্রিমিয়াম কোয়ালিটি ওয়েবসাইট, সাথে অসাধারণ সাপোর্ট
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Star,
                  title: "৫০% ছাড়",
                  description: "রমজান স্পেশাল অফার",
                  gradient: "from-purple-600 to-pink-600",
                },
                {
                  icon: Clock,
                  title: "দ্রুত ডেলিভারি",
                  description: "৫-২০ দিনের মধ্যে",
                  gradient: "from-blue-600 to-cyan-600",
                },
                {
                  icon: Heart,
                  title: "৩০ দিন সাপোর্ট",
                  description: "ফ্রি টেকনিক্যাল সাপোর্ট",
                  gradient: "from-green-600 to-emerald-600",
                },
                {
                  icon: MessageSquare,
                  title: "২৪/৭ সাপোর্ট",
                  description: "WhatsApp এ কথা বলুন",
                  gradient: "from-orange-600 to-red-600",
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
            </div>
          </div>
        </section>

        {/* Services Promo Section */}
        <Offer offers={offers} />

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-2xl opacity-30"></div>
              <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-12 shadow-2xl border border-gray-200 dark:border-gray-700">
                <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-xl mb-6">
                  <Sparkles className="h-8 w-8" />
                </div>

                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    আপনার ওয়েবসাইট তৈরি হোক আজই
                  </span>
                </h3>

                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto">
                  রমজান উপলক্ষে নিন ৫০% ছাড়। ফ্রি কোন্সালটেশনের জন্য আজই
                  যোগাযোগ করুন।
                </p>

                <div className="flex flex-wrap gap-4 justify-center">
                  <Link href="/contact">
                    <Button className="px-8 py-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold text-lg shadow-lg shadow-purple-500/30 hover:shadow-xl transition-all duration-300">
                      ফ্রি কোট নিন
                    </Button>
                  </Link>
                  <a
                    href="https://wa.me/8801797764148"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="px-8 py-6 bg-green-600 text-white rounded-xl font-semibold text-lg shadow-lg shadow-green-500/30 hover:shadow-xl transition-all duration-300 flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      WhatsApp
                    </Button>
                  </a>
                </div>

                {/* Trust Badges */}
                <div className="flex flex-wrap justify-center gap-4 mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                  {[
                    "১০০+ প্রজেক্ট",
                    "৫০% ছাড়",
                    "৩০ দিন সাপোর্ট",
                    "ফ্রি কোন্সালটেশন",
                  ].map((text, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400"
                    >
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      {text}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
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
      `}</style>
    </div>
  );
}

// "use client";

// import { Navbar } from "@/components/layout/Navbar";
// import { Footer } from "@/components/layout/Footer";
// import { Hero } from "@/components/home/Hero";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import Link from "next/link";
// import { ArrowRight, CheckCircle2, Star } from "lucide-react";
// import { PrayerTimes } from "@/components/ramadan/PrayerTimes";
// import { RamadanCalendar } from "@/components/ramadan/Calendar";
// import { useState } from "react";
// import { offers } from "@/data/offers";
// import Offer from "@/components/offerSection/Offer";

// type DayTimes = {
//   date: string;
//   ramadanDay: number;
//   sehriEnd: string;
//   iftar: string;
// };

// export default function Home() {
//   const [divisionName, setDivisionName] = useState("");
//   const [districtName, setDistrictName] = useState("");
//   const [selectedTimes, setSelectedTimes] = useState<DayTimes[]>([]);

//   return (
//     <div className="min-h-screen flex flex-col bg-background font-sans">
//       <Navbar />

//       <main className="flex-1">
//         <Hero />

//         {/* Prayer Times Section */}
//         <section className="container relative z-20 mb-20">
//           <PrayerTimes
//             divisionName={divisionName}
//             setDivisionName={setDivisionName}
//             districtName={districtName}
//             setDistrictName={setDistrictName}
//             setSelectedTimes={setSelectedTimes}
//           />
//         </section>

//         {/* Calendar Preview Section */}
//         <section className="py-16 bg-muted/30">
//           <div className="container">
//             <div className="max-w-4xl mx-auto">
//               {selectedTimes.length ? (
//                 <RamadanCalendar
//                   times={selectedTimes}
//                   districtName={districtName}
//                   divisionName={divisionName}
//                 />
//               ) : null}
//               <div className="mt-8 text-center">
//                 <Link href="/dua">
//                   <Button variant="outline" size="lg" className="gap-2">
//                     Duas & Hadith দেখুন <ArrowRight className="h-4 w-4" />
//                   </Button>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Services Promo Section */}
//         <Offer offers={offers} />
//       </main>

//       <Footer />
//     </div>
//   );
// }

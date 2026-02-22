"use client";

import { useEffect, useMemo, useState } from "react";
import data from "@/data/ramadan-2026-bd.json";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Sun,
  Moon,
  Share2,
  Clock,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { motion } from "framer-motion";

type DayTimes = {
  date: string;
  ramadanDay: number;
  sehriEnd: string;
  iftar: string;
};

type District = { name: string; times: DayTimes[] };
type Division = { name: string; districts: District[] };

function todayISO(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function fmt12h(hhmm: string) {
  const [hh, mm] = hhmm.split(":").map(Number);
  const ampm = hh >= 12 ? "PM" : "AM";
  const h12 = hh % 12 === 0 ? 12 : hh % 12;
  return `${h12}:${String(mm).padStart(2, "0")} ${ampm}`;
}

export function PrayerTimes({
  divisionName,
  setDivisionName,
  districtName,
  setDistrictName,
  setSelectedTimes,
}: {
  divisionName: string;
  setDivisionName: (v: string) => void;
  districtName: string;
  setDistrictName: (v: string) => void;
  setSelectedTimes: (times: DayTimes[]) => void;
}) {
  const divisions = data.divisions as Division[];

  useEffect(() => {
    if (!divisionName && divisions.length) setDivisionName(divisions[0].name);
  }, []);

  const districts = useMemo(() => {
    return divisions.find((d) => d.name === divisionName)?.districts ?? [];
  }, [divisionName, divisions]);

  useEffect(() => {
    if (districts.length) setDistrictName(districts[0].name);
  }, [districts, setDistrictName]);

  const selectedDistrict = useMemo(() => {
    return districts.find((z) => z.name === districtName) ?? districts[0];
  }, [districtName, districts]);

  useEffect(() => {
    setSelectedTimes(selectedDistrict?.times ?? []);
  }, [selectedDistrict, setSelectedTimes]);

  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const iso = todayISO(now);
  const todayRow = useMemo(() => {
    return selectedDistrict?.times?.find((t) => t.date === iso) ?? null;
  }, [selectedDistrict, iso]);

  const isFirstRoza = todayRow?.ramadanDay === 1;
  const isSecondRoza = todayRow?.ramadanDay === 2;

  const handleShare = async () => {
    if (!todayRow) {
      toast.error("আজকের সময়সূচি পাওয়া যায়নি।");
      return;
    }

    const text =
      `🕌 রমজান ${todayRow.ramadanDay}\n` +
      `📍 ${districtName}, ${divisionName}\n` +
      `📅 ${now.toLocaleDateString("bn-BD", { weekday: "long", day: "numeric", month: "long" })}\n` +
      `🌙 সেহরি শেষ: ${fmt12h(todayRow.sehriEnd)}\n` +
      `☀️ ইফতার: ${fmt12h(todayRow.iftar)}\n\n` +
      `রমজান মোবারক! 🌙✨`;

    try {
      await navigator.clipboard.writeText(text);
      toast.success("আজকের সময় কপি হয়েছে!", {
        duration: 3000,
      });
    } catch {
      toast.success("শেয়ার টেক্সট প্রস্তুত আছে।");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-4xl mx-auto px-4 -mt-20 relative z-20"
    >
      <div className="relative group">
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-amber-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>

        {/* Main Card */}
        <Card className="relative bg-white dark:bg-gray-800 border-0 shadow-2xl overflow-hidden">
          {/* Top Gradient Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-amber-500"></div>

          <CardHeader className="p-4 md:p-8 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Location Selector */}
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg shadow-lg">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white">
                    আপনার লোকেশন:
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-3 w-full sm:flex sm:flex-wrap sm:w-auto">
                  <Select value={divisionName} onValueChange={setDivisionName}>
                    <SelectTrigger className="w-full sm:w-[160px] bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-emerald-500">
                      <SelectValue placeholder="বিভাগ" />
                    </SelectTrigger>
                    <SelectContent>
                      {divisions.map((d) => (
                        <SelectItem key={d.name} value={d.name}>
                          {d.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={districtName} onValueChange={setDistrictName}>
                    <SelectTrigger className="w-full sm:w-[180px] bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-emerald-500">
                      <SelectValue placeholder="জেলা" />
                    </SelectTrigger>
                    <SelectContent>
                      {districts.map((z) => (
                        <SelectItem key={z.name} value={z.name}>
                          {z.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Date Display */}
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl">
                <Clock className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {now.toLocaleDateString("bn-BD", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6 md:p-8">
            {!todayRow ? (
              <div className="text-center py-12">
                <div className="inline-flex p-4 rounded-2xl bg-gray-100 dark:bg-gray-700 mb-4">
                  <Clock className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  আজকের জন্য টাইমটেবিল ডেটা নেই।
                </p>
              </div>
            ) : (
              <>
                {/* Ramadan Day Badge */}
                <motion.div
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  className="mb-8"
                >
                  <div
                    className={`
      relative inline-flex mx-auto 
      px-5 py-2.5 text-base
      sm:px-6 sm:py-3 sm:text-lg
      rounded-full text-white font-bold
      ${
        isFirstRoza
          ? "bg-gradient-to-r from-emerald-600 to-teal-600"
          : isSecondRoza
            ? "bg-gradient-to-r from-teal-600 to-amber-600"
            : "bg-gradient-to-r from-emerald-600 to-amber-600"
      }
    `}
                  >
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    রমজান {todayRow.ramadanDay} — {districtName}, {divisionName}
                  </div>
                </motion.div>

                {/* Time Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  {/* Sehri Card */}
                  <motion.div whileHover={{ y: -5 }} className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                    <div className="relative bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/50 dark:to-teal-950/50 rounded-2xl p-8 border-2 border-emerald-200 dark:border-emerald-800">
                      <div className="flex flex-col items-center">
                        <div className="p-4 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl text-white shadow-xl mb-4">
                          <Moon className="h-10 w-10" />
                        </div>
                        <h4 className="text-gray-600 dark:text-gray-400 font-medium mb-2">
                          সেহরি শেষ
                        </h4>
                        <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                          {fmt12h(todayRow.sehriEnd)}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Iftar Card */}
                  <motion.div whileHover={{ y: -5 }} className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                    <div className="relative bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/50 dark:to-orange-950/50 rounded-2xl p-8 border-2 border-amber-200 dark:border-amber-800">
                      <div className="flex flex-col items-center">
                        <div className="p-4 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl text-white shadow-xl mb-4">
                          <Sun className="h-10 w-10" />
                        </div>
                        <h4 className="text-gray-600 dark:text-gray-400 font-medium mb-2">
                          ইফতার
                        </h4>
                        <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                          {fmt12h(todayRow.iftar)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Share Button */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex justify-center mt-8"
                >
                  <Button
                    onClick={handleShare}
                    className="group px-8 py-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl font-semibold shadow-lg shadow-emerald-500/30 hover:shadow-xl transition-all duration-300"
                  >
                    <Share2 className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                    আজকের সময় শেয়ার করুন
                  </Button>
                </motion.div>

                {/* Additional Info */}
                <div className="flex justify-center gap-4 mt-6 text-xs text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                    ইসলামিক ফাউন্ডেশন সময়সূচি
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-teal-500 rounded-full"></span>
                    নির্ভুল ও সহীহ
                  </span>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}

// "use client";

// import { useEffect, useMemo, useState } from "react";
// import data from "@/data/ramadan-2026-bd.json";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { MapPin, Sun, Moon, Share2 } from "lucide-react";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { toast } from "sonner";

// type DayTimes = {
//   date: string;
//   ramadanDay: number;
//   sehriEnd: string;
//   iftar: string;
// };

// type District = { name: string; times: DayTimes[] };
// type Division = { name: string; districts: District[] };

// function todayISO(d = new Date()) {
//   const y = d.getFullYear();
//   const m = String(d.getMonth() + 1).padStart(2, "0");
//   const day = String(d.getDate()).padStart(2, "0");
//   return `${y}-${m}-${day}`;
// }

// function fmt12h(hhmm: string) {
//   const [hh, mm] = hhmm.split(":").map(Number);
//   const ampm = hh >= 12 ? "PM" : "AM";
//   const h12 = hh % 12 === 0 ? 12 : hh % 12;
//   return `${h12}:${String(mm).padStart(2, "0")} ${ampm}`;
// }

// export function PrayerTimes({
//   divisionName,
//   setDivisionName,
//   districtName,
//   setDistrictName,
//   setSelectedTimes,
// }: {
//   divisionName: string;
//   setDivisionName: (v: string) => void;
//   districtName: string;
//   setDistrictName: (v: string) => void;
//   setSelectedTimes: (times: DayTimes[]) => void;
// }) {
//   const divisions = data.divisions as Division[];

//   // ✅ initial default set (only once)
//   useEffect(() => {
//     if (!divisionName && divisions.length) setDivisionName(divisions[0].name);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const districts = useMemo(() => {
//     return divisions.find((d) => d.name === divisionName)?.districts ?? [];
//   }, [divisionName, divisions]);

//   // ✅ division change → first district auto select
//   useEffect(() => {
//     if (districts.length) setDistrictName(districts[0].name);
//   }, [districts, setDistrictName]);

//   const selectedDistrict = useMemo(() => {
//     return districts.find((z) => z.name === districtName) ?? districts[0];
//   }, [districtName, districts]);

//   // ✅ calendar times parent এ পাঠানো
//   useEffect(() => {
//     setSelectedTimes(selectedDistrict?.times ?? []);
//   }, [selectedDistrict, setSelectedTimes]);

//   const [now, setNow] = useState(new Date());
//   useEffect(() => {
//     const t = setInterval(() => setNow(new Date()), 1000);
//     return () => clearInterval(t);
//   }, []);

//   const iso = todayISO(now);

//   const todayRow = useMemo(() => {
//     return selectedDistrict?.times?.find((t) => t.date === iso) ?? null;
//   }, [selectedDistrict, iso]);

//   const isFirstRoza = todayRow?.ramadanDay === 1;
//   const isSecondRoza = todayRow?.ramadanDay === 2;

//   const handleShare = async () => {
//     if (!todayRow) {
//       toast.error("আজকের সময়সূচি পাওয়া যায়নি।");
//       return;
//     }

//     const text =
//       `জেলা: ${districtName}, বিভাগ: ${divisionName}\n` +
//       `তারিখ: ${todayRow.date} (রমজান ${todayRow.ramadanDay})\n` +
//       `সেহরি শেষ: ${fmt12h(todayRow.sehriEnd)}\n` +
//       `ইফতার: ${fmt12h(todayRow.iftar)}`;

//     try {
//       await navigator.clipboard.writeText(text);
//       toast.success("আজকের সময় কপি হয়েছে।");
//     } catch {
//       toast.success("শেয়ার টেক্সট প্রস্তুত আছে।");
//     }
//   };

//   return (
//     <div className="w-full max-w-4xl mx-auto px-4 -mt-20 relative z-20">
//       <Card className="shadow-2xl border-none bg-card/95 backdrop-blur-sm">
//         <CardHeader className="flex flex-col md:flex-row items-center justify-between gap-4 pb-2 border-b">
//           <div className="flex items-center gap-2 flex-wrap">
//             <MapPin className="h-5 w-5 text-primary" />
//             <h3 className="font-heading text-lg font-semibold text-foreground">
//               লোকেশন:
//             </h3>

//             <Select value={divisionName} onValueChange={setDivisionName}>
//               <SelectTrigger className="w-[160px] bg-background border-primary/20">
//                 <SelectValue placeholder="বিভাগ" />
//               </SelectTrigger>
//               <SelectContent>
//                 {divisions.map((d) => (
//                   <SelectItem key={d.name} value={d.name}>
//                     {d.name}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>

//             <Select value={districtName} onValueChange={setDistrictName}>
//               <SelectTrigger className="w-[180px] bg-background border-primary/20">
//                 <SelectValue placeholder="জেলা" />
//               </SelectTrigger>
//               <SelectContent>
//                 {districts.map((z) => (
//                   <SelectItem key={z.name} value={z.name}>
//                     {z.name}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//           <div className="text-sm text-muted-foreground font-mono">
//             {now.toLocaleDateString("bn-BD", {
//               weekday: "long",
//               year: "numeric",
//               month: "long",
//               day: "numeric",
//             })}
//           </div>
//         </CardHeader>

//         <CardContent className="pt-8 pb-8">
//           {!todayRow ? (
//             <div className="text-center text-muted-foreground">
//               আজকের জন্য টাইমটেবিল ডেটা নেই।
//             </div>
//           ) : (
//             <>
//               <div
//                 className={[
//                   "mb-6 rounded-lg px-4 py-2 text-sm font-semibold text-center",
//                   isFirstRoza
//                     ? "bg-primary text-primary-foreground"
//                     : isSecondRoza
//                       ? "bg-secondary text-secondary-foreground"
//                       : "bg-muted text-foreground",
//                 ].join(" ")}
//               >
//                 রমজান {todayRow.ramadanDay} — {districtName}, {divisionName}
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
//                 <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-b from-primary/5 to-primary/10 border border-primary/10">
//                   <div className="p-3 bg-primary/20 rounded-full mb-4">
//                     <Moon className="h-8 w-8 text-primary" />
//                   </div>
//                   <h4 className="text-muted-foreground font-medium mb-1">
//                     সেহরি শেষ
//                   </h4>
//                   <p className="text-4xl md:text-5xl font-bold text-primary font-heading">
//                     {fmt12h(todayRow.sehriEnd)}
//                   </p>
//                 </div>

//                 <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-b from-secondary/5 to-secondary/10 border border-secondary/20">
//                   <div className="p-3 bg-secondary/20 rounded-full mb-4">
//                     <Sun className="h-8 w-8 text-secondary-foreground" />
//                   </div>
//                   <h4 className="text-muted-foreground font-medium mb-1">
//                     ইফতার
//                   </h4>
//                   <p className="text-4xl md:text-5xl font-bold text-secondary-foreground font-heading">
//                     {fmt12h(todayRow.iftar)}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex justify-center mt-8">
//                 <Button
//                   variant="outline"
//                   className="gap-2"
//                   onClick={handleShare}
//                 >
//                   <Share2 className="h-4 w-4" /> আজকের সময় শেয়ার করুন
//                 </Button>
//               </div>
//             </>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

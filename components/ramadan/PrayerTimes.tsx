"use client";

import { useEffect, useMemo, useState } from "react";
import data from "@/data/ramadan-2026-bd.json";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Sun, Moon, Share2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

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

  // ✅ initial default set (only once)
  useEffect(() => {
    if (!divisionName && divisions.length) setDivisionName(divisions[0].name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const districts = useMemo(() => {
    return divisions.find((d) => d.name === divisionName)?.districts ?? [];
  }, [divisionName, divisions]);

  // ✅ division change → first district auto select
  useEffect(() => {
    if (districts.length) setDistrictName(districts[0].name);
  }, [districts, setDistrictName]);

  const selectedDistrict = useMemo(() => {
    return districts.find((z) => z.name === districtName) ?? districts[0];
  }, [districtName, districts]);

  // ✅ calendar times parent এ পাঠানো
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
      `জেলা: ${districtName}, বিভাগ: ${divisionName}\n` +
      `তারিখ: ${todayRow.date} (রমজান ${todayRow.ramadanDay})\n` +
      `সেহরি শেষ: ${fmt12h(todayRow.sehriEnd)}\n` +
      `ইফতার: ${fmt12h(todayRow.iftar)}`;

    try {
      await navigator.clipboard.writeText(text);
      toast.success("আজকের সময় কপি হয়েছে।");
    } catch {
      toast.success("শেয়ার টেক্সট প্রস্তুত আছে।");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 -mt-20 relative z-20">
      <Card className="shadow-2xl border-none bg-card/95 backdrop-blur-sm">
        <CardHeader className="flex flex-col md:flex-row items-center justify-between gap-4 pb-2 border-b">
          <div className="flex items-center gap-2 flex-wrap">
            <MapPin className="h-5 w-5 text-primary" />
            <h3 className="font-heading text-lg font-semibold text-foreground">
              লোকেশন:
            </h3>

            <Select value={divisionName} onValueChange={setDivisionName}>
              <SelectTrigger className="w-[160px] bg-background border-primary/20">
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
              <SelectTrigger className="w-[180px] bg-background border-primary/20">
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

          <div className="text-sm text-muted-foreground font-mono">
            {now.toLocaleDateString("bn-BD", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </CardHeader>

        <CardContent className="pt-8 pb-8">
          {!todayRow ? (
            <div className="text-center text-muted-foreground">
              আজকের জন্য টাইমটেবিল ডেটা নেই।
            </div>
          ) : (
            <>
              <div
                className={[
                  "mb-6 rounded-lg px-4 py-2 text-sm font-semibold text-center",
                  isFirstRoza
                    ? "bg-primary text-primary-foreground"
                    : isSecondRoza
                      ? "bg-secondary text-secondary-foreground"
                      : "bg-muted text-foreground",
                ].join(" ")}
              >
                রমজান {todayRow.ramadanDay} — {districtName}, {divisionName}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-b from-primary/5 to-primary/10 border border-primary/10">
                  <div className="p-3 bg-primary/20 rounded-full mb-4">
                    <Moon className="h-8 w-8 text-primary" />
                  </div>
                  <h4 className="text-muted-foreground font-medium mb-1">
                    সেহরি শেষ
                  </h4>
                  <p className="text-4xl md:text-5xl font-bold text-primary font-heading">
                    {fmt12h(todayRow.sehriEnd)}
                  </p>
                </div>

                <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-b from-secondary/5 to-secondary/10 border border-secondary/20">
                  <div className="p-3 bg-secondary/20 rounded-full mb-4">
                    <Sun className="h-8 w-8 text-secondary-foreground" />
                  </div>
                  <h4 className="text-muted-foreground font-medium mb-1">
                    ইফতার
                  </h4>
                  <p className="text-4xl md:text-5xl font-bold text-secondary-foreground font-heading">
                    {fmt12h(todayRow.iftar)}
                  </p>
                </div>
              </div>

              <div className="flex justify-center mt-8">
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={handleShare}
                >
                  <Share2 className="h-4 w-4" /> আজকের সময় শেয়ার করুন
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
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
//   date: string; // YYYY-MM-DD
//   ramadanDay: number; // 1..30
//   sehriEnd: string; // HH:mm
//   iftar: string; // HH:mm
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

// export function PrayerTimes() {
//   const divisions = data.divisions as Division[];

//   const [divisionName, setDivisionName] = useState(divisions[0]?.name ?? "");
//   const districts = useMemo(() => {
//     return divisions.find((d) => d.name === divisionName)?.districts ?? [];
//   }, [divisionName, divisions]);

//   const [districtName, setDistrictName] = useState(districts[0]?.name ?? "");
//   const [now, setNow] = useState(new Date());

//   // keep time ticking; also triggers date change update automatically
//   useEffect(() => {
//     const t = setInterval(() => setNow(new Date()), 1000);
//     return () => clearInterval(t);
//   }, []);

//   // when division changes, reset district to first
//   useEffect(() => {
//     if (districts.length) setDistrictName(districts[0].name);
//   }, [divisionName, districts]);

//   const selectedDistrict = useMemo(() => {
//     return districts.find((z) => z.name === districtName) ?? districts[0];
//   }, [districtName, districts]);

//   const iso = todayISO(now);

//   const todayRow = useMemo(() => {
//     return selectedDistrict?.times?.find((t) => t.date === iso) ?? null;
//   }, [selectedDistrict, iso]);

//   // Highlight rules
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
//       toast.success("শেয়ার টেক্সট প্রস্তুত আছে (কপি করতে পারলে ভালো)।");
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

//             {/* Division */}
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

//             {/* District */}
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
//               আজকের জন্য টাইমটেবিল ডেটা নেই (আপনার JSON ডেটা চেক করুন)।
//             </div>
//           ) : (
//             <>
//               {/* Highlight strip */}
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
//                 {/* Sehri */}
//                 <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-b from-primary/5 to-primary/10 border border-primary/10 hover:shadow-lg transition-all duration-300 group">
//                   <div className="p-3 bg-primary/20 rounded-full mb-4 group-hover:scale-110 transition-transform">
//                     <Moon className="h-8 w-8 text-primary" />
//                   </div>
//                   <h4 className="text-muted-foreground font-medium mb-1">
//                     সেহরি শেষ
//                   </h4>
//                   <p className="text-4xl md:text-5xl font-bold text-primary tracking-tight font-heading">
//                     {fmt12h(todayRow.sehriEnd)}
//                   </p>
//                   <p className="text-xs text-muted-foreground mt-2">
//                     (ইসলামিক ফাউন্ডেশন সময়সূচি অনুযায়ী)
//                   </p>
//                 </div>

//                 {/* Iftar */}
//                 <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-b from-secondary/5 to-secondary/10 border border-secondary/20 hover:shadow-lg transition-all duration-300 group">
//                   <div className="p-3 bg-secondary/20 rounded-full mb-4 group-hover:scale-110 transition-transform">
//                     <Sun className="h-8 w-8 text-secondary-foreground" />
//                   </div>
//                   <h4 className="text-muted-foreground font-medium mb-1">
//                     ইফতার
//                   </h4>
//                   <p className="text-4xl md:text-5xl font-bold text-secondary-foreground tracking-tight font-heading">
//                     {fmt12h(todayRow.iftar)}
//                   </p>
//                   <p className="text-xs text-muted-foreground mt-2">
//                     সূর্যাস্ত
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

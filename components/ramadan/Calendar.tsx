"use client";

import { useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { CalendarDays, Moon, Sun, MapPin, Star } from "lucide-react";

type DayTimes = {
  date: string; // YYYY-MM-DD
  ramadanDay: number; // 1..30
  sehriEnd: string; // HH:mm
  iftar: string; // HH:mm
};

function todayISO(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function fmtDateBN(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("bn-BD", { day: "numeric", month: "long" });
}

function weekdayBN(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("bn-BD", { weekday: "long" });
}

function fmt12h(hhmm: string) {
  const [hh, mm] = hhmm.split(":").map(Number);
  const ampm = hh >= 12 ? "PM" : "AM";
  const h12 = hh % 12 === 0 ? 12 : hh % 12;
  return `${h12}:${String(mm).padStart(2, "0")} ${ampm}`;
}

const MotionTableRow = motion(TableRow);

export function RamadanCalendar({
  times,
  districtName,
  divisionName,
}: {
  times: DayTimes[];
  districtName: string;
  divisionName: string;
}) {
  const rows = useMemo(() => {
    return [...(times ?? [])].sort((a, b) => a.ramadanDay - b.ramadanDay);
  }, [times]);

  const today = todayISO();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full"
    >
      <Card className="border-0 shadow-2xl bg-white dark:bg-gray-800 overflow-hidden">
        {/* Header Gradient Bar */}
        <div className="relative h-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-amber-500" />

        <CardHeader className="pb-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg">
              <CalendarDays className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              রমজান ক্যালেন্ডার ২০২৬
            </CardTitle>
          </div>

          <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
            <MapPin className="h-4 w-4 text-emerald-500" />
            <p className="text-sm font-medium">
              {districtName || "জেলা নির্বাচন করুন"},{" "}
              {divisionName || "বিভাগ নির্বাচন করুন"}
            </p>
            <Badge
              variant="outline"
              className="ml-2 border-emerald-500 text-emerald-600 dark:text-emerald-400"
            >
              ইসলামিক ফাউন্ডেশন
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {!rows.length ? (
            <div className="text-center py-16">
              <div className="inline-flex p-4 rounded-2xl bg-gray-100 dark:bg-gray-700 mb-4">
                <CalendarDays className="h-12 w-12 text-gray-400" />
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                এই জেলার জন্য ডেটা পাওয়া যায়নি।
              </p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                উপরের ফর্ম থেকে সঠিক জেলা নির্বাচন করুন
              </p>
            </div>
          ) : (
            <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <Table>
                <TableHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/50 dark:to-teal-950/50">
                  <TableRow>
                    <TableHead className="text-center font-bold text-emerald-700 dark:text-emerald-400 w-[90px]">
                      রমজান
                    </TableHead>
                    <TableHead className="text-center font-bold text-gray-700 dark:text-gray-300">
                      তারিখ
                    </TableHead>
                    <TableHead className="text-center font-bold text-emerald-600 dark:text-emerald-400">
                      <span className="inline-flex items-center justify-center gap-1">
                        <Moon className="h-4 w-4" />
                        সেহরি শেষ
                      </span>
                    </TableHead>
                    <TableHead className="text-center font-bold text-amber-600 dark:text-amber-400">
                      <span className="inline-flex items-center justify-center gap-1">
                        <Sun className="h-4 w-4" />
                        ইফতার
                      </span>
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {rows.map((day, index) => {
                    const isToday = day.date === today;

                    // ✅ Fix: isToday bg should win over zebra bg
                    const rowBg = isToday
                      ? "bg-emerald-50 dark:bg-emerald-950/30"
                      : index % 2 === 0
                        ? "bg-gray-50/50 dark:bg-gray-800/50"
                        : "";

                    return (
                      <MotionTableRow
                        key={`${day.ramadanDay}-${day.date}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.02 }}
                        className={[
                          "group transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50",
                          rowBg,
                        ].join(" ")}
                      >
                        {/* ✅ Highlight moved INSIDE TableCell (valid HTML) */}
                        <TableCell className="text-center relative">
                          {isToday && (
                            <span className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-emerald-500 to-teal-500" />
                          )}

                          <div className="relative inline-flex">
                            <Badge
                              className={[
                                "w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg",
                                isToday
                                  ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg"
                                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-2 border-transparent group-hover:border-emerald-200 dark:group-hover:border-emerald-800",
                              ].join(" ")}
                            >
                              {day.ramadanDay}
                            </Badge>
                          </div>
                        </TableCell>

                        <TableCell className="text-center">
                          <div className="flex flex-col items-center">
                            <span className="font-medium text-gray-900 dark:text-white">
                              {fmtDateBN(day.date)}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {weekdayBN(day.date)}
                            </span>
                          </div>
                        </TableCell>

                        <TableCell className="text-center">
                          <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                            {fmt12h(day.sehriEnd)}
                          </span>
                        </TableCell>

                        <TableCell className="text-center">
                          <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
                            {fmt12h(day.iftar)}
                          </span>
                        </TableCell>
                      </MotionTableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}

          {rows.length > 0 && (
            <div className="mt-6 flex items-center justify-center gap-4 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-emerald-500 rounded-full" />
                <span>আজকের দিন</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-amber-500" />
                <span>৩০ দিনের সম্পূর্ণ সময়সূচি</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

// "use client";

// import { useMemo } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";

// type DayTimes = {
//   date: string; // YYYY-MM-DD
//   ramadanDay: number; // 1..30
//   sehriEnd: string; // HH:mm
//   iftar: string; // HH:mm
// };

// function todayISO(d = new Date()) {
//   const y = d.getFullYear();
//   const m = String(d.getMonth() + 1).padStart(2, "0");
//   const day = String(d.getDate()).padStart(2, "0");
//   return `${y}-${m}-${day}`;
// }

// function fmtDateBN(iso: string) {
//   const d = new Date(iso);
//   return d.toLocaleDateString("bn-BD", { day: "numeric", month: "long" });
// }

// function weekdayBN(iso: string) {
//   const d = new Date(iso);
//   return d.toLocaleDateString("bn-BD", { weekday: "long" });
// }

// function fmt12h(hhmm: string) {
//   const [hh, mm] = hhmm.split(":").map(Number);
//   const ampm = hh >= 12 ? "PM" : "AM";
//   const h12 = hh % 12 === 0 ? 12 : hh % 12;
//   return `${h12}:${String(mm).padStart(2, "0")} ${ampm}`;
// }

// export function RamadanCalendar({
//   times,
//   districtName,
//   divisionName,
// }: {
//   times: DayTimes[];
//   districtName: string;
//   divisionName: string;
// }) {
//   const rows = useMemo(() => {
//     return [...(times ?? [])].sort((a, b) => a.ramadanDay - b.ramadanDay);
//   }, [times]);

//   const today = todayISO();

//   return (
//     <Card className="w-full">
//       <CardHeader>
//         <CardTitle className="text-center font-heading text-2xl text-primary">
//           Ramadan Calendar 2026
//         </CardTitle>
//         <p className="text-center text-muted-foreground text-sm">
//           {districtName}, {divisionName} — ইসলামিক ফাউন্ডেশন সময়সূচি
//         </p>
//       </CardHeader>

//       <CardContent>
//         {!rows.length ? (
//           <div className="text-center text-muted-foreground">
//             এই জেলার জন্য ডেটা পাওয়া যায়নি।
//           </div>
//         ) : (
//           <div className="rounded-md border">
//             <Table>
//               <TableHeader className="bg-muted/50">
//                 <TableRow>
//                   <TableHead className="text-center w-[90px]">রমজান</TableHead>
//                   <TableHead className="text-center">তারিখ</TableHead>
//                   <TableHead className="text-center font-bold text-primary">
//                     সেহরি শেষ
//                   </TableHead>
//                   <TableHead className="text-center font-bold text-secondary-foreground">
//                     ইফতার
//                   </TableHead>
//                 </TableRow>
//               </TableHeader>

//               <TableBody>
//                 {rows.map((day) => {
//                   const isToday = day.date === today;

//                   return (
//                     <TableRow
//                       key={`${day.ramadanDay}-${day.date}`}
//                       className={[
//                         "hover:bg-muted/50 odd:bg-muted/10",
//                         isToday ? "bg-primary/10 ring-1 ring-primary/30" : "",
//                       ].join(" ")}
//                     >
//                       <TableCell className="text-center font-medium">
//                         <Badge
//                           variant="outline"
//                           className={[
//                             "w-9 h-9 rounded-full p-0 flex items-center justify-center border-primary/20",
//                             isToday ? "bg-primary text-primary-foreground" : "",
//                           ].join(" ")}
//                         >
//                           {day.ramadanDay}
//                         </Badge>
//                       </TableCell>

//                       <TableCell className="text-center text-sm">
//                         <div className="font-medium flex items-center justify-center gap-2">
//                           {fmtDateBN(day.date)}
//                           {isToday && (
//                             <Badge className="bg-primary text-primary-foreground">
//                               আজ
//                             </Badge>
//                           )}
//                         </div>
//                         <div className="text-xs text-muted-foreground">
//                           {weekdayBN(day.date)}
//                         </div>
//                       </TableCell>

//                       <TableCell className="text-center font-mono font-medium">
//                         {fmt12h(day.sehriEnd)}
//                       </TableCell>

//                       <TableCell className="text-center font-mono font-medium">
//                         {fmt12h(day.iftar)}
//                       </TableCell>
//                     </TableRow>
//                   );
//                 })}
//               </TableBody>
//             </Table>
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// }

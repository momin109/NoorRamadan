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
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center font-heading text-2xl text-primary">
          Ramadan Calendar 2026
        </CardTitle>
        <p className="text-center text-muted-foreground text-sm">
          {districtName}, {divisionName} — ইসলামিক ফাউন্ডেশন সময়সূচি
        </p>
      </CardHeader>

      <CardContent>
        {!rows.length ? (
          <div className="text-center text-muted-foreground">
            এই জেলার জন্য ডেটা পাওয়া যায়নি।
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="text-center w-[90px]">রমজান</TableHead>
                  <TableHead className="text-center">তারিখ</TableHead>
                  <TableHead className="text-center font-bold text-primary">
                    সেহরি শেষ
                  </TableHead>
                  <TableHead className="text-center font-bold text-secondary-foreground">
                    ইফতার
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {rows.map((day) => {
                  const isToday = day.date === today;

                  return (
                    <TableRow
                      key={`${day.ramadanDay}-${day.date}`}
                      className={[
                        "hover:bg-muted/50 odd:bg-muted/10",
                        isToday ? "bg-primary/10 ring-1 ring-primary/30" : "",
                      ].join(" ")}
                    >
                      <TableCell className="text-center font-medium">
                        <Badge
                          variant="outline"
                          className={[
                            "w-9 h-9 rounded-full p-0 flex items-center justify-center border-primary/20",
                            isToday ? "bg-primary text-primary-foreground" : "",
                          ].join(" ")}
                        >
                          {day.ramadanDay}
                        </Badge>
                      </TableCell>

                      <TableCell className="text-center text-sm">
                        <div className="font-medium flex items-center justify-center gap-2">
                          {fmtDateBN(day.date)}
                          {isToday && (
                            <Badge className="bg-primary text-primary-foreground">
                              আজ
                            </Badge>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {weekdayBN(day.date)}
                        </div>
                      </TableCell>

                      <TableCell className="text-center font-mono font-medium">
                        {fmt12h(day.sehriEnd)}
                      </TableCell>

                      <TableCell className="text-center font-mono font-medium">
                        {fmt12h(day.iftar)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

"use client";

import { useState } from "react";

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
} from "lucide-react";

import { PrayerTimes } from "@/components/ramadan/PrayerTimes";
import { RamadanCalendar } from "@/components/ramadan/Calendar";

type DayTimes = {
  date: string;
  ramadanDay: number;
  sehriEnd: string;
  iftar: string;
};

export default function Page() {
  const [divisionName, setDivisionName] = useState("");
  const [districtName, setDistrictName] = useState("");
  const [selectedTimes, setSelectedTimes] = useState<DayTimes[]>([]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-background to-primary/5">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 -right-4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-primary/5 to-amber-500/5 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      <Navbar />

      <main className="flex-1 relative">
        {/* Hero Section with Prayer Times */}
        <section className="relative pt-8 pb-20 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-20 right-10 opacity-20">
            <Moon className="w-32 h-32 text-primary/20" />
          </div>
          <div className="absolute top-40 left-10 opacity-10">
            <Star className="w-24 h-24 text-amber-500/20" />
          </div>

          <div className="container relative">
            {/* Hero Text */}
            <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
                <Sparkles className="h-4 w-4" />
                <span>Ramadan 2026 / 1447 AH</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-heading font-bold bg-gradient-to-r from-primary via-primary/80 to-amber-600 bg-clip-text text-transparent">
                Blessed Month of
                <span className="block mt-2">Ramadan</span>
              </h1>

              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Your complete spiritual companion for the holy month - prayer
                times, duas, and daily reflections.
              </p>

              {/* Quick Stats */}
              <div className="flex flex-wrap justify-center gap-8 mt-8">
                {[
                  { icon: Clock, label: "Prayer Times", value: "Accurate" },
                  { icon: Calendar, label: "30 Days", value: "Complete" },
                  { icon: BookOpen, label: "Duas", value: "Essential" },
                ].map((stat, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <stat.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm text-muted-foreground">
                        {stat.label}
                      </p>
                      <p className="font-semibold">{stat.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Prayer Times Card */}
            <div className="relative max-w-4xl mx-auto">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-amber-500 rounded-2xl blur opacity-20" />

              <div className="relative mt-28">
                <PrayerTimes
                  divisionName={divisionName}
                  setDivisionName={setDivisionName}
                  districtName={districtName}
                  setDistrictName={setDistrictName}
                  setSelectedTimes={setSelectedTimes}
                />
              </div>

              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-primary/10 rounded-full blur-xl" />
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-amber-500/10 rounded-full blur-xl" />
            </div>
          </div>
        </section>

        {/* Calendar Section */}
        <section className="py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

          <div className="container relative">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 rounded-full text-amber-600 text-sm font-medium mb-4">
                <Calendar className="h-4 w-4" />
                <span>Your Spiritual Journey</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                Ramadan Calendar
                <span className="text-primary block mt-2">2026</span>
              </h2>

              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Plan your days of worship with our beautifully designed
                calendar, featuring accurate prayer timings and daily spiritual
                guidance.
              </p>
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary via-amber-500 to-primary rounded-3xl opacity-30 group-hover:opacity-50 blur transition duration-1000 group-hover:duration-200 animate-gradient-x" />

                <div className="relative bg-gradient-to-br from-card to-card/95 backdrop-blur-sm rounded-2xl shadow-2xl p-1">
                  <div className="bg-card rounded-xl overflow-hidden">
                    {selectedTimes.length ? (
                      <RamadanCalendar
                        times={selectedTimes}
                        districtName={districtName}
                        divisionName={divisionName}
                      />
                    ) : (
                      <div className="p-8 text-center text-muted-foreground">
                        প্রথমে বিভাগ ও জেলা নির্বাচন করুন।
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Features Grid (unchanged) */}
              <div className="grid md:grid-cols-3 gap-6 mt-16">
                {[
                  {
                    icon: Star,
                    title: "Daily Duas",
                    description: "Essential duas for each day of Ramadan",
                    color: "text-primary",
                  },
                  {
                    icon: Heart,
                    title: "Virtues & Benefits",
                    description: "Learn about the rewards of each day",
                    color: "text-amber-500",
                  },
                  {
                    icon: Sparkles,
                    title: "Special Nights",
                    description: "Highlights of Laylatul Qadr and more",
                    color: "text-primary",
                  },
                ].map((feature, i) => (
                  <div
                    key={i}
                    className="group relative p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 hover:border-primary/50 transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-amber-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/10 to-amber-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <feature.icon className={`h-6 w-6 ${feature.color}`} />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center mt-12">
                <Link href="/dua">
                  <Button
                    size="lg"
                    className="group relative px-8 py-6 text-lg bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    <span className="absolute inset-0 bg-white/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="relative flex items-center gap-3">
                      <BookOpen className="h-5 w-5" />
                      Explore Duas & Hadith
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="relative h-32 overflow-hidden">
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-40 h-40 bg-gradient-to-t from-primary/10 to-transparent rounded-full blur-3xl" />
        </div>
      </main>

      <Footer />
    </div>
  );
}

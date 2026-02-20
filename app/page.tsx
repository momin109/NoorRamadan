"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Star } from "lucide-react";
import { PrayerTimes } from "@/components/ramadan/PrayerTimes";
import { RamadanCalendar } from "@/components/ramadan/Calendar";
import { useState } from "react";

type DayTimes = {
  date: string;
  ramadanDay: number;
  sehriEnd: string;
  iftar: string;
};

export default function Home() {
  const [divisionName, setDivisionName] = useState("");
  const [districtName, setDistrictName] = useState("");
  const [selectedTimes, setSelectedTimes] = useState<DayTimes[]>([]);

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <Navbar />

      <main className="flex-1">
        <Hero />

        {/* Prayer Times Section */}
        <section className="container relative z-20 mb-20">
          <PrayerTimes
            divisionName={divisionName}
            setDivisionName={setDivisionName}
            districtName={districtName}
            setDistrictName={setDistrictName}
            setSelectedTimes={setSelectedTimes}
          />
        </section>

        {/* Calendar Preview Section */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              {selectedTimes.length ? (
                <RamadanCalendar
                  times={selectedTimes}
                  districtName={districtName}
                  divisionName={divisionName}
                />
              ) : null}
              <div className="mt-8 text-center">
                <Link href="/dua">
                  <Button variant="outline" size="lg" className="gap-2">
                    Duas & Hadith দেখুন <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Services Promo Section */}
        <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
          {/* Pattern overlay */}
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]"></div>

          <div className="container relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block px-4 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-bold mb-6">
                  রমজান স্পেশাল অফার (Ramadan Special Offer)
                </div>

                <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 leading-tight">
                  আপনার Business Grow করুন
                  <br />
                  এই Ramadan-এ <span className="text-secondary">৫০% OFF</span>
                </h2>

                <p className="text-primary-foreground/80 text-lg mb-8 leading-relaxed">
                  আপনার ব্যবসার জন্য একটি professional, mobile-responsive
                  website পান half price-এ। Limited time offer—শুধু প্রথম ২০ জন
                  client এর জন্য।
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    "Premium Design Quality (প্রিমিয়াম ডিজাইন)",
                    "Mobile Responsive Layouts (সব ডিভাইসে ঠিকমতো)",
                    "SEO Optimized Structure (সার্চে rank করার জন্য)",
                    "Free Hosting Setup (হোস্টিং সেটআপ ফ্রি)",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="bg-secondary/20 p-1 rounded-full">
                        <CheckCircle2 className="h-5 w-5 text-secondary" />
                      </div>
                      <span className="font-medium">{item}</span>
                    </div>
                  ))}
                </div>

                <Link href="/services">
                  <Button
                    size="lg"
                    className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold h-14 px-8 text-lg"
                  >
                    Discount Claim করুন
                  </Button>
                </Link>
              </div>

              <div className="relative">
                <div className="absolute -inset-4 bg-secondary/20 rounded-2xl blur-xl"></div>

                <Card className="relative bg-background text-foreground border-none shadow-2xl">
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between mb-8 border-b pb-4">
                      <div>
                        <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">
                          Business Package
                        </p>
                        <h3 className="text-2xl font-bold">
                          Standard Website (স্ট্যান্ডার্ড)
                        </h3>
                      </div>

                      <div className="text-right">
                        <p className="text-sm text-muted-foreground line-through decoration-destructive">
                          ৳39,999
                        </p>
                        <p className="text-3xl font-bold text-primary">
                          ৳19,999
                        </p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <p className="text-muted-foreground">
                        Small business দের জন্য perfect—একটা professional online
                        presence তৈরি করতে।
                      </p>

                      <div className="bg-muted/50 p-4 rounded-lg">
                        <div className="flex gap-1 text-secondary mb-2">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} className="h-4 w-4 fill-current" />
                          ))}
                        </div>

                        <p className="italic text-sm">
                          "Team মাত্র ৫ দিনে অসাধারণ website deliver করেছে।
                          Highly recommended!"
                        </p>
                        <p className="text-xs font-bold mt-2">
                          - Rahim U., Business Owner
                        </p>
                      </div>

                      <Button className="w-full" size="lg">
                        এখনই শুরু করুন (Get Started)
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

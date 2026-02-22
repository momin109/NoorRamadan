"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { offers } from "@/data/offers";
import Offer from "@/components/offerSection/Offer";
import WebsiteTypes from "@/components/service/WebsiteTypes";

export default function Services() {
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <Navbar />

      <main className=" ">
        <section>
          <WebsiteTypes />
        </section>
        <section>
          <Offer offers={offers} />
        </section>
      </main>

      <Footer />
    </div>
  );
}

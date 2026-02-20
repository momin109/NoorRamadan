import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-background">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/ramadan-hero-bg.png"
          alt="রমজান ব্যাকগ্রাউন্ড"
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/40 md:to-transparent mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      <div className="container relative z-10 pt-24 pb-32 md:pt-32 md:pb-40">
        <div className="max-w-2xl text-white">
          <div className="inline-flex items-center rounded-full border border-secondary/50 bg-secondary/10 px-3 py-1 text-sm font-medium text-secondary backdrop-blur-md mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="flex h-2 w-2 rounded-full bg-secondary mr-2 animate-pulse"></span>
            রমজান মোবারক ২০২৬
          </div>

          <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-6xl mb-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
            প্রতিটি মুহূর্তে ঈমান,
            <br />
            <span className="text-secondary">প্রতিটি পদক্ষেপে সফলতা।</span>
          </h1>

          <p className="text-lg text-white/80 mb-8 max-w-lg animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            আপনার শহরের সঠিক সেহরি ও ইফতারের সময়সূচি দেখুন। পাশাপাশি এই পবিত্র
            রমজানে আপনার ব্যবসাকে এগিয়ে নিতে আমাদের প্রিমিয়াম ওয়েবসাইট সেবায়
            পাচ্ছেন বিশেষ ৫০% ছাড়।
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
            <Link href="/sehri">
              <Button
                size="lg"
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold"
              >
                <Clock className="mr-2 h-5 w-5" />
                সেহরির সময় দেখুন
              </Button>
            </Link>

            <Link href="/services">
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 bg-white/10 text-white hover:bg-white hover:text-primary backdrop-blur-sm"
              >
                ৫০% ওয়েব অফার নিন
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

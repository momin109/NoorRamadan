import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Check, Zap, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function Services() {
  const plans = [
    {
      name: "বিজনেস স্টার্টার",
      price: "৳19,999",
      originalPrice: "৳39,999",
      description: "ব্যক্তিগত পোর্টফোলিও ও ছোট ব্যবসার জন্য আদর্শ।",
      features: [
        "৫ পেজ রেসপন্সিভ ওয়েবসাইট",
        "কন্টাক্ট ফর্ম ইন্টিগ্রেশন",
        "সোশ্যাল মিডিয়া লিংক",
        "গুগল ম্যাপস ইন্টিগ্রেশন",
        "বেসিক SEO সেটআপ",
        "১ মাস সাপোর্ট",
      ],
      featured: false,
    },
    {
      name: "ই-কমার্স প্রো",
      price: "৳39,999",
      originalPrice: "৳79,999",
      description: "অনলাইনে পণ্য বিক্রির জন্য পূর্ণাঙ্গ সমাধান।",
      features: [
        "স্টার্টারের সবকিছু",
        "প্রোডাক্ট ম্যানেজমেন্ট সিস্টেম",
        "পেমেন্ট গেটওয়ে সেটআপ",
        "শপিং কার্ট ও চেকআউট",
        "অর্ডার ম্যানেজমেন্ট ড্যাশবোর্ড",
        "৩ মাস সাপোর্ট",
      ],
      featured: true,
    },
    {
      name: "কাস্টম এন্টারপ্রাইজ",
      price: "কাস্টম",
      originalPrice: null,
      description: "জটিল প্রয়োজন অনুযায়ী কাস্টমাইজড সলিউশন।",
      features: [
        "কাস্টম ওয়েব অ্যাপ্লিকেশন",
        "ডাটাবেস ইন্টিগ্রেশন",
        "ইউজার অথেনটিকেশন",
        "API ডেভেলপমেন্ট",
        "অ্যাডভান্সড অ্যানালিটিক্স",
        "প্রায়োরিটি ২৪/৭ সাপোর্ট",
      ],
      featured: false,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <Navbar />

      <main className="flex-1 py-16">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-3 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-semibold mb-4">
              রমজান স্পেশাল অফার
            </span>

            <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6">
              প্রফেশনাল ওয়েব সার্ভিস{" "}
              <span className="text-secondary">৫০% ছাড়ে</span>
            </h1>

            <p className="text-lg text-muted-foreground">
              এই রমজানে আপনার ব্যবসায় বিনিয়োগ করুন। আমরা দ্রুত, নিরাপদ এবং
              উচ্চমানের ওয়েবসাইট তৈরি করি যা ভিজিটরকে কাস্টমারে রূপান্তর করতে
              সাহায্য করে।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`flex flex-col relative ${
                  plan.featured
                    ? "border-primary shadow-2xl scale-105 z-10"
                    : "hover:shadow-lg transition-shadow"
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                    সর্বাধিক জনপ্রিয়
                  </div>
                )}

                <CardHeader>
                  <CardTitle className="text-2xl font-bold">
                    {plan.name}
                  </CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>

                <CardContent className="flex-1">
                  <div className="mb-6">
                    {plan.originalPrice && (
                      <span className="text-muted-foreground line-through text-lg mr-2">
                        {plan.originalPrice}
                      </span>
                    )}
                    <span className="text-4xl font-bold text-primary">
                      {plan.price}
                    </span>
                  </div>

                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <Check className="h-5 w-5 text-secondary shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter>
                  <Link href="/contact" className="w-full">
                    <Button
                      className={`w-full ${
                        plan.featured ? "bg-primary hover:bg-primary/90" : ""
                      }`}
                      variant={plan.featured ? "default" : "outline"}
                    >
                      শুরু করুন
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Trust Section */}
          <div className="mt-24 text-center">
            <h3 className="text-2xl font-heading font-bold text-foreground mb-12">
              কেন আমাদের বেছে নেবেন?
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="p-6 bg-muted/30 rounded-lg">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-bold mb-2">দ্রুত ডেলিভারি</h4>
                <p className="text-sm text-muted-foreground">
                  ৩–৭ দিনের মধ্যে আপনার ওয়েবসাইট লাইভ করে দেওয়া হবে।
                </p>
              </div>

              <div className="p-6 bg-muted/30 rounded-lg">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-bold mb-2">প্রিমিয়াম কোয়ালিটি</h4>
                <p className="text-sm text-muted-foreground">
                  আধুনিক ডিজাইন—সব ডিভাইসে দারুণ দেখাবে।
                </p>
              </div>

              <div className="p-6 bg-muted/30 rounded-lg">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-bold mb-2">২৪/৭ সাপোর্ট</h4>
                <p className="text-sm text-muted-foreground">
                  যেকোনো সমস্যায় আমরা সবসময় পাশে আছি।
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

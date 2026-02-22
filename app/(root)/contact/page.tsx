"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Phone,
  Mail,
  MessageSquare,
  Send,
  Clock,
  CheckCircle,
  Sparkles,
  MapPin,
} from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "নাম কমপক্ষে ২ অক্ষর হতে হবে।",
  }),
  email: z.string().email({
    message: "সঠিক ইমেইল ঠিকানা দিন।",
  }),
  phone: z.string().optional(),
  websiteType: z.string().optional(),
  message: z.string().min(10, {
    message: "মেসেজ কমপক্ষে ১০ অক্ষর হতে হবে।",
  }),
});

const websiteTypes = [
  "Business Website",
  "E-commerce Store",
  "Portfolio",
  "Blog/News Portal",
  "Hotel Website",
  "Hotel Management System",
  "Restaurant Website",
  "School/Coaching",
  "Real Estate",
  "Doctor/Clinic",
  "Landing Page",
  "Other",
];

export default function Contact() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      websiteType: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast.success(
      "আপনার রিকোয়েস্ট পাঠানো হয়েছে! ২৪ ঘন্টার মধ্যে আমরা যোগাযোগ করব।",
      {
        duration: 5000,
      },
    );
    form.reset();
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 pointer-events-none"></div>

      {/* Animated Blobs */}
      <div className="fixed top-20 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob pointer-events-none"></div>
      <div className="fixed top-40 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000 pointer-events-none"></div>
      <div className="fixed -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000 pointer-events-none"></div>

      <Navbar />

      <main className="flex-1 py-16 md:py-24 relative z-10">
        <div className="container max-w-6xl mx-auto px-4">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-4"
            >
              <span className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold shadow-lg shadow-purple-500/30 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                ফ্রি কোন্সালটেশন
              </span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                আপনার প্রজেক্ট নিয়ে
              </span>
              <br />
              <span className="text-gray-900 dark:text-white">আলোচনা করুন</span>
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              রমজান স্পেশাল অফার নিতে এখনই ফ্রি কোট রিকোয়েস্ট করুন। আমরা ২৪
              ঘন্টার মধ্যে যোগাযোগ করব।
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Side - Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-1 space-y-6"
            >
              {/* Quick Response Badge */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-green-500 rounded-full blur-md opacity-60"></div>
                    <div className="relative h-12 w-12 bg-green-500 text-white rounded-full flex items-center justify-center">
                      <Clock className="h-6 w-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      দ্রুত রেসপন্স
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      গড়ে ২ ঘন্টার মধ্যে
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>অফিস আওয়ার: ৯টা - ৮টা (সপ্তাহে ৭ দিন)</span>
                </div>
              </div>

              {/* Contact Cards */}
              <div className="space-y-4">
                {/* Phone Card */}
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-xl flex items-center justify-center shadow-lg">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                        ফোন করুন
                      </h3>
                      <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        +৮৮০ ১৭৯৭৭...
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        সকাল ৯টা - রাত ৮টা
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Email Card */}
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 bg-gradient-to-br from-blue-600 to-cyan-500 text-white rounded-xl flex items-center justify-center shadow-lg">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                        ইমেইল
                      </h3>
                      <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                        momin550550@gmail.com
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        ২৪ ঘন্টার মধ্যে রিপ্লাই
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* WhatsApp Card - Special Highlight */}
                <motion.div whileHover={{ y: -5 }} className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                  <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border-2 border-green-500 dark:border-green-400">
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <div className="absolute inset-0 bg-green-500 rounded-xl blur-md opacity-60"></div>
                        <div className="relative h-12 w-12 bg-gradient-to-br from-green-600 to-green-500 text-white rounded-xl flex items-center justify-center shadow-lg">
                          <MessageSquare className="h-6 w-6" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-gray-900 dark:text-white">
                            WhatsApp
                          </h3>
                          <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs rounded-full font-semibold">
                            Fastest
                          </span>
                        </div>
                        <p className="text-green-600 dark:text-green-400 text-sm mb-2">
                          তাৎক্ষণিক সাড়া পেতে WhatsApp এ মেসেজ দিন
                        </p>
                        <a
                          href="https://wa.me/8801797764148?text=Hello!%20I%20want%20to%20discuss%20my%20website%20project."
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-green-600 dark:text-green-400 font-bold hover:gap-3 transition-all duration-300"
                        >
                          এখনই চ্যাট করুন
                          <Send className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Office Address */}
                <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-purple-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      ঢাকা, বাংলাদেশ
                    </span>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "১০০+ প্রজেক্ট", icon: CheckCircle },
                  { label: "২৪/৭ সাপোর্ট", icon: Clock },
                  { label: "৩০ দিন সাপোর্ট", icon: Sparkles },
                  { label: "ফ্রি কোন্সালটেশন", icon: MessageSquare },
                ].map((badge, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-3 text-center shadow-md"
                  >
                    <badge.icon className="w-5 h-5 text-purple-500 mx-auto mb-1" />
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                      {badge.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Side - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-2"
            >
              <Card className="border-0 shadow-2xl bg-white dark:bg-gray-800 overflow-hidden">
                {/* Card Header with Gradient */}
                <div className="relative h-2 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600"></div>

                <CardHeader className="pb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-8 w-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      ফ্রি কোট ফর্ম
                    </CardTitle>
                  </div>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    নিচের ফর্ম পূরণ করুন। আমরা ২৪ ঘন্টার মধ্যে যোগাযোগ করব।
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name Field */}
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700 dark:text-gray-300">
                                আপনার নাম *
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="মোহাম্মদ আলী"
                                  {...field}
                                  className="border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-purple-500 dark:bg-gray-700"
                                />
                              </FormControl>
                              <FormMessage className="text-red-500" />
                            </FormItem>
                          )}
                        />

                        {/* Email Field */}
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700 dark:text-gray-300">
                                ইমেইল *
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="your@email.com"
                                  {...field}
                                  className="border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-purple-500 dark:bg-gray-700"
                                />
                              </FormControl>
                              <FormMessage className="text-red-500" />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Phone Field */}
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700 dark:text-gray-300">
                                ফোন নাম্বার (ঐচ্ছিক)
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="+৮৮০ ১৭৯৭৭..."
                                  {...field}
                                  className="border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-purple-500 dark:bg-gray-700"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Website Type Field */}
                        <FormField
                          control={form.control}
                          name="websiteType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700 dark:text-gray-300">
                                ওয়েবসাইট টাইপ
                              </FormLabel>
                              <FormControl>
                                <select
                                  {...field}
                                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                                >
                                  <option value="">সিলেক্ট করুন</option>
                                  {websiteTypes.map((type) => (
                                    <option key={type} value={type}>
                                      {type}
                                    </option>
                                  ))}
                                </select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Message Field */}
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 dark:text-gray-300">
                              প্রজেক্টের বিবরণ *
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="আপনার ওয়েবসাইট নিয়ে বিস্তারিত বলুন..."
                                className="min-h-[140px] border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-purple-500 dark:bg-gray-700"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-red-500" />
                          </FormItem>
                        )}
                      />

                      {/* Submit Button */}
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          type="submit"
                          className="w-full py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-lg rounded-xl shadow-lg shadow-purple-500/30 hover:shadow-xl transition-all duration-300"
                        >
                          <Send className="w-5 h-5 mr-2" />
                          ফ্রি কোট রিকোয়েস্ট পাঠান
                        </Button>
                      </motion.div>

                      {/* Form Footer */}
                      <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
                        আপনার তথ্য সম্পূর্ণ নিরাপদ থাকবে। আমরা কখনো স্প্যাম করি
                        না।
                      </p>
                    </form>
                  </Form>
                </CardContent>
              </Card>

              {/* Quick Response Guarantee */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200 dark:border-purple-800 text-center"
              >
                <p className="text-sm text-purple-700 dark:text-purple-300 flex items-center justify-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  ফর্ম সাবমিট করলেই ৫০% রমজান ডিসকাউন্ট কনফার্ম হয়ে যাবে
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
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

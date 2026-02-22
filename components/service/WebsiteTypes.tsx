"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BuildingOfficeIcon,
  SparklesIcon,
  UserCircleIcon,
  PresentationChartLineIcon,
  ShoppingBagIcon,
  NewspaperIcon,
  BuildingLibraryIcon,
  HomeModernIcon,
  CakeIcon,
  AcademicCapIcon,
  HomeIcon,
  HeartIcon,
  CheckBadgeIcon,
  ClockIcon,
  DevicePhoneMobileIcon,
  MagnifyingGlassIcon,
  ChartBarIcon,
  CommandLineIcon,
  RocketLaunchIcon,
  PhoneArrowDownLeftIcon,
  DocumentTextIcon,
  PaintBrushIcon,
  GlobeAltIcon,
  EnvelopeIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/solid";

type BaseReqItem = {
  id: string;
  label: string;
};

type SelectReqItem = BaseReqItem & {
  type: "select";
  options: string[];
};

type RadioReqItem = BaseReqItem & {
  type: "radio";
  options: string[];
};

type NumberReqItem = BaseReqItem & {
  type: "number";
  placeholder?: string;
};

type CheckboxReqItem = BaseReqItem & {
  type: "checkbox";
};

type ReqItem = SelectReqItem | RadioReqItem | NumberReqItem | CheckboxReqItem;

type ReqSection = {
  category: string;
  items: ReqItem[];
};

// Website Types Data
const websiteTypes = [
  {
    id: 1,
    icon: BuildingOfficeIcon,
    title: "Simple Business Website",
    bengaliTitle: "সাধারণ বিজনেস ওয়েবসাইট",
    description: "3-5 pages with professional design",
    features: [
      "About + Services + Contact",
      "Mobile responsive",
      "Contact form integration",
      "Google Maps location",
    ],
    gradient: "from-blue-600 to-cyan-500",
  },
  {
    id: 2,
    icon: RocketLaunchIcon,
    title: "Low Budget Starter",
    bengaliTitle: "স্টার্টার প্যাকেজ",
    description: "Fast delivery, essential features",
    features: [
      "2-3 pages design",
      "Basic SEO setup",
      "Social media links",
      "WhatsApp button",
    ],
    gradient: "from-green-600 to-emerald-500",
  },
  {
    id: 3,
    icon: UserCircleIcon,
    title: "Portfolio / Personal",
    bengaliTitle: "পোর্টফোলিও ওয়েবসাইট",
    description: "Showcase your work & skills",
    features: [
      "Project gallery",
      "Resume/CV download",
      "Testimonials section",
      "Blog/Articles option",
    ],
    gradient: "from-purple-600 to-pink-500",
  },
  {
    id: 4,
    icon: PresentationChartLineIcon,
    title: "Landing Page",
    bengaliTitle: "ল্যান্ডিং পেজ",
    description: "Campaign & product launches",
    features: [
      "High-converting design",
      "Lead capture form",
      "Countdown timer",
      "Analytics tracking",
    ],
    gradient: "from-orange-600 to-red-500",
  },
  {
    id: 5,
    icon: ShoppingBagIcon,
    title: "E-commerce Store",
    bengaliTitle: "ই-কমার্স স্টোর",
    description: "Sell products online",
    features: [
      "Product catalog",
      "Payment gateway",
      "Order management",
      "Inventory tracking",
    ],
    gradient: "from-yellow-600 to-orange-500",
  },
  {
    id: 6,
    icon: NewspaperIcon,
    title: "Blog / News Portal",
    bengaliTitle: "ব্লগ / নিউজ পোর্টাল",
    description: "Content management system",
    features: [
      "Article publishing",
      "Categories & tags",
      "AdSense ready",
      "Newsletter integration",
    ],
    gradient: "from-indigo-600 to-blue-500",
  },
  {
    id: 7,
    icon: BuildingLibraryIcon,
    title: "Hotel Website",
    bengaliTitle: "হোটেল ওয়েবসাইট",
    description: "Booking inquiry + room showcase",
    features: [
      "Room gallery",
      "Seasonal offers",
      "Inquiry form",
      "WhatsApp integration",
    ],
    gradient: "from-teal-600 to-cyan-500",
  },
  {
    id: 8,
    icon: HomeModernIcon,
    title: "Hotel Management System",
    bengaliTitle: "হোটেল ম্যানেজমেন্ট",
    description: "Complete PMS solution",
    features: [
      "Room availability",
      "Booking management",
      "Invoice generation",
      "Staff dashboard",
    ],
    gradient: "from-violet-600 to-purple-500",
  },
  {
    id: 9,
    icon: CakeIcon,
    title: "Restaurant Website",
    bengaliTitle: "রেস্টুরেন্ট ওয়েবসাইট",
    description: "Menu + online ordering",
    features: [
      "Food menu display",
      "Table reservation",
      "Online ordering",
      "Delivery tracking",
    ],
    gradient: "from-rose-600 to-pink-500",
  },
  {
    id: 10,
    icon: AcademicCapIcon,
    title: "School / Coaching",
    bengaliTitle: "স্কুল / কোচিং সেন্টার",
    description: "Educational institution website",
    features: [
      "Course listing",
      "Student portal",
      "Notice board",
      "Result publication",
    ],
    gradient: "from-amber-600 to-yellow-500",
  },
  {
    id: 11,
    icon: HomeIcon,
    title: "Real Estate Listing",
    bengaliTitle: "রিয়েল এস্টেট লিস্টিং",
    description: "Property showcase platform",
    features: [
      "Property catalog",
      "Advanced filters",
      "Inquiry management",
      "Agent dashboard",
    ],
    gradient: "from-lime-600 to-green-500",
  },
  {
    id: 12,
    icon: HeartIcon,
    title: "Doctor / Clinic",
    bengaliTitle: "ডাক্তার / ক্লিনিক",
    description: "Appointment booking system",
    features: [
      "Doctor profiles",
      "Appointment booking",
      "Prescription system",
      "Patient records",
    ],
    gradient: "from-sky-600 to-blue-500",
  },
];

// Budget Ladder Data
const budgetLadder = [
  {
    tier: "starter",
    title: "স্টার্টার",
    englishTitle: "Starter",
    price: "৳5,000 - 15,000",
    timeline: "৫-৭ দিন",
    icon: RocketLaunchIcon,
    gradient: "from-green-600 to-emerald-500",
    features: [
      "সাধারণ ওয়েবসাইট (৩-৫ পৃষ্ঠা)",
      "মোবাইল রেসপনসিভ",
      "কন্টাক্ট ফর্ম",
      "বেসিক SEO",
    ],
    bestFor: "ছোট ব্যবসা, ফ্রিল্যান্সার, স্টার্টআপ",
  },
  {
    tier: "growth",
    title: "গ্রোথ",
    englishTitle: "Growth",
    price: "৳15,000 - 35,000",
    timeline: "১০-১৪ দিন",
    icon: ChartBarIcon,
    gradient: "from-blue-600 to-cyan-500",
    features: [
      "SEO অপ্টিমাইজেশন",
      "লিড ক্যাপচার সিস্টেম",
      "অ্যানালিটিক্স ইন্টিগ্রেশন",
      "ইমেইল মার্কেটিং",
      "ব্লগ/নিউজ সেকশন",
    ],
    bestFor: "গ্রোয়িং বিজনেস, কন্টেন্ট মার্কেটিং",
    popular: true,
  },
  {
    tier: "pro",
    title: "প্রো",
    englishTitle: "Pro",
    price: "৳35,000+",
    timeline: "১৫-২০ দিন",
    icon: CommandLineIcon,
    gradient: "from-purple-600 to-pink-500",
    features: [
      "কাস্টম ড্যাশবোর্ড",
      "অটোমেশন",
      "পেমেন্ট গেটওয়ে",
      "মাল্টি-ল্যাঙ্গুয়েজ",
      "এডভান্সড রিপোর্টিং",
    ],
    bestFor: "এন্টারপ্রাইজ, ই-কমার্স, ম্যানেজমেন্ট সিস্টেম",
  },
];

// Requirements Checklist Data
const requirementsChecklist: ReqSection[] = [
  {
    category: "বেসিক তথ্য",
    items: [
      {
        id: "type",
        label: "ওয়েবসাইট টাইপ",
        type: "select",
        options: websiteTypes.map((t) => t.title),
      },
      {
        id: "pages",
        label: "পৃষ্ঠা সংখ্যা",
        type: "number",
        placeholder: "যেমন: ৫",
      },
      {
        id: "content",
        label: "কন্টেন্ট আছে কি?",
        type: "radio",
        options: ["হ্যাঁ", "না", "আংশিক"],
      },
    ],
  },
  {
    category: "ডিজাইন ও ব্র্যান্ডিং",
    items: [
      {
        id: "logo",
        label: "লোগো আছে কি?",
        type: "radio",
        options: ["হ্যাঁ", "না"],
      },
      {
        id: "brandColor",
        label: "ব্র্যান্ড কালার আছে কি?",
        type: "radio",
        options: ["হ্যাঁ", "না"],
      },
      {
        id: "language",
        label: "ভাষা",
        type: "select",
        options: ["বাংলা", "ইংলিশ", "বাংলা + ইংলিশ"],
      },
    ],
  },
  {
    category: "ফিচার ও ফাংশনালিটি",
    items: [
      { id: "booking", label: "বুকিং সিস্টেম", type: "checkbox" },
      { id: "payment", label: "পেমেন্ট গেটওয়ে", type: "checkbox" },
      { id: "admin", label: "এডমিন প্যানেল", type: "checkbox" },
      { id: "cms", label: "CMS", type: "checkbox" },
    ],
  },
  {
    category: "ডেলিভারি টাইমলাইন",
    items: [
      {
        id: "timeline",
        label: "প্রয়োজনীয় সময়",
        type: "select",
        options: [
          "জরুরী (৩-৫ দিন)",
          "নরমাল (৭-১০ দিন)",
          "লাক্সারি (১৫-২০ দিন)",
        ],
      },
    ],
  },
];

// Main Component
const WebsiteTypes: React.FC = () => {
  const [selectedType, setSelectedType] = useState<number | null>(null);
  const [showChecklist, setShowChecklist] = useState(false);
  const [checklistData, setChecklistData] = useState<Record<string, any>>({});

  return (
    <section className="relative py-8 px-4 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent dark:from-gray-900"></div>

      {/* Animated Background */}
      <div className="absolute top-20 -left-4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 -right-4 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse animation-delay-2000"></div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4"
          >
            <span className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold shadow-lg shadow-purple-500/30">
              🚀 ১০০+ প্রজেক্ট সম্পন্ন
            </span>
          </motion.div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              যেকোনো ধরনের ওয়েবসাইট
            </span>
            <br />
            <span className="text-gray-900 dark:text-white">
              আপনার বাজেট অনুযায়ী
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            সাধারণ ওয়েবসাইট থেকে শুরু করে অ্যাডভান্সড ম্যানেজমেন্ট সিস্টেম—সবই
            প্রফেশনাল ভাবে। ফ্রি কোন্সালটেশন নিয়ে নিন আপনার প্রোজেক্টের জন্য
            সঠিক সলিউশন।
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowChecklist(true)}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold shadow-lg shadow-purple-500/30 hover:shadow-xl transition-all duration-300 flex items-center gap-2"
            >
              <DocumentTextIcon className="w-5 h-5" />
              ফ্রি কোট নিন
            </motion.button>

            <motion.a
              href="https://wa.me/8801797764148"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-green-600 text-white rounded-xl font-semibold shadow-lg shadow-green-500/30 hover:shadow-xl transition-all duration-300 flex items-center gap-2"
            >
              <PhoneArrowDownLeftIcon className="w-5 h-5" />
              WhatsApp করুন
            </motion.a>
          </div>
        </motion.div>

        {/* A) Website Types Grid */}
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              আমরা কী কী ওয়েবসাইট বানাই
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              আপনার প্রয়োজন অনুযায়ী সঠিক ওয়েবসাইট টাইপ নির্বাচন করুন
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {websiteTypes.map((type, index) => {
              const Icon = type.icon;
              return (
                <motion.div
                  key={type.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                  onClick={() =>
                    setSelectedType(selectedType === type.id ? null : type.id)
                  }
                  className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden ${
                    selectedType === type.id ? "ring-2 ring-purple-500" : ""
                  }`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${type.gradient} opacity-0 hover:opacity-5 transition-opacity duration-300`}
                  ></div>

                  <div className="p-6">
                    <div
                      className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${type.gradient} text-white shadow-lg mb-4`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                      {type.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                      {type.bengaliTitle}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                      {type.description}
                    </p>

                    <AnimatePresence>
                      {selectedType === type.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-3 space-y-2"
                        >
                          {type.features.map((feature, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-2 text-sm"
                            >
                              <CheckIcon className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-600 dark:text-gray-300">
                                {feature}
                              </span>
                            </div>
                          ))}

                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="mt-4 w-full py-2 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg text-sm font-semibold hover:shadow-lg transition-all duration-300"
                          >
                            Get Quote
                          </motion.button>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {!selectedType && (
                      <p className="text-xs text-purple-600 dark:text-purple-400 font-medium mt-2">
                        ক্লিক করুন বিস্তারিত দেখতে →
                      </p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* B) Budget Ladder */}
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              আপনার বাজেট অনুযায়ী প্যাকেজ
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              স্টার্টার থেকে প্রো—প্রতিটি বাজেটের জন্য আলাদা সলিউশন
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {budgetLadder.map((tier, index) => {
              const Icon = tier.icon;
              return (
                <motion.div
                  key={tier.tier}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className={`relative bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden ${
                    tier.popular ? "ring-2 ring-purple-500 scale-105 z-10" : ""
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute top-6 left-6">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-md"></div>
                        <div className="relative px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white text-xs font-bold">
                          সবচেয়ে জনপ্রিয়
                        </div>
                      </div>
                    </div>
                  )}

                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${tier.gradient} opacity-5`}
                  ></div>

                  <div className="p-8">
                    <div
                      className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${tier.gradient} text-white shadow-xl mb-6`}
                    >
                      <Icon className="w-8 h-8" />
                    </div>

                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                        {tier.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {tier.englishTitle}
                      </p>
                    </div>

                    <div className="mb-6">
                      <div className="text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        {tier.price}
                      </div>
                      <div className="flex items-center gap-2 mt-2 text-sm text-gray-600 dark:text-gray-400">
                        <ClockIcon className="w-4 h-4" />
                        ডেলিভারি: {tier.timeline}
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      {tier.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckBadgeIcon
                            className={`w-5 h-5 text-${tier.gradient.split(" ")[0].replace("from-", "")} flex-shrink-0`}
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
                      <span className="font-semibold">সেরা জন্য:</span>{" "}
                      {tier.bestFor}
                    </p>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        window.open(
                          `https://wa.me/8801XXXXXXXXX?text=${encodeURIComponent(
                            `আমি ${tier.title} (${tier.englishTitle}) প্যাকেজটি নিতে চাই। বাজেট: ${tier.price}. বিস্তারিত জানাতে পারেন?`,
                          )}`,
                          "_blank",
                        );
                      }}
                      className={`block w-full text-center py-4 px-6 rounded-xl font-bold text-white shadow-xl transition-all duration-300 bg-gradient-to-r ${tier.gradient} hover:shadow-2xl cursor-pointer`}
                    >
                      প্যাকেজ সিলেক্ট করুন
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* C) Requirements Checklist Modal */}
        <AnimatePresence>
          {showChecklist && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowChecklist(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      ফ্রি কোটের জন্য তথ্য দিন
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      নিচের তথ্যগুলো দিলে আমরা দ্রুত কোট দিতে পারব
                    </p>
                  </div>
                  <button
                    onClick={() => setShowChecklist(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                  >
                    <XMarkIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                  </button>
                </div>

                <div className="p-6 space-y-8">
                  {requirementsChecklist.map((section, idx) => (
                    <div key={idx}>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        {section.category}
                      </h3>
                      <div className="space-y-4">
                        {section.items.map((item) => (
                          <div key={item.id} className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {item.label}
                            </label>

                            {/* SELECT */}
                            {item.type === "select" && (
                              <select
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                                value={checklistData[item.id] ?? ""}
                                onChange={(e) =>
                                  setChecklistData({
                                    ...checklistData,
                                    [item.id]: e.target.value,
                                  })
                                }
                              >
                                <option value="">সিলেক্ট করুন</option>
                                {item.options.map((opt) => (
                                  <option key={opt} value={opt}>
                                    {opt}
                                  </option>
                                ))}
                              </select>
                            )}

                            {/* NUMBER */}
                            {item.type === "number" && (
                              <input
                                type="number"
                                placeholder={item.placeholder}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                                value={checklistData[item.id] ?? ""}
                                onChange={(e) =>
                                  setChecklistData({
                                    ...checklistData,
                                    [item.id]: e.target.value,
                                  })
                                }
                              />
                            )}

                            {/* RADIO */}
                            {item.type === "radio" && (
                              <div className="flex gap-4">
                                {item.options.map((opt) => (
                                  <label
                                    key={opt}
                                    className="flex items-center gap-2"
                                  >
                                    <input
                                      type="radio"
                                      name={item.id}
                                      value={opt}
                                      className="text-purple-600 focus:ring-purple-500"
                                      checked={checklistData[item.id] === opt}
                                      onChange={(e) =>
                                        setChecklistData({
                                          ...checklistData,
                                          [item.id]: e.target.value,
                                        })
                                      }
                                    />
                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                      {opt}
                                    </span>
                                  </label>
                                ))}
                              </div>
                            )}

                            {/* CHECKBOX */}
                            {item.type === "checkbox" && (
                              <label className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="rounded text-purple-600 focus:ring-purple-500"
                                  checked={Boolean(checklistData[item.id])}
                                  onChange={(e) =>
                                    setChecklistData({
                                      ...checklistData,
                                      [item.id]: e.target.checked,
                                    })
                                  }
                                />
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                  {item.label}
                                </span>
                              </label>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* Submit Button */}
                  <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        // Handle form submission
                        console.log(checklistData);
                        setShowChecklist(false);
                        // Here you can send the data to your backend
                      }}
                      className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      ফ্রি কোট নিন
                    </motion.button>

                    <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
                      আপনার তথ্য সম্পূর্ণ নিরাপদ থাকবে। আমরা ২৪ ঘন্টার মধ্যে
                      যোগাযোগ করব।
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { icon: ClockIcon, text: "৫-২০ দিন ডেলিভারি" },
            { icon: DevicePhoneMobileIcon, text: "মোবাইল রেসপনসিভ" },
            { icon: MagnifyingGlassIcon, text: "SEO ফ্রেন্ডলি" },
            { icon: ChartBarIcon, text: "৩০ দিন সাপোর্ট" },
          ].map((badge, index) => (
            <div
              key={index}
              className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400"
            >
              <badge.icon className="w-5 h-5 text-purple-500" />
              <span>{badge.text}</span>
            </div>
          ))}
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-xl"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            সাধারণ জিজ্ঞাসা
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                q: "ডেলিভারি কতদিন লাগে?",
                a: "প্যাকেজ অনুযায়ী ৫-২০ দিন। জরুরী প্রয়োজনে এক্সপ্রেস ডেলিভারি অপশন আছে।",
              },
              {
                q: "কন্টেন্ট না থাকলে কী করব?",
                a: "আমরা কন্টেন্ট ক্রিয়েশন সার্ভিস দিই। অতিরিক্ত চার্জে কন্টেন্ট লিখে দেব।",
              },
              {
                q: "পেমেন্ট প্রক্রিয়া কেমন?",
                a: "৫০% অগ্রিম, বাকি ৫০% ডেলিভারির পর। বিকাশ, নগদ, ব্যাংক ট্রান্সফার।",
              },
              {
                q: "রিভিশন কতবার পাব?",
                a: "সব প্যাকেজে ১ রাউন্ড ফ্রি রিভিশন। অতিরিক্ত রিভিশনে চার্জ প্রযোজ্য।",
              },
            ].map((faq, index) => (
              <div key={index} className="space-y-2">
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  {faq.q}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
};

export default WebsiteTypes;

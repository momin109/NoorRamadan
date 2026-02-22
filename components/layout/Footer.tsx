"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Moon,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Heart,
  Sparkles,
  Clock,
  Star,
  ArrowRight,
} from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border-t border-gray-200 dark:border-gray-800 pt-16 pb-8 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 opacity-30"></div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>

      {/* Animated Icons */}
      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 right-[5%] text-amber-500/10"
      >
        <Moon className="w-32 h-32" />
      </motion.div>

      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-20 left-[5%] text-amber-500/10"
      >
        <Star className="w-24 h-24" />
      </motion.div>

      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand Section - Premium */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg blur-md opacity-60 group-hover:opacity-80 transition-opacity"></div>
                <div className="relative p-2 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg text-white">
                  <Moon className="h-6 w-6 fill-current" />
                </div>
              </div>
              <div>
                <span className="font-heading text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  Ramadan<span className="text-amber-500">Web</span>
                </span>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 -mt-1">
                  সঠিক সময়, সঠিক পথ
                </p>
              </div>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              রমজান ২০২৬-এর আপনার সঙ্গী। সঠিক সময়সূচি ও প্রিমিয়াম ওয়েব সেবা
              দিয়ে এই পবিত্র মাসে আপনার ব্যবসাকে এগিয়ে নিন।
            </p>

            {/* Trust Badges */}
            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center gap-1 px-2 py-1 bg-amber-50 dark:bg-amber-950/30 rounded-full border border-amber-200 dark:border-amber-800">
                <Sparkles className="h-3 w-3 text-amber-500" />
                <span className="text-[10px] font-semibold text-amber-700 dark:text-amber-400">
                  ৫০% অফ
                </span>
              </div>
              <div className="flex items-center gap-1 px-2 py-1 bg-emerald-50 dark:bg-emerald-950/30 rounded-full border border-emerald-200 dark:border-emerald-800">
                <Clock className="h-3 w-3 text-emerald-500" />
                <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400">
                  ২৪/৭ সাপোর্ট
                </span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="font-heading font-bold text-lg mb-4 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              দ্রুত লিংক
            </h3>
            <ul className="space-y-3">
              {[
                { name: "সেহরি ও ইফতার", href: "/sehri", icon: Clock },
                { name: "দোয়া ও হাদিস", href: "/dua", icon: Heart },
                {
                  name: "সার্ভিসেস",
                  href: "/services",
                  icon: Sparkles,
                  featured: true,
                  badge: "৫০%",
                },
                { name: "যোগাযোগ", href: "/contact", icon: Phone },
              ].map((link, index) => {
                const Icon = link.icon;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`
                        group flex items-center gap-2 text-sm transition-all duration-300
                        ${
                          link.featured
                            ? "text-amber-600 dark:text-amber-400 font-semibold"
                            : "text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400"
                        }
                      `}
                    >
                      <Icon
                        className={`h-4 w-4 transition-transform group-hover:scale-110 ${
                          link.featured
                            ? "text-amber-500"
                            : "text-gray-400 group-hover:text-amber-500"
                        }`}
                      />
                      <span>{link.name}</span>
                      {link.badge && (
                        <span className="px-1.5 py-0.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[8px] font-bold rounded-full">
                          {link.badge}
                        </span>
                      )}
                      <ArrowRight className="h-3 w-3 opacity-0 -ml-1 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>

          {/* Our Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="font-heading font-bold text-lg mb-4 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              আমাদের সার্ভিসেস
            </h3>
            <ul className="space-y-3">
              {[
                "বিজনেস ওয়েবসাইট",
                "ই-কমার্স সলিউশন",
                "পোর্টফোলিও",
                "ল্যান্ডিং পেজ",
                "এসইও অপ্টিমাইজেশন",
              ].map((service, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                >
                  <div className="w-1 h-1 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"></div>
                  {service}
                </li>
              ))}
            </ul>

            {/* Special Ramadan Offer */}
            <div className="mt-4 p-3 bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-950/30 dark:to-amber-900/30 rounded-xl border border-amber-200 dark:border-amber-800">
              <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                রমজান স্পেশাল অফার: ৫০% ছাড়
              </p>
            </div>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="font-heading font-bold text-lg mb-4 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              যোগাযোগ
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 group">
                <div className="p-2 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg text-white shadow-lg group-hover:scale-110 transition-transform">
                  <Phone className="h-4 w-4" />
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  +880 1797-764148
                </span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="p-2 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg text-white shadow-lg group-hover:scale-110 transition-transform">
                  <Mail className="h-4 w-4" />
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  momin550550@gmail.com
                </span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="p-2 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg text-white shadow-lg group-hover:scale-110 transition-transform">
                  <MapPin className="h-4 w-4" />
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  ঢাকা, বাংলাদেশ
                </span>
              </li>
            </ul>

            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              {[
                {
                  icon: Facebook,
                  href: "#",
                  color: "from-blue-600 to-blue-700",
                },
                {
                  icon: Instagram,
                  href: "#",
                  color: "from-pink-500 to-purple-600",
                },
                { icon: Twitter, href: "#", color: "from-sky-500 to-sky-600" },
              ].map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-2 bg-gradient-to-br ${social.color} text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300`}
                  >
                    <Icon className="h-4 w-4" />
                  </motion.a>
                );
              })}
            </div>

            {/* WhatsApp CTA */}
            <motion.a
              href="https://wa.me/8801797764148"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              className="mt-4 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg shadow-lg shadow-green-600/30 hover:shadow-xl transition-all duration-300"
            >
              <Phone className="h-4 w-4" />
              WhatsApp এ কথা বলুন
            </motion.a>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="relative border-t border-gray-200 dark:border-gray-800 pt-8">
          {/* Newsletter (Optional) */}
          <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
            <div className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full text-white text-xs font-semibold shadow-lg">
              🌙 রমজান মোবারক ২০২৬
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600 dark:text-gray-400">
            <p>&copy; {currentYear} RamadanWeb. সমস্ত অধিকার সংরক্ষিত।</p>

            <div className="flex items-center gap-4">
              <Link
                href="/privacy"
                className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
              >
                গোপনীয়তা নীতি
              </Link>
              <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
              <Link
                href="/terms"
                className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
              >
                শর্তাবলী
              </Link>
            </div>

            <p className="flex items-center gap-1 text-xs">
              তৈরি করেছেন{" "}
              <Heart className="h-3 w-3 text-red-500 fill-current" />
              <span className="bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent font-semibold">
                RamadanWeb টিম
              </span>
            </p>
          </div>

          {/* Payment Methods (Optional) */}
          <div className="flex justify-center gap-2 mt-4">
            {["বিকাশ", "নগদ", "রকেট", "মাস্টারকার্ড", "ভিসা"].map(
              (method, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-[10px] text-gray-600 dark:text-gray-400"
                >
                  {method}
                </span>
              ),
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { Moon, Menu, X, Sparkles, Clock, Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "হোম", href: "/", icon: Star },
    { name: "সেহরি টাইম", href: "/sehri", icon: Clock },
    { name: "দোয়া ও হাদিস", href: "/dua", icon: Heart },
    { name: "সার্ভিসেস", href: "/services", featured: true, badge: "৫০% অফ" },
    { name: "যোগাযোগ", href: "/contact", icon: Moon },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 shadow-lg"
          : "bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-800/50"
      }`}
    >
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex h-16 md:h-20 items-center justify-between">
          {/* Logo - Premium */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
            onClick={() => setIsOpen(false)}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg blur-md opacity-60 group-hover:opacity-80 transition-opacity"></div>
              <div className="relative p-1.5 md:p-2 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg text-white">
                <Moon className="h-5 w-5 md:h-6 md:w-6 fill-current" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-lg md:text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Ramadan<span className="text-amber-500">Web</span>
              </span>
              <span className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 -mt-1">
                সঠিক সময়, সঠিক পথ
              </span>
            </div>
          </Link>

          {/* Desktop Nav - Premium */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    relative px-3 lg:px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300
                    flex items-center gap-2 group
                    ${
                      isActive
                        ? "text-amber-600 dark:text-amber-400"
                        : "text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400"
                    }
                    ${link.featured ? "bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-950/30 dark:to-amber-900/30 border border-amber-200 dark:border-amber-800" : ""}
                  `}
                >
                  {Icon && (
                    <Icon
                      className={`h-4 w-4 transition-transform group-hover:scale-110 ${
                        isActive
                          ? "text-amber-500"
                          : "text-gray-400 dark:text-gray-500 group-hover:text-amber-500"
                      }`}
                    />
                  )}
                  <span>{link.name}</span>

                  {/* Active Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}

                  {/* Featured Badge */}
                  {link.badge && (
                    <span className="absolute -top-2 -right-2 px-1.5 py-0.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[10px] font-bold rounded-full shadow-lg shadow-amber-500/30">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            {/* Get Quote Button - Premium */}
            <div className="ml-2 lg:ml-4">
              <Button
                asChild
                className="relative group px-5 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold rounded-xl shadow-lg shadow-amber-500/30 hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <Link href="/contact">
                  <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                  <span className="relative flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    ফ্রি কোট
                  </span>
                </Link>
              </Button>
            </div>
          </div>

          {/* Mobile Nav Trigger - Premium */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative group hover:bg-amber-50 dark:hover:bg-amber-950/30 transition-colors"
                  aria-label="Open menu"
                >
                  <Menu className="h-6 w-6 text-gray-700 dark:text-gray-300 group-hover:text-amber-500 transition-colors" />
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="w-[300px] sm:w-[350px] p-0">
                <SheetHeader className="sr-only">
                  <SheetTitle>Mobile Navigation Menu</SheetTitle>
                </SheetHeader>

                {/* Mobile Menu Header */}
                <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                        <Moon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-lg">
                          RamadanWeb
                        </h3>
                        <p className="text-amber-100 text-xs">
                          সঠিক সময়, সঠিক পথ
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsOpen(false)}
                      className="text-white hover:bg-white/20"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                {/* Mobile Menu Links */}
                <div className="p-4">
                  <div className="flex flex-col gap-2">
                    {navLinks.map((link) => {
                      const Icon = link.icon;
                      const isActive = pathname === link.href;

                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className={`
                            relative flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300
                            ${
                              isActive
                                ? "bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-950/30 dark:to-amber-900/30 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800"
                                : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                            }
                            ${link.featured ? "border-2 border-amber-200 dark:border-amber-800" : ""}
                          `}
                        >
                          {Icon && (
                            <div
                              className={`p-1.5 rounded-lg ${
                                isActive
                                  ? "bg-amber-500 text-white"
                                  : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                              }`}
                            >
                              <Icon className="h-4 w-4" />
                            </div>
                          )}
                          <span className="flex-1">{link.name}</span>

                          {link.badge && (
                            <span className="px-2 py-0.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[10px] font-bold rounded-full">
                              {link.badge}
                            </span>
                          )}

                          {isActive && (
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                          )}
                        </Link>
                      );
                    })}
                  </div>

                  {/* Mobile Menu Footer */}
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <Button
                      asChild
                      className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold rounded-xl shadow-lg shadow-amber-500/30"
                    >
                      <Link href="/contact" onClick={() => setIsOpen(false)}>
                        <Sparkles className="h-4 w-4 mr-2" />
                        ফ্রি কোট নিন
                      </Link>
                    </Button>

                    <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-500 dark:text-gray-400">
                      <span>৫০% অফার</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                      <span>২৪/৭ সাপোর্ট</span>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Scroll Progress Indicator (Optional) */}
      {scrolled && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500 to-amber-600 origin-left"
        />
      )}
    </motion.nav>
  );
}

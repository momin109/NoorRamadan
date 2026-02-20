import Link from "next/link";
import {
  Moon,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary/5 border-t border-primary/10 pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-heading text-xl font-bold text-primary">
              <Moon className="h-6 w-6 text-secondary fill-secondary" />
              <span>
                Ramadan<span className="text-secondary">Web</span>
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Your companion for Ramadan 2026. Get accurate prayer times and
              professional web services to grow your business this holy month.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/sehri"
                  className="hover:text-primary transition-colors"
                >
                  Sehri & Iftar Time
                </Link>
              </li>
              <li>
                <Link
                  href="/dua"
                  className="hover:text-primary transition-colors"
                >
                  Dua & Hadith
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-primary transition-colors font-bold text-secondary"
                >
                  Ramadan Offer (50% OFF)
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-primary transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">
              Our Services
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Business Website Design</li>
              <li>E-commerce Solutions</li>
              <li>Portfolio Websites</li>
              <li>Landing Pages</li>
              <li>SEO Optimization</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">
              Contact Us
            </h3>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary" />
                <span>+880 1234 567890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary" />
                <span>hello@ramadanweb.com</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Dhaka, Bangladesh</span>
              </li>
            </ul>

            <div className="flex gap-4 mt-6">
              <a
                href="#"
                className="p-2 bg-primary/10 rounded-full hover:bg-primary hover:text-white transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="p-2 bg-primary/10 rounded-full hover:bg-primary hover:text-white transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="p-2 bg-primary/10 rounded-full hover:bg-primary hover:text-white transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary/10 pt-8 text-center text-sm text-muted-foreground">
          <p>
            &copy; 2026 RamadanWeb. All rights reserved. |{" "}
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

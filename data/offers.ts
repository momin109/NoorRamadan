// Export the data directly
export const offers = [
  {
    title: "E-commerce Website",
    features: [
      "Online Store",
      "Payment Gateway",
      "Admin Panel",
      "Unlimited Products",
    ],
    originalPrice: "৳25,000",
    offerPrice: "৳12,500",
    badge: "Most Popular",
  },
  {
    title: "Business Website",
    features: [
      "5 Pages",
      "Contact Form",
      "SEO Optimization",
      "Mobile Responsive",
    ],
    originalPrice: "৳15,000",
    offerPrice: "৳7,500",
    badge: "Best Value",
  },
  {
    title: "Portfolio Website",
    features: [
      "Personal Branding",
      "Project Gallery",
      "Resume Download",
      "Contact Section",
    ],
    originalPrice: "৳10,000",
    offerPrice: "৳5,000",
    badge: "Starter",
  },
  {
    title: "Blog / News Portal",
    features: [
      "CMS Integration",
      "AdSense Ready",
      "User Comments",
      "Newsletter",
    ],
    originalPrice: "৳20,000",
    offerPrice: "৳10,000",
    badge: "Professional",
  },
];

// Also export the type
export type Offer = (typeof offers)[0];

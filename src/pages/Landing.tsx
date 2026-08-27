import { motion } from "framer-motion";
import {
  ArrowRight,
  CarFront,
  Headphones,
  ShieldCheck,
  Award,
  Smartphone,
} from "lucide-react";

import "./ExplorePage.css";

const categories = [
  {
    id: "gadgets",
    title: "GADGETS",
    subtitle: "Phones, Laptops & Accessories",
    description: "Explore the latest smartphones, laptops, smartwatches, and premium accessories.",
    button: "Explore Gadgets",
    icon: Smartphone,
    image: "/gadget.png",
    href: "/gadgets",
  },
  {
    id: "vehicles",
    title: "VEHICLES",
    subtitle: "Cars, SUVs & More",
    description: "Discover premium vehicles with power, performance, and prestige.",
    button: "Explore Vehicles",
    icon: CarFront,
    image: "/vehicle.png",
    href: "/vehicles",
  },
];

const features = [
  { icon: ShieldCheck, title: "100% Authentic", text: "Genuine products you can trust" },
  { icon: Award, title: "Premium Quality", text: "Top brands and best standards" },
  { icon: Headphones, title: "Trusted Support", text: "We're here for you every step of the way" },
];

export default function Landing() {
  return (
    <main className="explore-page">
      <div className="page-container">
        <motion.div className="brand" initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <img className="brand-logo" src="/goldlogo.png" alt="Anu Gadget" />
          <h2>ANU GADGET</h2>
          <p>Premium Gadgets. Luxury Vehicles.</p>
        </motion.div>

        <motion.section className="hero" initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
          <h1>What would you like to <span>explore today?</span></h1>
          <p>Choose a category to discover the best in tech and automotive luxury.</p>
          <div className="hero-line"><span /></div>
        </motion.section>

        <section className="category-grid">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.a
                href={category.href}
                key={category.id}
                className="category-card"
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 + index * 0.15 }}
                whileHover={{ y: -12, transition: { duration: 0.3 } }}
              >
                <div className="card-image" style={{ backgroundImage: `url(${category.image})` }} />
                <div className="image-overlay" />
                <div className="card-content">
                  <div className="category-icon"><Icon size={28} /></div>
                  <div className="card-text">
                    <h2>{category.title}</h2>
                    <h3>{category.subtitle}</h3>
                    <p>{category.description}</p>
                  </div>
                  <div className="explore-button"><span>{category.button}</span><ArrowRight size={20} /></div>
                </div>
                <div className="card-glow" />
              </motion.a>
            );
          })}
        </section>

        <motion.section className="features" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.8 }}>
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div className="feature" key={feature.title}>
                <div className="feature-icon"><Icon size={25} /></div>
                <div><h4>{feature.title}</h4><p>{feature.text}</p></div>
              </div>
            );
          })}
        </motion.section>

        <footer>© {new Date().getFullYear()} Anu Gadget. All rights reserved.</footer>
      </div>

    </main>
  );
}

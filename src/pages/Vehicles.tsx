import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ShieldCheck,
  Award,
  Fuel,
  Wrench,
  Phone,
  ArrowRight,
  MapPin,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import VehiclesFooter from "@/components/VehiclesFooter";
import VehicleHero from "@/components/VehicleHero";
import { useVehicles } from "@/data/vehicleStore";

const features = [
  { icon: ShieldCheck, title: "Certified Pre-Owned", desc: "Every vehicle undergoes a 200+ point inspection" },
  { icon: Award, title: "Premium Selection", desc: "Only the finest luxury vehicles make our showroom" },
  { icon: Wrench, title: "Full Service History", desc: "Complete maintenance records for total transparency" },
  { icon: Fuel, title: "Warranty Included", desc: "Comprehensive warranty coverage for your peace of mind" },
];

const brandLogos = [
  "/brands/mercedes-benz.png",
  "/brands/bmw.png",
  "/brands/audi-logo-2016.png",
  "/brands/porsche-logo-2014.png",
  "/brands/bentley-logo-2025.png",
  "/brands/lexus.png",
  "/brands/toyota.png",
  "/brands/tesla.png",
  "/brands/lamborghini.png",
  "/brands/lotus-logo-2019.png",
  "/brands/maserati-logo-2020.png",
  "/brands/mclaren-logo-2018.png",
  "/brands/aston-martin-logo-2021.png",
  "/brands/bugatti-logo-2022.png",
  "/brands/koenigsegg-logo-2020.png",
  "/brands/land-rover-logo-2021.png",
  "/brands/jaguar-logo-2021.png",
  "/brands/maybach-logo-1997.png",
  "/brands/genesis-logo-2020.png",
  "/brands/infiniti-logo-2023.png",
  "/brands/nio-logo-2016.png",
  "/brands/rivian-logo-2018.png",
  "/brands/acura-logo-1989.png",
  "/brands/cadillac-logo-2021.png",
  "/brands/chevrolet-logo-2013.png",
  "/brands/dodge-logo.png",
  "/brands/ferrari-logo.png",
  "/brands/ford.png",
  "/brands/honda.png",
  "/brands/hyundai-logo-2011.png",
  "/brands/kia-logo-2021.png",
  "/brands/lincoln-logo-2012.png",
  "/brands/mazda-logo-2018.v.png",
  "/brands/mitsubishi-logo-1985.png",
  "/brands/nissan-logo-2020.png",
  "/brands/subaru.png",
  "/brands/volkswagen-logo.png",
  "/brands/volvo-logo-2021.png",
];

const Vehicles = () => {
  const [cars] = useVehicles();
  const [featured, setFeatured] = useState(0);
  const location = useLocation();

  useEffect(() => {
    if (cars.length > 0) {
      setFeatured((prev) => (prev >= cars.length ? 0 : prev));
    }
  }, [cars.length]);

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) {
        const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top, behavior: "smooth" });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  useEffect(() => {
    setFeatured(Math.floor(Math.random() * cars.length));
  }, [cars.length]);

  useEffect(() => {
    if (cars.length <= 1) return;
    const timer = setInterval(() => {
      setFeatured((prev) => {
        let next = Math.floor(Math.random() * cars.length);
        if (next === prev) next = (next + 1) % cars.length;
        return next;
      });
    }, 6000);
    return () => clearInterval(timer);
  }, [cars.length]);

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      <VehicleHero />

      {/* Brand Marquee */}
      <section className="relative border-y border-gray-100 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url(/vehiclebackground.png)" }}>
        <div className="absolute inset-0 bg-white/90" />

        {/* Logo Track */}
        <div className="relative overflow-hidden py-8 sm:py-10">
          <div className="flex w-max items-center" style={{ animation: "brandScroll 45s linear infinite" }}>
            {[...brandLogos, ...brandLogos].map((src, i) => (
              <div key={i} className="flex-shrink-0 w-28 sm:w-40 md:w-44 lg:w-56 flex items-center justify-center px-2">
                <img alt="" src={src} className="h-9 sm:h-12 md:h-14 lg:h-16 w-auto max-w-full object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Vehicle — Manga-style Showcase Hero */}
      <section
        id="inventory"
        className="relative h-screen min-h-[640px] w-full overflow-hidden flex items-center justify-center bg-[#0f1012]"
      >
        {/* Background Image — the featured car's own photo */}
        <div key={featured} className="absolute inset-0 z-0 hero-fade">
          <img
            src={cars[featured].image}
            alt={cars[featured].name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/55 z-10 pointer-events-none" />
        </div>

        {/* Centered Content */}
        <div key={featured} className="relative z-20 text-center px-6 hero-fade pointer-events-auto">
          <p className="text-[#cfa78a] text-[10px] sm:text-xs uppercase tracking-[0.35em] font-medium mb-5">
            {cars[featured].subtitle}
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-semibold text-[#f5f5f0] leading-tight tracking-tight">
            {cars[featured].name.toUpperCase()}
            <br />
            <span className="text-2xl sm:text-3xl md:text-4xl italic text-[#cfa78a] font-normal tracking-normal block mt-4">
              {cars[featured].highlight}
            </span>
          </h2>
          <Link
            to="/inventory"
            className="mt-10 inline-block px-10 py-4 border border-[#f5f5f0]/30 text-[#f5f5f0] text-xs uppercase tracking-[0.25em] transition-all duration-500 hover:bg-[#cfa78a] hover:border-[#cfa78a] hover:text-[#0f1012] backdrop-blur-sm cursor-pointer"
          >
            View Full Collection
          </Link>
        </div>

        {/* Slide Controls */}
        <div className="absolute bottom-24 md:bottom-32 left-0 right-0 z-30 flex items-center justify-between px-6 sm:px-10">
          <span className="text-xs tracking-[0.3em] text-[#f5f5f0]/60 font-medium">
            {String(featured + 1).padStart(2, "0")}{" "}
            <span className="text-[#cfa78a]">/</span>{" "}
            {String(vehiclesCounter).padStart(2, "0")}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setFeatured((featured + vehicles.length - 1) % vehicles.length)}
              aria-label="Previous vehicle"
              className="w-10 h-10 border border-[#f5f5f0]/25 text-[#f5f5f0] hover:bg-[#cfa78a] hover:border-[#cfa78a] hover:text-[#0f1012] transition-all"
            >
              <ChevronLeft className="h-4 w-4 mx-auto" />
            </button>
            <button
              onClick={() => setFeatured((featured + 1) % vehicles.length)}
              aria-label="Next vehicle"
              className="w-10 h-10 border border-[#f5f5f0]/25 text-[#f5f5f0] hover:bg-[#cfa78a] hover:border-[#cfa78a] hover:text-[#0f1012] transition-all"
            >
              <ChevronRight className="h-4 w-4 mx-auto" />
            </button>
          </div>
        </div>

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#0f1012] via-[#0f1012]/60 to-transparent z-10 pointer-events-none" />
      </section>

      {/* Vehicle Grid */}
      <section id="inventory-grid" className="py-20 sm:py-28 relative bg-white scroll-mt-20">
        {/* Background Image */}
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(/vehiclebackground.png)" }} />
        <div className="absolute inset-0 bg-white/90" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[#d4af37] text-xs font-bold tracking-[0.2em] uppercase mb-2">Browse</p>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
              Our{" "}
              <span className="bg-gradient-to-r from-[#d4af37] to-[#f0d772] bg-clip-text text-transparent">
                Collection
              </span>
            </h2>
            <p className="text-gray-500 text-sm mt-3">
              A curated selection from our showroom — view the full inventory in the store.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {vehicles.slice(0, 6).map((vehicle, i) => (
              <div
                key={vehicle.id}
                className="group bg-white border border-gray-200 hover:border-[#d4af37]/40 hover:shadow-xl hover:shadow-[#d4af37]/10 transition-all duration-500 overflow-hidden rounded-xl"
                style={{ animation: `fadeInUp 0.6s ease-out ${0.1 * i}s both` }}
              >
                {/* Image */}
                <div className="relative h-52 bg-gradient-to-b from-gray-100 to-white overflow-hidden">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-0.5 bg-gradient-to-r from-[#d4af37] to-[#f0d772] text-black text-[10px] font-bold tracking-wider uppercase rounded-md shadow-md">
                    {vehicle.category}
                  </div>
                  <div className="absolute top-3 right-3 px-2.5 py-0.5 bg-white/90 backdrop-blur-sm border border-[#d4af37]/20 text-[#d4af37] text-[10px] font-bold rounded-md">
                    {vehicle.year}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-[#d4af37] transition-colors">
                    {vehicle.name}
                  </h3>
                  <p className="font-bold text-lg mb-4 bg-gradient-to-r from-[#d4af37] to-[#f0d772] bg-clip-text text-transparent">
                    {vehicle.price}
                  </p>

                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="text-center">
                      <p className="text-[10px] text-gray-400 uppercase">Power</p>
                      <p className="text-xs font-bold text-gray-600">{vehicle.power}</p>
                    </div>
                    <div className="text-center border-x border-gray-100">
                      <p className="text-[10px] text-gray-400 uppercase">Engine</p>
                      <p className="text-xs font-bold text-gray-600">{vehicle.engine.split(" ")[0]}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] text-gray-400 uppercase">0-100</p>
                      <p className="text-xs font-bold text-gray-600">{vehicle.speed.split(" ").slice(-1)}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 py-2 bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-[11px] font-bold tracking-wider uppercase hover:bg-[#d4af37] hover:text-black transition-all rounded-lg">
                      Enquire
                    </button>
                    <button className="px-3 py-2 border border-gray-200 text-gray-400 text-[11px] hover:border-[#d4af37]/40 hover:text-[#d4af37] transition-all rounded-lg">
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/inventory"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#d4af37] to-[#f0d772] text-black text-xs font-bold tracking-wider uppercase hover:from-[#f0d772] hover:to-[#e6c64f] transition-all shadow-lg shadow-[#d4af37]/20 rounded-full"
            >
              View Full Inventory
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 sm:py-28 relative">
        <div className="absolute inset-0 bg-cover bg-fixed bg-center" style={{ backgroundImage: "url(/sectionbackground.png)" }} />
        <div className="absolute inset-0 bg-black/25" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[#f5f5f0]/90 text-xs font-bold tracking-[0.2em] uppercase mb-2">Why Choose Us</p>
            <h2 className="text-3xl sm:text-4xl font-black text-[#f5f5f0]">
              The{" "}
              <span className="bg-gradient-to-r from-[#f0d772] to-[#d4af37] bg-clip-text text-transparent">
                Anu
              </span>{" "}
              Difference
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((feature, i) => (
              <div
                key={i}
                className="group p-6 bg-white border border-gray-200 hover:border-[#d4af37]/30 hover:shadow-xl hover:shadow-[#d4af37]/10 transition-all duration-500 text-center rounded-xl"
                style={{ animation: `fadeInUp 0.6s ease-out ${0.15 * i}s both` }}
              >
                <div className="w-14 h-14 mx-auto mb-4 border border-gray-200 flex items-center justify-center group-hover:bg-[#d4af37]/10 transition-all rounded-xl">
                  <feature.icon className="h-6 w-6 text-[#d4af37]" />
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Financing CTA */}
      <section className="py-20 sm:py-28 relative" id="financing">
        <div className="absolute inset-0 bg-cover bg-fixed bg-center" style={{ backgroundImage: "url(/sectionbackground.png)" }} />
        <div className="absolute inset-0 bg-black/25" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#f5f5f0]/90 text-xs font-bold tracking-[0.2em] uppercase mb-3">Flexible Options</p>
          <h2 className="text-3xl sm:text-5xl font-black text-[#f5f5f0] mb-6">
            Premium{" "}
            <span className="bg-gradient-to-r from-[#f0d772] to-[#d4af37] bg-clip-text text-transparent">
              Financing
            </span>
          </h2>
          <p className="text-[#f5f5f0]/80 max-w-xl mx-auto mb-10 leading-relaxed">
            Drive your dream car today with our tailored financing plans. Competitive rates, flexible terms, and a seamless process from approval to delivery.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            {[
              { title: "Low Interest", desc: "Competitive rates from 8% p.a.", color: "from-[#a8862a] to-[#d4af37]" },
              { title: "Quick Approval", desc: "Get approved within 48 hours", color: "from-[#d4af37] to-[#f0d772]" },
              { title: "Flexible Terms", desc: "12 to 60 month plans available", color: "from-[#d4af37] to-[#e6c64f]" },
            ].map((item, i) => (
              <div key={i} className="p-4 border border-gray-200 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className={`h-0.5 w-12 bg-gradient-to-r ${item.color} mx-auto mb-3 rounded-full`} />
                <h4 className="text-sm font-bold text-gray-900 mb-1">{item.title}</h4>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
          <a
            href="#contact"
            className="inline-flex mt-10 px-8 py-3 bg-gradient-to-r from-[#d4af37] to-[#f0d772] text-black text-xs font-bold tracking-wider uppercase hover:from-[#f0d772] hover:to-[#e6c64f] transition-all shadow-lg shadow-[#d4af37]/20 rounded-full"
          >
            Apply for Financing
          </a>
        </div>
      </section>

      {/* Contact / Test Drive */}
      <section className="py-20 sm:py-28 bg-white scroll-mt-20" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#d4af37] text-xs font-bold tracking-[0.2em] uppercase mb-3">Get In Touch</p>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-6">
                Book a{" "}
                <span className="bg-gradient-to-r from-[#d4af37] to-[#f0d772] bg-clip-text text-transparent">
                  Test Drive
                </span>
              </h2>
              <p className="text-gray-500 mb-8 leading-relaxed">
                Experience the vehicle of your choice in person. Our team will arrange a private viewing and test drive at your convenience.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  { icon: MapPin, text: "3/9 Olukoleosho Ikeja Mokland Plaza, Lagos" },
                  { icon: Phone, text: "+234 812 770 4308" },
                  { icon: Clock, text: "Mon - Sat: 9:00 AM - 6:00 PM" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-gray-600">
                    <item.icon className="h-4 w-4 text-[#d4af37] shrink-0" />
                    {item.text}
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-50 border border-gray-200 p-6 sm:p-8 rounded-2xl shadow-sm">
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] text-gray-500 uppercase tracking-wider mb-1.5 font-medium">Full Name</label>
                    <input
                      type="text"
                      placeholder="Your name"
                      className="w-full bg-white border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#d4af37]/40 focus:ring-1 focus:ring-[#d4af37]/20 outline-none transition-colors rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-gray-500 uppercase tracking-wider mb-1.5 font-medium">Phone</label>
                    <input
                      type="tel"
                      placeholder="+234..."
                      className="w-full bg-white border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#d4af37]/40 focus:ring-1 focus:ring-[#d4af37]/20 outline-none transition-colors rounded-lg"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] text-gray-500 uppercase tracking-wider mb-1.5 font-medium">Email</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full bg-white border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#d4af37]/40 focus:ring-1 focus:ring-[#d4af37]/20 outline-none transition-colors rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-gray-500 uppercase tracking-wider mb-1.5 font-medium">Interested Vehicle</label>
                  <select className="w-full bg-white border border-gray-200 px-4 py-2.5 text-sm text-gray-900 focus:border-[#d4af37]/40 focus:ring-1 focus:ring-[#d4af37]/20 outline-none transition-colors appearance-none rounded-lg">
                    <option value="">Select a vehicle</option>
                    {vehicles.map((v) => (
                      <option key={v.id} value={v.name}>{v.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] text-gray-500 uppercase tracking-wider mb-1.5 font-medium">Message</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your requirements..."
                    className="w-full bg-white border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#d4af37]/40 focus:ring-1 focus:ring-[#d4af37]/20 outline-none transition-colors resize-none rounded-lg"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-[#d4af37] to-[#f0d772] text-black text-xs font-bold tracking-wider uppercase hover:from-[#f0d772] hover:to-[#e6c64f] transition-all shadow-lg shadow-[#d4af37]/20 rounded-lg"
                >
                  Schedule Test Drive
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <VehiclesFooter />

      {/* Global Animations */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes brandScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .hero-fade {
          animation: heroFade 1.1s ease forwards;
        }
        @keyframes heroFade {
          from { opacity: 0; transform: scale(1.02); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default Vehicles;
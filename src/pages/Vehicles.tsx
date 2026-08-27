import { useState, useEffect } from "react";
import {
  Car,
  Gauge,
  ShieldCheck,
  Award,
  Fuel,
  Wrench,
  Phone,
  ArrowRight,
  MapPin,
  Clock,
  CheckCircle2,
} from "lucide-react";
import VehiclesFooter from "@/components/VehiclesFooter";
import VehicleHero from "@/components/VehicleHero";

const vehicles = [
  {
    id: 1,
    name: "Mercedes-Benz S-Class",
    category: "Sedan",
    price: "₦85,000,000",
    image: "/vehicle.png",
    year: 2024,
    engine: "3.0L Inline-6 Turbo",
    power: "429 HP",
    speed: "0-100 in 4.9s",
    features: ["AMG Line Package", "Burmester 4D Surround", "MBUX Hyperscreen", "Rear-Axle Steering"],
  },
  {
    id: 2,
    name: "BMW X7 M60i",
    category: "SUV",
    price: "₦72,000,000",
    image: "/vehicle.png",
    year: 2024,
    engine: "4.4L V8 Twin-Turbo",
    power: "523 HP",
    speed: "0-100 in 4.7s",
    features: ["M Sport Package", "Sky Lounge Panorama", "Driving Assistant Pro", "Air Suspension"],
  },
  {
    id: 3,
    name: "Range Rover Autobiography",
    category: "SUV",
    price: "₦95,000,000",
    image: "/vehicle.png",
    year: 2024,
    engine: "4.4L V8 Twin-Turbo",
    power: "523 HP",
    speed: "0-100 in 4.6s",
    features: ["Executive Class Seats", "Meridian Signature Sound", "Terrain Response 2", "Pixel LED Lights"],
  },
  {
    id: 4,
    name: "Porsche Cayenne Turbo GT",
    category: "SUV",
    price: "₦110,000,000",
    image: "/vehicle.png",
    year: 2024,
    engine: "4.0L V8 Twin-Turbo",
    power: "631 HP",
    speed: "0-100 in 3.3s",
    features: ["Sport Chrono Package", "PASM Chassis", "Ceramic Brakes", "Race-Tex Interior"],
  },
  {
    id: 5,
    name: "Lexus LM",
    category: "MPV",
    price: "₦65,000,000",
    image: "/vehicle.png",
    year: 2024,
    engine: "2.4L Turbo Hybrid",
    power: "371 HP",
    speed: "0-100 in 6.2s",
    features: ["Ottoman Seats", "14\" Rear Display", "Climate Concierge", "Mark Levinson Audio"],
  },
  {
    id: 6,
    name: "Bentley Continental GT",
    category: "Coupe",
    price: "₦120,000,000",
    image: "/vehicle.png",
    year: 2024,
    engine: "6.0L W12 Twin-Turbo",
    power: "650 HP",
    speed: "0-100 in 3.6s",
    features: ["Rotating Display", "Naim Audio", "Mulliner Driving Spec", "Diamond Knurling"],
  },
];

const features = [
  { icon: ShieldCheck, title: "Certified Pre-Owned", desc: "Every vehicle undergoes a 200+ point inspection" },
  { icon: Award, title: "Premium Selection", desc: "Only the finest luxury vehicles make our showroom" },
  { icon: Wrench, title: "Full Service History", desc: "Complete maintenance records for total transparency" },
  { icon: Fuel, title: "Warranty Included", desc: "Comprehensive warranty coverage for your peace of mind" },
];

const stats = [
  { value: "500+", label: "Vehicles Sold" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "15+", label: "Years Experience" },
  { value: "50+", label: "Luxury Brands" },
];

const Vehicles = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % vehicles.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      <VehicleHero />

      {/* Stats Bar */}
      <section className="relative border-y border-gray-100 bg-gradient-to-r from-blue-50/80 via-white to-blue-50/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-gray-100">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="py-8 sm:py-10 text-center"
                style={{ animation: `fadeInUp 0.6s ease-out ${0.1 * i}s both` }}
              >
                <p className="text-3xl sm:text-4xl font-black bg-gradient-to-b from-[#0a7bb3] to-[#0a7bb3]/70 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-xs text-gray-400 mt-1 tracking-wider uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Vehicle Carousel */}
      <section className="py-20 sm:py-28 relative bg-white" id="inventory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
            <div>
              <p className="text-[#d4af37] text-xs font-bold tracking-[0.2em] uppercase mb-2">Our Collection</p>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
                Featured{" "}
                <span className="bg-gradient-to-r from-[#0a7bb3] to-[#d4af37] bg-clip-text text-transparent">
                  Vehicles
                </span>
              </h2>
            </div>
            <div className="flex gap-2">
              {vehicles.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveSlide(i)}
                  className={`h-1 transition-all duration-300 ${
                    i === activeSlide ? "bg-gradient-to-r from-[#0a7bb3] to-[#d4af37] w-14" : "bg-gray-200 hover:bg-gray-300 w-10"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Featured Display */}
          <div className="relative bg-gradient-to-br from-blue-50/60 to-white border border-gray-100 p-6 sm:p-10 lg:p-14 shadow-lg shadow-blue-500/5">
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-[#d4af37]/30" />
            <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-[#d4af37]/30" />
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-[#d4af37]/30" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-[#d4af37]/30" />

            <div className="grid lg:grid-cols-2 gap-10 items-center">
              {/* Vehicle Image */}
              <div className="relative group">
                <div className="absolute inset-0 bg-[#0a7bb3]/5 blur-[60px] rounded-full group-hover:bg-[#0a7bb3]/10 transition-all duration-700" />
                <img
                  src={vehicles[activeSlide].image}
                  alt={vehicles[activeSlide].name}
                  className="relative w-full max-w-lg mx-auto drop-shadow-xl transition-all duration-700 hover:scale-105"
                />
                {/* Category Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-[#0a7bb3] to-[#0c87bf] text-white text-[10px] font-bold tracking-wider uppercase shadow-lg shadow-[#0a7bb3]/20">
                  {vehicles[activeSlide].category}
                </div>
                {/* Year Badge */}
                <div className="absolute top-4 right-4 px-3 py-1 border border-[#d4af37]/30 text-[#d4af37] text-[10px] font-bold tracking-wider bg-white/80 backdrop-blur-sm">
                  {vehicles[activeSlide].year}
                </div>
              </div>

              {/* Vehicle Info */}
              <div className="space-y-6">
                <div>
                  <p className="text-[#d4af37] text-xs font-bold tracking-[0.15em] uppercase mb-2">
                    {vehicles[activeSlide].year} Model
                  </p>
                  <h3 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">
                    {vehicles[activeSlide].name}
                  </h3>
                  <p className="text-2xl font-bold bg-gradient-to-r from-[#0a7bb3] to-[#d4af37] bg-clip-text text-transparent">
                    {vehicles[activeSlide].price}
                  </p>
                </div>

                {/* Quick Specs */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { icon: Gauge, label: "Power", value: vehicles[activeSlide].power },
                    { icon: Car, label: "Engine", value: vehicles[activeSlide].engine },
                    { icon: Gauge, label: "0-100", value: vehicles[activeSlide].speed },
                  ].map((spec, i) => (
                    <div key={i} className="bg-blue-50/60 border border-blue-100 p-3 text-center rounded-lg">
                      <spec.icon className="h-5 w-5 text-[#0a7bb3] mx-auto mb-1.5" />
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider">{spec.label}</p>
                      <p className="text-xs font-bold text-gray-800 mt-0.5">{spec.value}</p>
                    </div>
                  ))}
                </div>

                {/* Features */}
                <div className="space-y-2">
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-bold">Key Features</p>
                  <div className="grid grid-cols-2 gap-2">
                    {vehicles[activeSlide].features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#d4af37] shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3 pt-2">
                  <button className="px-6 py-2.5 bg-gradient-to-r from-[#0a7bb3] to-[#0c87bf] text-white text-xs font-bold tracking-wider uppercase hover:from-[#0c87bf] hover:to-[#0ea5e9] transition-all shadow-lg shadow-[#0a7bb3]/20 rounded-lg">
                    Enquire Now
                  </button>
                  <button className="px-6 py-2.5 border border-[#d4af37]/30 text-[#d4af37] text-xs font-bold tracking-wider uppercase hover:bg-[#d4af37]/5 transition-all rounded-lg">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle Grid */}
      <section className="py-20 sm:py-28 bg-gray-50/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[#d4af37] text-xs font-bold tracking-[0.2em] uppercase mb-2">Browse</p>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
              Full{" "}
              <span className="bg-gradient-to-r from-[#0a7bb3] to-[#d4af37] bg-clip-text text-transparent">
                Inventory
              </span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {vehicles.map((vehicle, i) => (
              <div
                key={vehicle.id}
                className="group bg-white border border-gray-100 hover:border-[#d4af37]/30 hover:shadow-xl hover:shadow-[#0a7bb3]/5 transition-all duration-500 overflow-hidden rounded-xl"
                style={{ animation: `fadeInUp 0.6s ease-out ${0.1 * i}s both` }}
              >
                {/* Image */}
                <div className="relative h-52 bg-gradient-to-b from-blue-50/60 to-white overflow-hidden">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-0.5 bg-gradient-to-r from-[#0a7bb3] to-[#0c87bf] text-white text-[10px] font-bold tracking-wider uppercase rounded-md shadow-md">
                    {vehicle.category}
                  </div>
                  <div className="absolute top-3 right-3 px-2.5 py-0.5 bg-white/90 backdrop-blur-sm border border-[#d4af37]/20 text-[#d4af37] text-[10px] font-bold rounded-md">
                    {vehicle.year}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-[#0a7bb3] transition-colors">
                    {vehicle.name}
                  </h3>
                  <p className="font-bold text-lg mb-4 bg-gradient-to-r from-[#0a7bb3] to-[#d4af37] bg-clip-text text-transparent">
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
                    <button className="flex-1 py-2 bg-[#0a7bb3]/10 border border-[#0a7bb3]/20 text-[#0a7bb3] text-[11px] font-bold tracking-wider uppercase hover:bg-[#0a7bb3] hover:text-white transition-all rounded-lg">
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
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 sm:py-28 relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[#d4af37] text-xs font-bold tracking-[0.2em] uppercase mb-2">Why Choose Us</p>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
              The{" "}
              <span className="bg-gradient-to-r from-[#0a7bb3] to-[#d4af37] bg-clip-text text-transparent">
                Anu
              </span>{" "}
              Difference
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((feature, i) => (
              <div
                key={i}
                className="group p-6 bg-white border border-gray-100 hover:border-[#d4af37]/30 hover:shadow-xl hover:shadow-[#0a7bb3]/5 transition-all duration-500 text-center rounded-xl"
                style={{ animation: `fadeInUp 0.6s ease-out ${0.15 * i}s both` }}
              >
                <div className="w-14 h-14 mx-auto mb-4 border border-blue-100 flex items-center justify-center group-hover:bg-[#0a7bb3]/10 transition-all rounded-xl">
                  <feature.icon className="h-6 w-6 text-[#0a7bb3]" />
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Financing CTA */}
      <section className="py-20 sm:py-28 bg-gradient-to-b from-blue-50/60 to-white" id="financing">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#d4af37] text-xs font-bold tracking-[0.2em] uppercase mb-3">Flexible Options</p>
          <h2 className="text-3xl sm:text-5xl font-black text-gray-900 mb-6">
            Premium{" "}
            <span className="bg-gradient-to-r from-[#0a7bb3] to-[#d4af37] bg-clip-text text-transparent">
              Financing
            </span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto mb-10 leading-relaxed">
            Drive your dream car today with our tailored financing plans. Competitive rates, flexible terms, and a seamless process from approval to delivery.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            {[
              { title: "Low Interest", desc: "Competitive rates from 8% p.a.", color: "from-[#0a7bb3] to-[#0c87bf]" },
              { title: "Quick Approval", desc: "Get approved within 48 hours", color: "from-[#0c87bf] to-[#d4af37]" },
              { title: "Flexible Terms", desc: "12 to 60 month plans available", color: "from-[#d4af37] to-[#d4af37]" },
            ].map((item, i) => (
              <div key={i} className="p-4 border border-gray-100 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className={`h-0.5 w-12 bg-gradient-to-r ${item.color} mx-auto mb-3 rounded-full`} />
                <h4 className="text-sm font-bold text-gray-900 mb-1">{item.title}</h4>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
          <a
            href="#contact"
            className="inline-flex mt-10 px-8 py-3 bg-gradient-to-r from-[#0a7bb3] to-[#0c87bf] text-white text-xs font-bold tracking-wider uppercase hover:from-[#0c87bf] hover:to-[#0ea5e9] transition-all shadow-lg shadow-[#0a7bb3]/20 rounded-full"
          >
            Apply for Financing
          </a>
        </div>
      </section>

      {/* Contact / Test Drive */}
      <section className="py-20 sm:py-28 bg-white" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#d4af37] text-xs font-bold tracking-[0.2em] uppercase mb-3">Get In Touch</p>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-6">
                Book a{" "}
                <span className="bg-gradient-to-r from-[#0a7bb3] to-[#d4af37] bg-clip-text text-transparent">
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
                    <item.icon className="h-4 w-4 text-[#0a7bb3] shrink-0" />
                    {item.text}
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-50/80 border border-gray-100 p-6 sm:p-8 rounded-2xl shadow-sm">
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] text-gray-500 uppercase tracking-wider mb-1.5 font-medium">Full Name</label>
                    <input
                      type="text"
                      placeholder="Your name"
                      className="w-full bg-white border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#0a7bb3]/40 focus:ring-1 focus:ring-[#0a7bb3]/20 outline-none transition-colors rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-gray-500 uppercase tracking-wider mb-1.5 font-medium">Phone</label>
                    <input
                      type="tel"
                      placeholder="+234..."
                      className="w-full bg-white border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#0a7bb3]/40 focus:ring-1 focus:ring-[#0a7bb3]/20 outline-none transition-colors rounded-lg"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] text-gray-500 uppercase tracking-wider mb-1.5 font-medium">Email</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full bg-white border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#0a7bb3]/40 focus:ring-1 focus:ring-[#0a7bb3]/20 outline-none transition-colors rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-gray-500 uppercase tracking-wider mb-1.5 font-medium">Interested Vehicle</label>
                  <select className="w-full bg-white border border-gray-200 px-4 py-2.5 text-sm text-gray-900 focus:border-[#0a7bb3]/40 focus:ring-1 focus:ring-[#0a7bb3]/20 outline-none transition-colors appearance-none rounded-lg">
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
                    className="w-full bg-white border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#0a7bb3]/40 focus:ring-1 focus:ring-[#0a7bb3]/20 outline-none transition-colors resize-none rounded-lg"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-[#0a7bb3] to-[#0c87bf] text-white text-xs font-bold tracking-wider uppercase hover:from-[#0c87bf] hover:to-[#0ea5e9] transition-all shadow-lg shadow-[#0a7bb3]/20 rounded-lg"
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
        @keyframes speedLine {
          0% { transform: translateX(-100%); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateX(200%); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default Vehicles;

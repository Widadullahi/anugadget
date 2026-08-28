import { Link } from "react-router-dom";
import {
  Award,
  BadgeCheck,
  Handshake,
  MapPin,
  Phone,
  ShieldCheck,
  Wrench,
  Clock,
  ArrowRight,
  Headphones,
} from "lucide-react";
import VehiclesFooter from "@/components/VehiclesFooter";

const stats = [
  { value: "Est. 2015", label: "A decade of automotive excellence" },
  { value: "350+", label: "Vehicles Delivered" },
  { value: "200+", label: "Point Inspection" },
  { value: "100%", label: "Verified Provenance" },
];

const values = [
  {
    icon: ShieldCheck,
    title: "Verified Provenance",
    desc: "Every chassis history is meticulously traced and certified by our heritage experts.",
  },
  {
    icon: Award,
    title: "Premium Selection",
    desc: "Only the finest luxury and performance vehicles make our showroom floor.",
  },
  {
    icon: BadgeCheck,
    title: "Full Transparency",
    desc: "Complete service records, accident-free history, and honest pricing on every unit.",
  },
  {
    icon: Wrench,
    title: "Global Service Network",
    desc: "Access to master technicians and a worldwide parts and service network.",
  },
  {
    icon: Handshake,
    title: "White-Glove Delivery",
    desc: "Concierge delivery to your doorstep, anywhere in Nigeria, fully insured.",
  },
  {
    icon: Headphones,
    title: "Lifetime Concierge",
    desc: "Our team remains at your side long after the keys are handed over.",
  },
];

const VehicleAbout = () => {
  return (
    <div className="min-h-screen bg-[#0f1012] text-[#f5f5f0] overflow-x-hidden">
      {/* Top Nav */}
      <nav className="sticky top-0 z-50 bg-[#0f1012] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/vehicles" className="flex items-center gap-2">
            <img src="/whitelogo.png" alt="ANU GADGET" className="h-9 w-auto" />
            <span className="text-sm font-bold tracking-[0.2em] text-[#f5f5f0]">ANU GADGET</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link to="/vehicles" className="text-[11px] uppercase tracking-[0.2em] text-[#f5f5f0]/70 hover:text-[#cfa78a] transition-colors">
              Home
            </Link>
            <Link to="/inventory" className="text-[11px] uppercase tracking-[0.2em] text-[#f5f5f0]/70 hover:text-[#cfa78a] transition-colors">
              Inventory
            </Link>
            <Link to="/vehicles/about" className="text-[11px] uppercase tracking-[0.2em] text-[#cfa78a] transition-colors">
              About Us
            </Link>
            <Link to="/vehicles#contact" className="text-[11px] uppercase tracking-[0.2em] text-[#f5f5f0]/70 hover:text-[#cfa78a] transition-colors">
              Contact
            </Link>
          </div>
          <a
            href="tel:+2348127704308"
            className="hidden sm:flex items-center gap-2 text-[11px] uppercase tracking-wider text-[#cfa78a] border border-[#cfa78a]/40 px-4 py-2 hover:bg-[#cfa78a] hover:text-[#0f1012] transition-all"
          >
            <Phone className="h-3.5 w-3.5" />
            +234 812 770 4308
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative h-[45vh] min-h-[320px] w-full overflow-hidden flex items-center justify-center bg-[#0f1012]">
        <img src="/sectionbackground.png" alt="" className="absolute inset-0 w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1012] via-[#0f1012]/40 to-[#0f1012]/30" />
        <div className="relative z-10 text-center px-6">
          <p className="text-[#cfa78a] text-[10px] sm:text-xs uppercase tracking-[0.35em] font-medium mb-4">
            The House of Premium Automobiles
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-semibold text-[#f5f5f0] leading-tight tracking-tight">
            About Anu
            <span className="text-2xl sm:text-3xl md:text-4xl italic text-[#cfa78a] font-normal tracking-normal block mt-3">
              THE AUTO HOUSE
            </span>
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="relative overflow-hidden border border-white/10">
                <img src="/vehicle.png" alt="Premium vehicle" className="w-full h-[420px] object-cover opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f1012]/70 to-transparent" />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-6 left-6 bg-[#17181b] border border-[#cfa78a]/30 px-6 py-4">
                <p className="text-[#cfa78a] font-serif text-3xl italic font-semibold">Est. 2015</p>
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#f5f5f0]/50 mt-1">Curated Performance</p>
              </div>
            </div>

            <div>
              <p className="text-[#cfa78a] text-[10px] uppercase tracking-[0.35em] font-medium mb-4">Our Story</p>
              <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-[#f5f5f0] leading-tight mb-6">
                Driven by Perfection.{" "}
                <span className="italic text-[#cfa78a]">Curated for the elite.</span>
              </h2>
              <p className="text-[#f5f5f0]/70 leading-relaxed mb-5">
                Anu Gadget began with a simple obsession — the finest automobiles on the planet. From the executive
                comfort of a Mercedes S-Class to the raw ferocity of a Lamborghini, every car in our showroom is
                hand-picked, inspected to a 200-point standard, and fully certified before it ever reaches you.
              </p>
              <p className="text-[#f5f5f0]/70 leading-relaxed mb-8">
                Today we serve Nigeria's most discerning drivers with luxury sedans, classic SUVs, and
                race-bred performance machines — backed by transparent history, flexible financing, and
                white-glove delivery to your door.
              </p>

              {/* Contact line */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-sm text-[#f5f5f0]/70">
                  <MapPin className="h-4 w-4 text-[#cfa78a] shrink-0" />
                  3/9 Olukoleosho Ikeja Mokland Plaza, Lagos
                </div>
                <div className="flex items-center gap-3 text-sm text-[#f5f5f0]/70">
                  <Phone className="h-4 w-4 text-[#cfa78a] shrink-0" />
                  +234 812 770 4308
                </div>
                <div className="flex items-center gap-3 text-sm text-[#f5f5f0]/70">
                  <Clock className="h-4 w-4 text-[#cfa78a] shrink-0" />
                  Mon - Sat: 9:00 AM - 6:00 PM
                </div>
              </div>

              <Link
                to="/inventory"
                className="inline-flex items-center gap-2 px-8 py-3 border border-[#cfa78a]/50 text-[#cfa78a] text-xs uppercase tracking-[0.2em] hover:bg-[#cfa78a] hover:text-[#0f1012] transition-all"
              >
                Explore The Collection
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 border-y border-white/10 bg-[#0d0e10]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-10 text-center">
          {stats.map((s, i) => (
            <div key={i}>
              <p className="font-serif text-3xl sm:text-4xl italic text-[#cfa78a] font-semibold mb-2">{s.value}</p>
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#f5f5f0]/50">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="py-16 sm:py-24 relative">
        <img src="/sectionbackground.png" alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[#cfa78a] text-[10px] uppercase tracking-[0.35em] font-medium mb-4">Why Drivers Trust Us</p>
            <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-[#f5f5f0] leading-tight">
              The Anu{" "}
              <span className="italic text-[#cfa78a]">Promise</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((v) => (
              <div
                key={v.title}
                className="group p-7 bg-[#17181b] border border-white/10 hover:border-[#cfa78a]/50 hover:shadow-xl hover:shadow-black/40 transition-all duration-500"
              >
                <div className="w-12 h-12 mb-5 border border-[#cfa78a]/30 flex items-center justify-center group-hover:bg-[#cfa78a]/10 transition-all">
                  <v.icon className="h-5 w-5 text-[#cfa78a]" />
                </div>
                <h3 className="text-sm font-bold text-[#f5f5f0] mb-2">{v.title}</h3>
                <p className="text-[13px] text-[#f5f5f0]/60 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="relative py-16 sm:py-20 border-t border-white/10">
        <img src="/brightbackground.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#b8860b] text-[10px] uppercase tracking-[0.35em] font-medium mb-4">Begin Your Journey</p>
          <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-[#0f1012] leading-tight mb-6">
            Visit our showroom or book a{" "}
            <span className="italic text-[#d4af37]">private viewing</span>
          </h2>
          <p className="text-white font-semibold text-base sm:text-lg max-w-xl mx-auto mb-9 leading-relaxed">
            Our specialists will help you find the perfect machine. Every chassis history is meticulously traced and
            certified by our heritage experts.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="tel:+2348127704308"
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#d4af37] text-black text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#b8860b] transition-all"
            >
              <Phone className="h-4 w-4" />
              Call The Showroom
            </a>
            <Link
              to="/vehicles#contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#0f1012] border border-[#0f1012]/10 text-xs uppercase tracking-[0.2em] shadow-lg shadow-black/10 hover:bg-[#0f1012] hover:text-white transition-all"
            >
              Book a Test Drive
            </Link>
          </div>
        </div>
      </section>

      <VehiclesFooter />
    </div>
  );
};

export default VehicleAbout;
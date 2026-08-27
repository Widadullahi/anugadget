import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Phone, MapPin } from "lucide-react";
import { useAdminSettings } from "@/hooks/useAdminSettings";
import logo from "@/assets/logo.png";

const VehiclesNavbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const settings = useAdminSettings();

  const navLinks = [
    { label: "Home", href: "/vehicles" },
    { label: "Inventory", href: "/vehicles#inventory" },
    { label: "Financing", href: "/vehicles#financing" },
    { label: "About", href: "/vehicles#about" },
    { label: "Contact", href: "/vehicles#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Bar - Blue gradient */}
      <div className="bg-gradient-to-r from-[#0a6fa8]/10 via-[#0c87bf]/10 to-[#0a6fa8]/10 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-9 text-[11px] sm:text-xs">
          <div className="flex items-center gap-3 sm:gap-5 text-gray-500">
            <span className="flex items-center gap-1">
              <Phone className="h-3 w-3 text-[#0a7bb3]" />
              {settings.phoneNumber}
            </span>
            <span className="hidden sm:inline text-gray-200">|</span>
            <span className="hidden sm:flex items-center gap-1">
              <MapPin className="h-3 w-3 text-[#0a7bb3]" />
              {settings.address}
            </span>
          </div>
          <Link to="/" className="text-gray-500 hover:text-[#d4af37] transition-colors font-medium">
            ← Gadget Store
          </Link>
        </div>
      </div>

      {/* Main Nav - White with blue/gold accents */}
      <nav className="bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 sm:h-18">
          {/* Logo */}
          <Link to="/vehicles" className="flex items-center shrink-0 gap-2 sm:gap-3 group">
            <img
              src={logo}
              alt="Anu Vehicles"
              className="h-10 sm:h-12 lg:h-14 w-auto group-hover:opacity-100 transition-opacity"
            />
            <span className="hidden sm:block text-[#38bdf8] text-sm lg:text-base xl:text-lg font-bold uppercase tracking-[0.4em]">
              ANU VEHICLES
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-xs font-medium text-gray-500 hover:text-[#d4af37] transition-colors tracking-wide uppercase relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-[#0a7bb3] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden sm:inline-flex px-5 py-2 text-xs font-bold tracking-wider uppercase border border-[#0a7bb3]/30 text-[#0a7bb3] hover:bg-[#0a7bb3] hover:text-white transition-all duration-300 rounded-full"
            >
              Book a Test Drive
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden text-gray-600 hover:text-gray-900 p-1"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 top-[calc(36px+64px)] bg-white/95 backdrop-blur-xl z-40">
          <div className="flex flex-col p-6 gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-3 px-4 text-sm font-medium text-gray-600 hover:text-[#d4af37] border-b border-gray-100 transition-colors tracking-wide uppercase"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="mt-4 py-3 text-center text-sm font-bold tracking-wider uppercase border border-[#0a7bb3]/30 text-[#0a7bb3] hover:bg-[#0a7bb3] hover:text-white transition-all rounded-full"
            >
              Book a Test Drive
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default VehiclesNavbar;

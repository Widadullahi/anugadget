import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { useAdminSettings } from "@/hooks/useAdminSettings";
import logo from "/whitelogo.png";

const VehiclesFooter = () => {
  const settings = useAdminSettings();

  return (
    <footer className="bg-[#060a12] text-slate-400">
      {/* Gold Gradient Line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <img src={logo} alt="Anu Vehicles" className="h-10 mb-4" />
            <p className="text-sm leading-relaxed mb-5 text-slate-400">
              Your trusted destination for premium vehicles in Nigeria. Experience luxury, performance, and reliability.
            </p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 border border-white/10 flex items-center justify-center hover:border-[#d4af37]/50 hover:text-[#d4af37] transition-all rounded-lg">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-xs font-bold tracking-[0.15em] uppercase mb-4">Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              {["Home", "Inventory", "Financing", "About Us", "Contact"].map((item) => (
                <li key={item}>
                  <a href={`/vehicles#${item.toLowerCase().replace(" ", "")}`} className="hover:text-[#d4af37] transition-colors">
                    {item}
                  </a>
                </li>
              ))}
              <li>
                <Link to="/" className="hover:text-[#d4af37] transition-colors">Gadget Store</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white text-xs font-bold tracking-[0.15em] uppercase mb-4">Services</h3>
            <ul className="space-y-2.5 text-sm">
              {["Vehicle Sales", "Trade-In", "Financing Options", "Extended Warranty", "After-Sales Support"].map((item) => (
                <li key={item}>
                  <span className="hover:text-[#d4af37] transition-colors cursor-default">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-xs font-bold tracking-[0.15em] uppercase mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-[#d4af37]" />
                <span>{settings.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-[#d4af37]" />
                <span>{settings.phoneNumber}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-[#d4af37]" />
                <span>{settings.contactEmail}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} Anu Vehicles. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-[#d4af37] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#d4af37] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default VehiclesFooter;

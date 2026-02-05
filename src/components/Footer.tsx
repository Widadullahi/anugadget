import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, CreditCard, Shield, Truck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.jpg";

const Footer = () => {
  const categories = [
    { name: "Phones & Tablets", link: "/shop?category=phones" },
    { name: "Computing & IT", link: "/shop?category=laptops" },
    { name: "Wearables", link: "/shop?category=watches" },
    { name: "Audio & Speakers", link: "/shop?category=audio" },
    { name: "Gaming", link: "/shop?category=gaming" },
    { name: "Accessories", link: "/shop?category=accessories" },
  ];

  return (
    <footer className="bg-foreground text-background">
      {/* Newsletter Section */}
      <div className="bg-primary py-6">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-primary-foreground text-center md:text-left">
              <h3 className="font-bold text-lg">Subscribe to our Newsletter</h3>
              <p className="text-sm text-primary-foreground/80">Get updates on new products and exclusive deals</p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-primary-foreground text-foreground border-0 rounded-full w-full md:w-72"
              />
              <Button className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-6">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Banner */}
      <div className="bg-foreground/95 py-6 border-b border-background/10">
        <div className="container px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <Truck className="h-8 w-8 text-primary" />
              <div>
                <h4 className="font-bold text-sm">Fast Delivery</h4>
                <p className="text-xs text-background/60">Same day in Lagos</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <h4 className="font-bold text-sm">100% Authentic</h4>
                <p className="text-xs text-background/60">Genuine products</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <CreditCard className="h-8 w-8 text-primary" />
              <div>
                <h4 className="font-bold text-sm">Secure Payment</h4>
                <p className="text-xs text-background/60">Multiple options</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Phone className="h-8 w-8 text-primary" />
              <div>
                <h4 className="font-bold text-sm">24/7 Support</h4>
                <p className="text-xs text-background/60">Always available</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-10 px-4">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {/* About */}
            <div className="col-span-2 md:col-span-1">
              <img src={logo} alt="Anu Gadget" className="h-12 mb-4 bg-background rounded p-1" />
              <p className="text-background/60 text-sm mb-4 leading-relaxed">
                Your trusted destination for premium electronics and gadgets in Nigeria. 100% authentic products guaranteed.
              </p>
              <div className="flex gap-2">
                <a href="#" className="w-9 h-9 bg-background/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                  <Facebook className="h-4 w-4" />
                </a>
                <a href="#" className="w-9 h-9 bg-background/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                  <Instagram className="h-4 w-4" />
                </a>
                <a href="#" className="w-9 h-9 bg-background/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                  <Twitter className="h-4 w-4" />
                </a>
                <a href="#" className="w-9 h-9 bg-background/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                  <Youtube className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Categories */}
            <div>
              <h3 className="font-bold text-sm mb-4 uppercase tracking-wide">Categories</h3>
              <ul className="space-y-2 text-sm text-background/60">
                {categories.map((category) => (
                  <li key={category.name}>
                    <Link to={category.link} className="hover:text-primary transition-colors">
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-sm mb-4 uppercase tracking-wide">Quick Links</h3>
              <ul className="space-y-2 text-sm text-background/60">
                <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
                <li><Link to="/shop" className="hover:text-primary transition-colors">Shop</Link></li>
                <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                <li><Link to="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
                <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h3 className="font-bold text-sm mb-4 uppercase tracking-wide">Customer Service</h3>
              <ul className="space-y-2 text-sm text-background/60">
                <li><Link to="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
                <li><Link to="/shipping" className="hover:text-primary transition-colors">Shipping Info</Link></li>
                <li><Link to="/returns" className="hover:text-primary transition-colors">Returns Policy</Link></li>
                <li><Link to="/warranty" className="hover:text-primary transition-colors">Warranty</Link></li>
                <li><Link to="/track-order" className="hover:text-primary transition-colors">Track Order</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-bold text-sm mb-4 uppercase tracking-wide">Contact Us</h3>
              <ul className="space-y-3 text-sm text-background/60">
                <li className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                  <span>3/9 Olukoleosho Ikeja Mokland Plaza</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 shrink-0 text-primary" />
                  <span>+234 812 770 4308</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 shrink-0 text-primary" />
                  <span>Gbadamosia21@gmail.com</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10 py-4 px-4">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-background/50">
          <p>&copy; {new Date().getFullYear()} Anu Gadget. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link to="/cookies" className="hover:text-primary transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

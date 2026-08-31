import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ShieldCheck,
  Star,
  Phone,
  Menu,
  X,
  Lock,
  CheckCircle,
  Headphones,
  ChevronRight,
} from "lucide-react";

import { useAdminSettings } from "@/hooks/useAdminSettings";

import carImage from "/car.png";
import bgImage from "/vehiclebackground.png";
import logo from "/whitelogo.png";

import "./VehicleHero.css";

const VehicleHero = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const settings = useAdminSettings();

  const closeMenu = () => setMenuOpen(false);

  return (
    <section className="vehicle-hero">
      {/* Background Image */}
      <div className="hero-bg">
        <img src={bgImage} alt="" className="hero-bg-img" />
        <div className="hero-bg-overlay" />
      </div>

      {/* Background Elements */}
      <div className="hero-gradient" />
      <div className="hero-grid" />
      <div className="hero-light light-one" />
      <div className="hero-light light-two" />

      {/* Navigation */}
      <nav className="vehicle-navbar">
        <div className="logo">
          <img src={logo} alt="AG Logo" className="logo-img" />
          <span className="logo-text">{settings.vehicleBrandName}</span>
        </div>

        <div className="nav-links">
          <a href="#home">Home</a>
          <Link to="/inventory">Inventory</Link>
          <Link to="/vehicles/about">About Us</Link>
          <a href="#financing">Services</a>
        </div>

        <a href="#contact" className="nav-contact">
          <Phone size={16} />
          Contact Us
        </a>

        <button className="mobile-menu" onClick={() => setMenuOpen((o) => !o)} aria-label="Toggle menu">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-dropdown">
          <p className="mobile-dropdown-label">Menu</p>
          <div className="mobile-dropdown-links">
            <a href="#home" onClick={closeMenu}>
              <span className="mobile-link-left">
                <span className="mobile-link-num">01</span>
                Home
              </span>
              <ChevronRight className="mobile-link-arrow" size={16} />
            </a>
            <Link to="/inventory" onClick={closeMenu}>
              <span className="mobile-link-left">
                <span className="mobile-link-num">02</span>
                Inventory
              </span>
              <ChevronRight className="mobile-link-arrow" size={16} />
            </Link>
            <Link to="/vehicles/about" onClick={closeMenu}>
              <span className="mobile-link-left">
                <span className="mobile-link-num">03</span>
                About Us
              </span>
              <ChevronRight className="mobile-link-arrow" size={16} />
            </Link>
            <a href="#financing" onClick={closeMenu}>
              <span className="mobile-link-left">
                <span className="mobile-link-num">04</span>
                Services
              </span>
              <ChevronRight className="mobile-link-arrow" size={16} />
            </a>
          </div>
          <a href="#contact" onClick={closeMenu} className="mobile-dropdown-cta">
            <Phone size={15} />
            Contact Us
          </a>
        </div>
      )}

      {/* Main Hero */}
      <div className="hero-container">
        {/* LEFT CONTENT */}
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="hero-tag"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Star size={15} />
            <span>PREMIUM VEHICLE COLLECTION</span>
          </motion.div>

          <h1>
            Drive Something
            <span> Exceptional.</span>
          </h1>

          <p>
            Discover a carefully selected collection of premium
            vehicles built for performance, comfort, and prestige.
          </p>

          <div className="hero-buttons">
            <motion.a
              href="#inventory"
              className="primary-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
            >
              Explore Vehicles
              <ArrowRight size={20} />
            </motion.a>

            <motion.a
              href="#contact"
              className="secondary-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
            >
              <Phone size={18} />
              Contact Us
            </motion.a>
          </div>

          {/* TRUST ITEMS */}
          <div className="trust-section">
            <div className="trust-item">
              <div className="trust-icon">
                <ShieldCheck size={22} />
              </div>
              <div>
                <h4>Verified Vehicles</h4>
                <p>Quality you can trust</p>
              </div>
            </div>

            <div className="trust-item">
              <div className="trust-icon">
                <Star size={22} />
              </div>
              <div>
                <h4>Premium Selection</h4>
                <p>Top brands &amp; carefully chosen</p>
              </div>
            </div>

            <div className="trust-item">
              <div className="trust-icon">
                <Headphones size={22} />
              </div>
              <div>
                <h4>Expert Support</h4>
                <p>We're here for you every step</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT VISUAL */}
        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        >
          {/* Blue Glow Behind Car */}
          <div className="car-glow" />

          {/* Shield HUD overlay */}
          <div className="hud-shield">
            <svg viewBox="0 0 200 220" className="shield-svg">
              <path
                d="M100 5 L190 50 L190 120 Q190 180 100 215 Q10 180 10 120 L10 50 Z"
                fill="none"
                stroke="rgba(213,174,82,0.25)"
                strokeWidth="1.5"
              />
              <path
                d="M100 15 L182 55 L182 120 Q182 174 100 207 Q18 174 18 120 L18 55 Z"
                fill="rgba(213,174,82,0.06)"
                stroke="rgba(213,174,82,0.15)"
                strokeWidth="1"
              />
            </svg>
            <div className="hud-icon hud-icon-1">
              <ShieldCheck size={16} />
              <span>Safety<br />First</span>
            </div>
            <div className="hud-icon hud-icon-2">
              <Lock size={16} />
              <span>Secure<br />Journeys</span>
            </div>
            <div className="hud-icon hud-icon-3">
              <CheckCircle size={16} />
              <span>Performance<br />Assured</span>
            </div>
            <div className="hud-icon hud-icon-4">
              <Lock size={16} />
              <span>Advanced<br />Security</span>
            </div>
            <div className="hud-ring" />
          </div>

          {/* CAR IMAGE */}
          <motion.img
            src={carImage}
            alt="Premium luxury vehicle"
            className="hero-car"
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
          />

          {/* FLOATING INFO CARD */}
          <motion.div
            className="car-info-card"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="info-number">01</span>
            <div className="card-divider" />
            <div>
              <h4>Luxury Redefined</h4>
              <p>Performance. Comfort. Prestige.</p>
            </div>
          </motion.div>

          {/* Decorative Line */}
          <div className="car-line" />
        </motion.div>
      </div>

      {/* Bottom Stats */}
      <motion.div
        className="hero-bottom"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.7 }}
      >
        <div>
          <span>01</span>
          <p>Premium Quality</p>
        </div>
        <div>
          <span>02</span>
          <p>Verified Vehicles</p>
        </div>
        <div>
          <span>03</span>
          <p>Trusted Service</p>
        </div>
      </motion.div>
    </section>
  );
};

export default VehicleHero;

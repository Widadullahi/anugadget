import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowRight, ShoppingCart, Heart, Eye, Smartphone, Laptop, Watch, Headphones, Tv, Gamepad2, Battery, Home as HomeIcon, Wifi, ChevronLeft, ChevronRight as ChevronRightIcon } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroBanner from "@/assets/hero-banner.jpg";
import iphone15ProMax from "@/assets/iphone-15-pro-max.jpg";
import macbookProM3 from "@/assets/macbook-pro-m3.jpg";
import appleWatchUltra2 from "@/assets/apple-watch-ultra-2.jpg";
import airpodsPro2 from "@/assets/airpods-pro-2.jpg";
import { useProducts } from "@/hooks/useProducts";
import { useAdminSettings } from "@/hooks/useAdminSettings";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const heroSlides = [
    {
      id: 1,
      subtitle: "Shop Limited time offers",
      title: "Shop limited-time offers made just for you.",
      buttonText: "Shop Now!",
      buttonLink: "/shop",
      image: heroBanner,
      gradient: "from-primary via-primary/90 to-foreground/80"
    },
    {
      id: 2,
      subtitle: "New Arrivals",
      title: "iPhone 15 Pro Max - Titanium Design, Pro Camera",
      buttonText: "Buy Now",
      buttonLink: "/product/1",
      image: iphone15ProMax,
      gradient: "from-foreground via-foreground/90 to-primary/60"
    },
    {
      id: 3,
      subtitle: "Power Up Your Productivity",
      title: "MacBook Pro M3 - Supercharged Performance",
      buttonText: "Explore",
      buttonLink: "/product/2",
      image: macbookProM3,
      gradient: "from-primary/80 via-primary to-foreground/70"
    },
    {
      id: 4,
      subtitle: "Wearables Collection",
      title: "Apple Watch Ultra 2 - Adventure Awaits",
      buttonText: "Discover",
      buttonLink: "/product/3",
      image: appleWatchUltra2,
      gradient: "from-foreground/90 via-primary/70 to-primary"
    }
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, [heroSlides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, [heroSlides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-rotate carousel
  useEffect(() => {
    const autoRotate = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(autoRotate);
  }, [nextSlide]);

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 7);

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      setCountdown({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const categories = [
    { name: "Phones & Tablets", icon: Smartphone, link: "/shop?category=phones" },
    { name: "Computing & IT", icon: Laptop, link: "/shop?category=laptops" },
    { name: "Wearables", icon: Watch, link: "/shop?category=watches" },
    { name: "Audio & Speakers", icon: Headphones, link: "/shop?category=audio" },
    { name: "Appliances", icon: Tv, link: "/shop?category=appliances" },
    { name: "Gaming", icon: Gamepad2, link: "/shop?category=gaming" },
    { name: "Power Solutions", icon: Battery, link: "/shop?category=power" },
    { name: "Smart Home", icon: HomeIcon, link: "/shop?category=smart-home" },
    { name: "Accessories", icon: Wifi, link: "/shop?category=accessories" },
  ];

  const settings = useAdminSettings();
  const { products } = useProducts();
  const megaDeals = products.filter(p => p.original_price && p.original_price > p.price);
  const megaDealIds = new Set(megaDeals.map(p => p.id));
  const topSellingProducts = products.filter(p => !megaDealIds.has(p.id));

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const ProductCard = ({ product }: { product: typeof products[number] }) => {
    const discount = product.original_price && product.original_price > product.price
      ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
      : null;
    const image = product.image_url || "/placeholder.svg";

    return (
      <Card className="group border border-border hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 bg-background overflow-hidden rounded-lg">
        <CardContent className="p-2.5 sm:p-3 lg:p-3.5">
          {/* Product Image */}
          <div className="relative aspect-[4/5] sm:aspect-square mb-2 sm:mb-3 bg-muted rounded-md overflow-hidden">
            <Link to={`/product/${product.id}`}>
              <img
                src={image}
                alt={product.name}
                className="w-full h-full object-contain p-1.5 sm:p-2 group-hover:scale-110 transition-transform duration-500"
              />
            </Link>
            {discount && (
              <Badge className="absolute top-1.5 sm:top-2 left-1.5 sm:left-2 bg-primary text-primary-foreground text-[10px] sm:text-xs font-bold rounded-full px-1.5 sm:px-2 py-0.5">
                -{discount}%
              </Badge>
            )}
          </div>

          {/* Product Name */}
          <Link to={`/product/${product.id}`}>
            <h3 className="text-[11px] sm:text-xs lg:text-sm font-semibold mb-1.5 line-clamp-2 min-h-[32px] sm:min-h-[40px] hover:text-primary transition-colors">
              {product.name}
            </h3>
          </Link>

          {/* Price */}
          <div className="space-y-0.5 sm:space-y-1 mb-2 sm:mb-3">
            <p className="text-sm sm:text-base lg:text-lg font-black text-foreground leading-tight">{formatPrice(product.price)}</p>
            {product.original_price && (
              <p className="text-[10px] sm:text-xs text-muted-foreground line-through">
                {formatPrice(product.original_price)}
              </p>
            )}
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs pt-1 sm:pt-2 border-t border-border/60">
            <Link to={`/product/${product.id}`} className="text-primary hover:underline flex items-center gap-1 font-medium">
              <Eye className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> View
            </Link>
            <button className="text-muted-foreground hover:text-primary flex items-center gap-1 ml-auto transition-colors">
              <Heart className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            </button>
            <button className="text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors">
              <ShoppingCart className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            </button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background w-full">
      <Navbar />

<<<<<<< HEAD
      {/* Hero Banner Carousel */}
      <section className="relative overflow-hidden w-full">
        <div className="relative w-full">
          {/* Slides */}
          <div className="relative min-h-[340px] sm:min-h-[400px] lg:min-h-[460px] xl:min-h-[500px] 2xl:min-h-[540px]">
            {heroSlides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-all duration-700 ease-in-out w-full ${
                  index === currentSlide
                    ? 'opacity-100 translate-x-0 z-10'
                    : index < currentSlide
                      ? 'opacity-0 -translate-x-full z-0'
                      : 'opacity-0 translate-x-full z-0'
                }`}
              >
                <div className={`h-full w-full bg-gradient-to-r ${slide.gradient}`}>
                  <div className="container h-full w-full">
                    <div className="grid md:grid-cols-5 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center h-full py-8 sm:py-12 lg:py-16">
                      <div className={`md:col-span-3 space-y-4 sm:space-y-6 text-primary-foreground ${index === currentSlide ? 'animate-fade-in' : ''}`}>
                        <p className="text-primary-foreground/80 font-medium uppercase tracking-wider text-[11px] sm:text-xs lg:text-sm">
                          {slide.subtitle}
                        </p>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black leading-[1.1] tracking-tight">
                          {slide.title}
                        </h1>
                        <Button
                          size="lg"
                          asChild
                          className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-full px-6 sm:px-8 lg:px-10 font-bold h-10 sm:h-11 lg:h-12 text-sm lg:text-base shadow-lg shadow-primary/20"
                        >
                          <Link to={slide.buttonLink}>
                            {slide.buttonText}
                          </Link>
                        </Button>
                      </div>
                      <div className={`md:col-span-2 relative hidden md:flex justify-center lg:justify-end ${index === currentSlide ? 'animate-scale-in' : ''}`}>
                        <img
                          src={slide.image}
                          alt={slide.title}
                          className="w-full max-w-[360px] lg:max-w-[420px] xl:max-w-[480px] 2xl:max-w-[520px] h-auto object-contain drop-shadow-2xl rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-2 sm:left-4 lg:left-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full bg-background/20 backdrop-blur-md border border-primary-foreground/30 flex items-center justify-center text-primary-foreground hover:bg-background/40 hover:scale-105 transition-all shadow-lg"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 sm:right-4 lg:right-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full bg-background/20 backdrop-blur-md border border-primary-foreground/30 flex items-center justify-center text-primary-foreground hover:bg-background/40 hover:scale-105 transition-all shadow-lg"
            aria-label="Next slide"
          >
            <ChevronRightIcon className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
          </button>

          {/* Carousel Dots */}
          <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'w-8 bg-primary-foreground'
                    : 'w-2 bg-primary-foreground/50 hover:bg-primary-foreground/70'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
=======
      {/* Luxury Hero with Animated Choices */}
      <section className="relative w-full overflow-hidden">
        {/* Luxurious Gold Background with shimmer */}
        <div className="fixed inset-0 bg-gradient-to-br from-[#b8860b] via-[#D4AF37] to-[#f0d060]" />
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.25),transparent_60%),radial-gradient(ellipse_at_bottom_left,rgba(139,90,0,0.3),transparent_60%)]" />
        <style>{`
          @keyframes goldShimmer {
            0%, 100% { background-position: 0% 50% }
            50% { background-position: 100% 50% }
          }
          @keyframes slideInLeft {
            0% { transform: translateX(-110%) scale(0.9); opacity: 0 }
            60% { transform: translateX(3%) scale(1.02); opacity: 1 }
            100% { transform: translateX(0) scale(1); opacity: 1 }
          }
          @keyframes slideInRight {
            0% { transform: translateX(110%) scale(0.9); opacity: 0 }
            60% { transform: translateX(-3%) scale(1.02); opacity: 1 }
            100% { transform: translateX(0) scale(1); opacity: 1 }
          }
          @keyframes fadeInDown {
            0% { transform: translateY(-30px); opacity: 0 }
            100% { transform: translateY(0); opacity: 1 }
          }
          @keyframes pulseGlow {
            0%, 100% { box-shadow: 0 0 30px rgba(255,255,255,0.15), 0 20px 60px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2) }
            50% { box-shadow: 0 0 50px rgba(255,255,255,0.25), 0 20px 60px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.3) }
          }
          .luxury-question {
            animation: fadeInDown 900ms cubic-bezier(.2,.8,.3,1) both;
            text-shadow: 0 2px 20px rgba(0,0,0,0.15);
          }
          .luxury-card {
            width: 100%;
            max-width: 440px;
            height: 380px;
            border-radius: 20px;
            background: linear-gradient(145deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04));
            backdrop-filter: blur(16px) saturate(1.4);
            border: 1px solid rgba(255,255,255,0.25);
            box-shadow: 0 0 30px rgba(255,255,255,0.15), 0 20px 60px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2);
            display: flex;
            flex-direction: column;
            padding: 32px;
            transition: all 0.4s cubic-bezier(.2,.9,.2,1);
          }
          .luxury-card:hover {
            transform: translateY(-8px) scale(1.02);
            box-shadow: 0 0 50px rgba(255,255,255,0.3), 0 30px 80px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.4);
            border-color: rgba(255,255,255,0.45);
          }
          .luxury-card:hover .card-overlay {
            opacity: 0.3;
          }
          .luxury-card:hover .card-cta {
            transform: translateY(0);
            opacity: 1;
          }
          .card-overlay {
            transition: opacity 0.4s ease;
          }
          .card-cta {
            transform: translateY(10px);
            opacity: 0;
            transition: all 0.35s cubic-bezier(.2,.9,.2,1);
          }
          .scene-3d {
            width: 100%;
            height: 180px;
            border-radius: 12px;
            background: linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02));
            transform-style: preserve-3d;
            perspective: 1200px;
          }
        `}</style>

        <div className="relative min-h-screen flex flex-col items-center justify-center">
          {/* Bold Question */}
          <div className="text-center w-full z-20 mb-12 px-6 luxury-question">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
              Which of our<br />
              <span className="bg-gradient-to-r from-white via-[#fff8dc] to-white bg-clip-text text-transparent">
                will you like to explore today?
              </span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-white/70 font-medium">Choose your experience below</p>
          </div>

          {/* Sliding Cards */}
          <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-center z-20 px-6">
            {/* Gadgets Box - slides from left */}
            <div onClick={() => window.location.assign('/cars/gadgets')} className="luxury-card cursor-pointer relative overflow-hidden group" style={{ animation: 'slideInLeft 800ms cubic-bezier(.2,.9,.2,1) 200ms both' }}>
              <img src={iphone15ProMax} alt="gadget" className="card-overlay absolute inset-0 w-full h-full object-cover opacity-15" />
              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-white/20 text-white rounded-full mb-3">Phones & Electronics</span>
                  <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-2 drop-shadow-lg">Gadgets</h2>
                  <p className="text-sm text-white/80 leading-relaxed">Explore latest phones, wearables and premium electronics.</p>
                </div>
                <div className="scene-3d flex items-center justify-center flex-1">
                  <div className="w-full h-full"><ThreeGadgetScene /></div>
                </div>
                <div className="card-cta mt-4 flex items-center gap-2 text-white font-bold text-sm">
                  <span>Explore Gadgets</span>
                  <span className="text-lg">→</span>
                </div>
              </div>
            </div>

            {/* Vehicles Box - slides from right */}
            <div onClick={() => window.location.assign('/cars/vehicles')} className="luxury-card cursor-pointer relative overflow-hidden group" style={{ animation: 'slideInRight 800ms cubic-bezier(.2,.9,.2,1) 350ms both' }}>
              <img src={heroBanner} alt="vehicle" className="card-overlay absolute inset-0 w-full h-full object-cover opacity-15" />
              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-white/20 text-white rounded-full mb-3">Premium Vehicles</span>
                  <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-2 drop-shadow-lg">Vehicles</h2>
                  <p className="text-sm text-white/80 leading-relaxed">Discover premium vehicles with cinematic visuals.</p>
                </div>
                <div className="scene-3d flex items-center justify-center flex-1">
                  <div className="w-full h-full"><ThreeVehicleScene /></div>
                </div>
                <div className="card-cta mt-4 flex items-center gap-2 text-white font-bold text-sm">
                  <span>Explore Vehicles</span>
                  <span className="text-lg">→</span>
                </div>
              </div>
            </div>
>>>>>>> 7fc45bb (edited)
          </div>
        </div>
      </section>

      {/* Corporate Banner */}
      <section className="bg-muted py-2 sm:py-3 border-b border-border w-full">
        <div className="container w-full">
          <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2 text-center text-[11px] sm:text-xs lg:text-sm">
            <span className="text-muted-foreground">Special offers on bulk and corporate</span>
            <span className="font-bold text-primary">{settings ? settings.storeName : 'Anu Gadget'}</span>
            <span className="text-muted-foreground">sales</span>
            <Button variant="outline" size="sm" className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground ml-1 sm:ml-2 h-6 sm:h-7 text-[10px] sm:text-xs">
              Shop Now!
            </Button>
          </div>
        </div>
      </section>

      {/* Mega Deals Section - Slot Style */}
      <section className="py-5 sm:py-7 lg:py-10 bg-background w-full">
        <div className="container w-full">
          <div className="grid lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {/* Left Side - Mega Deal Banner */}
            <div className="bg-gradient-to-br from-primary to-primary/80 rounded-xl p-5 sm:p-6 lg:p-8 text-primary-foreground flex flex-col justify-center shadow-md lg:col-span-1 xl:col-span-1 min-h-[220px] lg:min-h-0">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-1 sm:mb-2">January Mega Deals</h2>
              <p className="text-xs sm:text-sm mb-2 sm:mb-4 text-primary-foreground/80">Up to:</p>
              <p className="text-5xl sm:text-6xl lg:text-7xl font-black mb-2 sm:mb-4 leading-none">37%</p>
              <p className="text-xs sm:text-sm mb-3 sm:mb-5 text-primary-foreground/80">Hurry Up! Offer ends in:</p>

              {/* Countdown Timer */}
              <div className="grid grid-cols-4 gap-1.5 sm:gap-2 text-center">
                <div className="bg-primary-foreground/15 rounded-lg p-1.5 sm:p-2 backdrop-blur-sm">
                  <p className="text-xl sm:text-2xl font-bold leading-none">{String(countdown.days).padStart(2, '0')}</p>
                  <p className="text-[10px] sm:text-xs uppercase mt-0.5 text-primary-foreground/70">Days</p>
                </div>
                <div className="bg-primary-foreground/15 rounded-lg p-1.5 sm:p-2 backdrop-blur-sm">
                  <p className="text-xl sm:text-2xl font-bold leading-none">{String(countdown.hours).padStart(2, '0')}</p>
                  <p className="text-[10px] sm:text-xs uppercase mt-0.5 text-primary-foreground/70">Hours</p>
                </div>
                <div className="bg-primary-foreground/15 rounded-lg p-1.5 sm:p-2 backdrop-blur-sm">
                  <p className="text-xl sm:text-2xl font-bold leading-none">{String(countdown.minutes).padStart(2, '0')}</p>
                  <p className="text-[10px] sm:text-xs uppercase mt-0.5 text-primary-foreground/70">Mins</p>
                </div>
                <div className="bg-primary-foreground/15 rounded-lg p-1.5 sm:p-2 backdrop-blur-sm">
                  <p className="text-xl sm:text-2xl font-bold leading-none">{String(countdown.seconds).padStart(2, '0')}</p>
                  <p className="text-[10px] sm:text-xs uppercase mt-0.5 text-primary-foreground/70">Secs</p>
                </div>
              </div>
            </div>

            {/* Right Side - Products Grid */}
            <div className="lg:col-span-3 xl:col-span-4">
              <div className="flex items-center justify-between mb-3 sm:mb-5">
                <div className="flex items-center gap-3 sm:gap-4">
                  <h3 className="font-bold text-base sm:text-lg lg:text-xl">Mega Deals</h3>
                  <span className="h-1 w-16 sm:w-20 bg-primary rounded-full"></span>
                </div>
                <Link to="/shop" className="text-primary hover:underline text-xs sm:text-sm flex items-center gap-1 font-medium">
                  View All <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </Link>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-4">
                {megaDeals.slice(0, 8).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-6 sm:py-8 lg:py-10 bg-muted/40 border-y border-border w-full">
        <div className="container w-full">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 lg:mb-8 text-center">Shop by Category</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-9 gap-3 sm:gap-4 lg:gap-5">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.link}
                className="flex flex-col items-center gap-2 group"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-2xl bg-background border-2 border-border group-hover:border-primary group-hover:shadow-lg group-hover:-translate-y-0.5 flex items-center justify-center transition-all duration-300">
                  <category.icon className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-primary" />
                </div>
                <span className="text-[10px] sm:text-xs lg:text-[13px] font-semibold text-center text-foreground group-hover:text-primary transition-colors leading-tight">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Top Selling Products */}
      <section className="py-6 sm:py-8 lg:py-10 bg-background w-full">
        <div className="container w-full">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <h2 className="text-base sm:text-lg lg:text-xl font-bold">Top Selling Products</h2>
              <span className="h-1 w-16 sm:w-20 bg-primary rounded-full hidden sm:block"></span>
            </div>
            <Link to="/shop">
              <Button variant="outline" className="rounded-full text-xs sm:text-sm h-8 sm:h-9 px-3 sm:px-4">
                View All <ArrowRight className="ml-1.5 h-3.5 w-3.5 sm:ml-2 sm:h-4 sm:w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-3 sm:gap-4">
            {topSellingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Phones & Tablets Section */}
      <section className="py-6 sm:py-8 lg:py-10 bg-muted/30 w-full">
        <div className="container w-full">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <h2 className="text-base sm:text-lg lg:text-xl font-bold">Phones & Tablets</h2>
              <span className="h-1 w-16 sm:w-20 bg-primary rounded-full hidden sm:block"></span>
            </div>
            <Link to="/shop?category=phones" className="text-primary hover:underline text-xs sm:text-sm flex items-center gap-1 font-medium">
              See All <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-3 sm:gap-4">
            {megaDeals.slice(0, 8).map((product) => (
              <ProductCard key={`phone-${product.id}`} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Computing Section */}
      <section className="py-6 sm:py-8 lg:py-10 bg-background w-full">
        <div className="container w-full">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <h2 className="text-base sm:text-lg lg:text-xl font-bold">Computing & IT Solutions</h2>
              <span className="h-1 w-16 sm:w-20 bg-primary rounded-full hidden sm:block"></span>
            </div>
            <Link to="/shop?category=laptops" className="text-primary hover:underline text-xs sm:text-sm flex items-center gap-1 font-medium">
              See All <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-3 sm:gap-4">
            {topSellingProducts.slice(0, 8).map((product) => (
              <ProductCard key={`laptop-${product.id}`} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="py-5 sm:py-7 lg:py-8 w-full">
        <div className="container w-full">
          <div className="bg-gradient-to-r from-primary via-primary to-primary/80 rounded-2xl p-6 sm:p-8 lg:p-12 text-primary-foreground text-center shadow-xl">
            <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-black mb-2 sm:mb-3">Power Deals</h2>
            <p className="text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 text-primary-foreground/90">Never Go Dark Again | Power Stations Promo Up to 40% Discount</p>
            <Button asChild className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-full px-6 sm:px-8 lg:px-10 h-10 sm:h-11 lg:h-12 font-bold shadow-lg shadow-black/20">
              <Link to="/shop?category=power">Hurry Now!</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-6 sm:py-8 lg:py-10 border-t border-border bg-muted/30 w-full">
        <div className="container w-full">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 text-center">
            <div className="p-3 sm:p-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mx-auto mb-2 sm:mb-3 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-primary text-xl sm:text-2xl lg:text-3xl">✓</span>
              </div>
              <h3 className="font-bold text-xs sm:text-sm lg:text-base">100% Authentic</h3>
              <p className="text-[11px] sm:text-xs lg:text-sm text-muted-foreground mt-0.5">Genuine products only</p>
            </div>
            <div className="p-3 sm:p-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mx-auto mb-2 sm:mb-3 bg-primary/10 rounded-2xl flex items-center justify-center transition-transform">
                <span className="text-primary text-xl sm:text-2xl lg:text-3xl">🚚</span>
              </div>
              <h3 className="font-bold text-xs sm:text-sm lg:text-base">Fast Delivery</h3>
              <p className="text-[11px] sm:text-xs lg:text-sm text-muted-foreground mt-0.5">Same day in Lagos</p>
            </div>
            <div className="p-3 sm:p-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mx-auto mb-2 sm:mb-3 bg-primary/10 rounded-2xl flex items-center justify-center transition-transform">
                <span className="text-primary text-xl sm:text-2xl lg:text-3xl">💰</span>
              </div>
              <h3 className="font-bold text-xs sm:text-sm lg:text-base">Best Prices</h3>
              <p className="text-[11px] sm:text-xs lg:text-sm text-muted-foreground mt-0.5">Competitive pricing</p>
            </div>
            <div className="p-3 sm:p-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mx-auto mb-2 sm:mb-3 bg-primary/10 rounded-2xl flex items-center justify-center transition-transform">
                <span className="text-primary text-xl sm:text-2xl lg:text-3xl">🛡️</span>
              </div>
              <h3 className="font-bold text-xs sm:text-sm lg:text-base">Secure Payments</h3>
              <p className="text-[11px] sm:text-xs lg:text-sm text-muted-foreground mt-0.5">Safe transactions</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;

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

  const { products } = useProducts();
  const megaDeals = products.filter(p => p.original_price && p.original_price > p.price).slice(0, 6);
  const megaDealIds = new Set(megaDeals.map(p => p.id));
  const topSellingProducts = products.filter(p => !megaDealIds.has(p.id)).slice(0, 6);

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
      <Card className="group border border-border hover:shadow-lg transition-all bg-background">
        <CardContent className="p-3">
          {/* Product Name */}
          <h3 className="text-primary text-sm font-medium mb-2 line-clamp-2 min-h-[40px] hover:underline cursor-pointer">
            {product.name}
          </h3>
          
          {/* Product Image */}
          <div className="relative aspect-square mb-3 bg-muted rounded overflow-hidden">
            <img 
              src={image} 
              alt={product.name}
              className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform"
            />
            {discount && (
              <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs font-bold">
                -{discount}% OFF
              </Badge>
            )}
          </div>

          {/* Price */}
          <div className="space-y-1">
            <p className="text-lg font-bold text-foreground">{formatPrice(product.price)}</p>
            {product.original_price && (
              <p className="text-sm text-muted-foreground line-through">
                {formatPrice(product.original_price)}
              </p>
            )}
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 mt-3 text-xs">
          <Link to={`/product/${product.id}`} className="text-primary hover:underline flex items-center gap-1">
            <Eye className="h-3 w-3" /> Quick View
          </Link>
            <button className="text-primary hover:underline flex items-center gap-1 ml-auto">
              <Heart className="h-3 w-3" /> Wishlist
            </button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Banner Carousel */}
      <section className="relative overflow-hidden">
        <div className="relative">
          {/* Slides */}
          <div className="relative min-h-[400px] lg:min-h-[450px]">
            {heroSlides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                  index === currentSlide 
                    ? 'opacity-100 translate-x-0 z-10' 
                    : index < currentSlide 
                      ? 'opacity-0 -translate-x-full z-0' 
                      : 'opacity-0 translate-x-full z-0'
                }`}
              >
                <div className={`h-full bg-gradient-to-r ${slide.gradient}`}>
                  <div className="container h-full">
                    <div className="grid lg:grid-cols-2 gap-8 items-center h-full py-12 px-4">
                      <div className={`space-y-6 text-primary-foreground ${index === currentSlide ? 'animate-fade-in' : ''}`}>
                        <p className="text-primary-foreground/80 font-medium uppercase tracking-wide text-sm">
                          {slide.subtitle}
                        </p>
                        <h1 className="text-3xl lg:text-5xl font-bold leading-tight">
                          {slide.title}
                        </h1>
                        <Button 
                          size="lg" 
                          asChild 
                          className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-full px-8 font-bold"
                        >
                          <Link to={slide.buttonLink}>
                            {slide.buttonText}
                          </Link>
                        </Button>
                      </div>
                      <div className={`relative flex justify-center lg:justify-end ${index === currentSlide ? 'animate-scale-in' : ''}`}>
                        <img 
                          src={slide.image} 
                          alt={slide.title}
                          className="w-full max-w-md h-auto object-contain rounded-lg"
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
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-background/20 backdrop-blur-sm border border-primary-foreground/30 flex items-center justify-center text-primary-foreground hover:bg-background/40 transition-all"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-background/20 backdrop-blur-sm border border-primary-foreground/30 flex items-center justify-center text-primary-foreground hover:bg-background/40 transition-all"
            aria-label="Next slide"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
          
          {/* Carousel Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
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
          </div>
        </div>
      </section>

      {/* Corporate Banner */}
      <section className="bg-muted py-3 border-b border-border">
        <div className="container px-4">
          <div className="flex flex-wrap items-center justify-center gap-2 text-center text-sm">
            <span className="text-muted-foreground">Special offers on bulk and corporate</span>
            <span className="font-bold text-primary">Anu Gadget</span>
            <span className="text-muted-foreground">sales</span>
            <Button variant="outline" size="sm" className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground ml-2 h-7 text-xs">
              Shop Now!
            </Button>
          </div>
        </div>
      </section>

      {/* Mega Deals Section - Slot Style */}
      <section className="py-6 px-4 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Left Side - Mega Deal Banner */}
            <div className="bg-gradient-to-br from-primary to-primary/80 rounded-lg p-6 text-primary-foreground flex flex-col justify-center">
              <h2 className="text-xl font-bold mb-2">January Mega Deals</h2>
              <p className="text-sm mb-4 text-primary-foreground/80">Up to:</p>
              <p className="text-6xl lg:text-7xl font-black mb-4">37%</p>
              <p className="text-sm mb-4 text-primary-foreground/80">Hurry Up! Offer ends in:</p>
              
              {/* Countdown Timer */}
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-primary-foreground/10 rounded p-2">
                  <p className="text-2xl font-bold">{String(countdown.days).padStart(2, '0')}</p>
                  <p className="text-xs uppercase">Days</p>
                </div>
                <div className="bg-primary-foreground/10 rounded p-2">
                  <p className="text-2xl font-bold">{String(countdown.hours).padStart(2, '0')}</p>
                  <p className="text-xs uppercase">Hours</p>
                </div>
                <div className="bg-primary-foreground/10 rounded p-2">
                  <p className="text-2xl font-bold">{String(countdown.minutes).padStart(2, '0')}</p>
                  <p className="text-xs uppercase">Mins</p>
                </div>
                <div className="bg-primary-foreground/10 rounded p-2">
                  <p className="text-2xl font-bold">{String(countdown.seconds).padStart(2, '0')}</p>
                  <p className="text-xs uppercase">Secs</p>
                </div>
              </div>
            </div>

            {/* Right Side - Products Grid */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <h3 className="font-bold text-lg">Mega Deals</h3>
                  <span className="h-1 w-20 bg-primary rounded"></span>
                </div>
                <Link to="/shop" className="text-primary hover:underline text-sm flex items-center gap-1">
                  View All <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
                {megaDeals.slice(0, 6).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section - Horizontal Scroll */}
      <section className="py-8 px-4 bg-muted/50 border-y border-border">
        <div className="container">
          <h2 className="text-xl font-bold mb-6 text-center">Categories</h2>
          <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide justify-center flex-wrap">
            {categories.map((category) => (
              <Link 
                key={category.name} 
                to={category.link}
                className="flex flex-col items-center gap-2 min-w-[100px] group"
              >
                <div className="w-20 h-20 rounded-full bg-background border-2 border-border group-hover:border-primary flex items-center justify-center transition-colors shadow-sm">
                  <category.icon className="h-8 w-8 text-primary" />
                </div>
                <span className="text-xs font-medium text-center text-foreground group-hover:text-primary transition-colors">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Top Selling Products */}
      <section className="py-8 px-4 bg-background">
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-bold">Top Selling Products</h2>
              <span className="h-1 w-20 bg-primary rounded hidden sm:block"></span>
            </div>
            <Link to="/shop">
              <Button variant="outline" className="rounded-full text-sm">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {topSellingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Phones & Tablets Section */}
      <section className="py-8 px-4 bg-muted/30">
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-bold">Phones & Tablets</h2>
              <span className="h-1 w-20 bg-primary rounded hidden sm:block"></span>
            </div>
            <Link to="/shop?category=phones" className="text-primary hover:underline text-sm flex items-center gap-1">
              See All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {megaDeals.slice(0, 6).map((product) => (
              <ProductCard key={`phone-${product.id}`} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Computing Section */}
      <section className="py-8 px-4 bg-background">
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-bold">Computing & IT Solutions</h2>
              <span className="h-1 w-20 bg-primary rounded hidden sm:block"></span>
            </div>
            <Link to="/shop?category=laptops" className="text-primary hover:underline text-sm flex items-center gap-1">
              See All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {topSellingProducts.slice(0, 6).map((product) => (
              <ProductCard key={`laptop-${product.id}`} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="py-6 px-4">
        <div className="container">
          <div className="bg-gradient-to-r from-primary to-primary/80 rounded-lg p-8 text-primary-foreground text-center">
            <h2 className="text-2xl lg:text-3xl font-bold mb-2">Power Deals</h2>
            <p className="text-lg mb-4">Never Go Dark Again | Power Stations Promo Up to 40% Discount</p>
            <Button asChild className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-full px-8">
              <Link to="/shop?category=power">Hurry Now!</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-8 px-4 border-t border-border bg-muted/30">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="w-14 h-14 mx-auto mb-3 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary text-2xl">✓</span>
              </div>
              <h3 className="font-bold text-sm">100% Authentic</h3>
              <p className="text-xs text-muted-foreground">Genuine products only</p>
            </div>
            <div>
              <div className="w-14 h-14 mx-auto mb-3 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary text-2xl">🚚</span>
              </div>
              <h3 className="font-bold text-sm">Fast Delivery</h3>
              <p className="text-xs text-muted-foreground">Same day in Lagos</p>
            </div>
            <div>
              <div className="w-14 h-14 mx-auto mb-3 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary text-2xl">💰</span>
              </div>
              <h3 className="font-bold text-sm">Best Prices</h3>
              <p className="text-xs text-muted-foreground">Competitive pricing</p>
            </div>
            <div>
              <div className="w-14 h-14 mx-auto mb-3 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary text-2xl">🛡️</span>
              </div>
              <h3 className="font-bold text-sm">Secure Payments</h3>
              <p className="text-xs text-muted-foreground">Safe transactions</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;

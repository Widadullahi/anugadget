import { ShoppingCart, Search, Menu, X, Heart, User, MapPin, Phone, ChevronDown, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { useAdminSettings } from "@/hooks/useAdminSettings";
import logo from "@/assets/logo.jpg";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, signOut } = useAuth();
  const { itemCount: cartCount } = useCart();
  const { itemCount: wishlistCount } = useWishlist();
  const settings = useAdminSettings();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMobileMenuOpen(false);
    }
  };

  const categories = [
    { name: "Phones & Tablets", link: "/shop?category=phones" },
    { name: "Laptops", link: "/shop?category=laptops" },
    { name: "Smartwatches", link: "/shop?category=watches" },
    { name: "Audio", link: "/shop?category=audio" },
    { name: "Gaming", link: "/shop?category=gaming" },
    { name: "Accessories", link: "/shop?category=accessories" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Bar */}
      <div className="bg-foreground text-background py-1.5 px-4 text-xs">
        <div className="container flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              {settings.phoneNumber}
            </span>
            <span className="hidden sm:inline">|</span>
            <span className="hidden sm:inline">Welcome to Anu Gadget</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/contact" className="flex items-center gap-1 hover:text-primary transition-colors">
              <MapPin className="h-3 w-3" />
              Store Locator
            </Link>
            <span>|</span>
            {user ? (
              <span className="text-primary">{user.email}</span>
            ) : (
              <Link to="/login" className="hover:text-primary transition-colors">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-background border-b border-border py-3">
        <div className="container flex items-center justify-between px-4 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <img src={logo} alt="Anu Gadget" className="h-12 w-auto" />
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-4">
            <div className="relative w-full">
              <Input 
                type="search" 
                placeholder="Search for Products, Brands and Categories" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-12 h-11 border-2 border-primary rounded-full text-sm pl-4"
              />
              <Button 
                type="submit"
                size="icon" 
                className="absolute right-1 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </form>

          {/* Right Actions */}
          <div className="flex items-center gap-1">
            <Link to="/wishlist" className="hidden md:flex">
              <Button variant="ghost" size="sm" className="flex flex-col items-center gap-0.5 h-auto py-1 relative">
                <Heart className="h-5 w-5" />
                <span className="text-xs">Wishlist</span>
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 right-1 h-4 w-4 rounded-full bg-primary text-[10px] text-primary-foreground flex items-center justify-center font-bold">
                    {wishlistCount}
                  </span>
                )}
              </Button>
            </Link>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="hidden md:flex flex-col items-center gap-0.5 h-auto py-1">
                    <User className="h-5 w-5" />
                    <span className="text-xs">Account</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="w-full cursor-pointer">My Account</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="w-full cursor-pointer">My Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/wishlist" className="w-full cursor-pointer">Wishlist</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login" className="hidden md:flex">
                <Button variant="ghost" size="sm" className="flex flex-col items-center gap-0.5 h-auto py-1">
                  <User className="h-5 w-5" />
                  <span className="text-xs">Account</span>
                </Button>
              </Link>
            )}
            
            <Link to="/cart">
              <Button variant="ghost" size="sm" className="flex flex-col items-center gap-0.5 h-auto py-1 relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="text-xs">Cart</span>
                <span className="absolute -top-0.5 right-1 h-4 w-4 rounded-full bg-primary text-[10px] text-primary-foreground flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              </Button>
            </Link>
            
            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden ml-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Categories Navigation Bar */}
      <nav className="bg-primary text-primary-foreground">
        <div className="container">
          <div className="hidden md:flex items-center">
            {/* All Categories Dropdown */}
            <div className="bg-primary-foreground/10 px-4 py-3 flex items-center gap-2 cursor-pointer hover:bg-primary-foreground/20 transition-colors">
              <Menu className="h-4 w-4" />
              <span className="font-medium text-sm">All Categories</span>
              <ChevronDown className="h-4 w-4" />
            </div>
            
            {/* Category Links */}
            <div className="flex items-center">
              {categories.map((category) => (
                <Link 
                  key={category.name}
                  to={category.link}
                  className="px-4 py-3 text-sm font-medium hover:bg-primary-foreground/10 transition-colors"
                >
                  {category.name}
                </Link>
              ))}
            </div>

            {/* Right side links */}
            <div className="ml-auto flex items-center">
              <Link to="/about" className="px-4 py-3 text-sm font-medium hover:bg-primary-foreground/10 transition-colors">
                About Us
              </Link>
              <Link to="/contact" className="px-4 py-3 text-sm font-medium hover:bg-primary-foreground/10 transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-background">
          <div className="flex justify-between items-center p-4 border-b border-border">
            <img src={logo} alt="Anu Gadget" className="h-10 w-auto" />
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          
          <div className="p-4 overflow-y-auto h-full pb-20">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="relative mb-6">
              <Input 
                type="search" 
                placeholder="Search for Products" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-12 h-11 border-2 border-primary rounded-full"
              />
              <Button 
                type="submit"
                size="icon" 
                className="absolute right-1 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full"
              >
                <Search className="h-4 w-4" />
              </Button>
            </form>

            {/* Categories */}
            <div className="mb-6">
              <h3 className="font-bold text-sm text-muted-foreground mb-3 uppercase">Categories</h3>
              <nav className="space-y-1">
                {categories.map((category) => (
                  <Link 
                    key={category.name}
                    to={category.link}
                    className="block py-3 px-2 text-base font-medium border-b border-border hover:text-primary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Quick Links */}
            <div className="mb-6">
              <h3 className="font-bold text-sm text-muted-foreground mb-3 uppercase">Quick Links</h3>
              <nav className="space-y-1">
                <Link 
                  to="/" 
                  className="block py-3 px-2 text-base font-medium border-b border-border hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  to="/shop" 
                  className="block py-3 px-2 text-base font-medium border-b border-border hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Shop
                </Link>
                <Link 
                  to="/about" 
                  className="block py-3 px-2 text-base font-medium border-b border-border hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About Us
                </Link>
                <Link 
                  to="/contact" 
                  className="block py-3 px-2 text-base font-medium border-b border-border hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </nav>
            </div>

            {/* Account Actions */}
            <div className="flex flex-col gap-3">
              <Link to="/cart" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full rounded-full flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Cart ({cartCount})
                </Button>
              </Link>
              <Link to="/wishlist" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full rounded-full flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Wishlist ({wishlistCount})
                </Button>
              </Link>
              {user ? (
                <Button 
                  onClick={() => { handleSignOut(); setMobileMenuOpen(false); }} 
                  variant="destructive"
                  className="w-full rounded-full"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              ) : (
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full rounded-full">Sign In</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

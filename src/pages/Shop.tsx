import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import { SlidersHorizontal, Eye, Heart, ChevronDown, Grid3X3, List, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import iphone15ProMax from "@/assets/iphone-15-pro-max.jpg";
import macbookProM3 from "@/assets/macbook-pro-m3.jpg";
import appleWatchUltra2 from "@/assets/apple-watch-ultra-2.jpg";
import airpodsPro2 from "@/assets/airpods-pro-2.jpg";

const Shop = () => {
  const [priceRange, setPriceRange] = useState([0, 5000000]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const productImages = [iphone15ProMax, macbookProM3, appleWatchUltra2, airpodsPro2];

  const products = [
    { id: 1, name: "iPhone 15 Pro Max 256GB Natural Titanium", price: 1200000, oldPrice: 1450000, discount: 17, image: iphone15ProMax },
    { id: 2, name: "MacBook Pro 14-inch M3 Pro 18GB RAM", price: 2500000, oldPrice: 2850000, discount: 12, image: macbookProM3 },
    { id: 3, name: "Apple Watch Ultra 2 GPS + Cellular", price: 800000, oldPrice: 950000, discount: 16, image: appleWatchUltra2 },
    { id: 4, name: "AirPods Pro 2nd Generation USB-C", price: 250000, oldPrice: 320000, discount: 22, image: airpodsPro2 },
    { id: 5, name: "Samsung Galaxy S24 Ultra 512GB", price: 1100000, oldPrice: 1300000, discount: 15, image: iphone15ProMax },
    { id: 6, name: "Dell XPS 15 Intel Core i9 32GB", price: 2200000, oldPrice: 2500000, discount: 12, image: macbookProM3 },
    { id: 7, name: "Samsung Galaxy Watch 6 Classic", price: 350000, oldPrice: 400000, discount: 13, image: appleWatchUltra2 },
    { id: 8, name: "Sony WH-1000XM5 Wireless", price: 450000, oldPrice: 520000, discount: 13, image: airpodsPro2 },
    { id: 9, name: "iPad Pro 12.9-inch M2 WiFi 256GB", price: 1500000, oldPrice: 1700000, discount: 12, image: iphone15ProMax },
    { id: 10, name: "HP Spectre x360 16-inch OLED", price: 1900000, oldPrice: 2150000, discount: 12, image: macbookProM3 },
    { id: 11, name: "Google Pixel Watch 2 LTE", price: 280000, oldPrice: 320000, discount: 13, image: appleWatchUltra2 },
    { id: 12, name: "Bose QuietComfort Ultra Earbuds", price: 380000, oldPrice: 450000, discount: 16, image: airpodsPro2 },
  ];

  const categories = [
    { name: "Smartphones", count: 45 },
    { name: "Laptops", count: 32 },
    { name: "Tablets", count: 18 },
    { name: "Smartwatches", count: 24 },
    { name: "Headphones", count: 36 },
    { name: "Accessories", count: 89 },
  ];

  const brands = [
    { name: "Apple", count: 28 },
    { name: "Samsung", count: 22 },
    { name: "HP", count: 15 },
    { name: "Dell", count: 12 },
    { name: "Lenovo", count: 18 },
    { name: "Sony", count: 14 },
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Breadcrumb */}
      <div className="bg-muted/50 py-3 border-b border-border">
        <div className="container px-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <span className="text-foreground">Shop</span>
          </div>
        </div>
      </div>

      <div className="container px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <aside className="space-y-4">
            {/* Filter Header */}
            <Card className="border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="h-5 w-5 text-primary" />
                    <h3 className="font-bold text-lg">Filters</h3>
                  </div>
                  <Button variant="link" className="text-primary text-sm p-0 h-auto">
                    Clear All
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card className="border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold">Categories</h4>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category.name} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox id={category.name} />
                        <label htmlFor={category.name} className="text-sm cursor-pointer hover:text-primary">
                          {category.name}
                        </label>
                      </div>
                      <span className="text-xs text-muted-foreground">({category.count})</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Brands */}
            <Card className="border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold">Brands</h4>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <div key={brand.name} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox id={brand.name} />
                        <label htmlFor={brand.name} className="text-sm cursor-pointer hover:text-primary">
                          {brand.name}
                        </label>
                      </div>
                      <span className="text-xs text-muted-foreground">({brand.count})</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Price Range */}
            <Card className="border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold">Price Range</h4>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </div>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={5000000}
                  step={50000}
                  className="mb-3"
                />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">₦{priceRange[0].toLocaleString()}</span>
                  <span className="text-muted-foreground">₦{priceRange[1].toLocaleString()}</span>
                </div>
                <Button className="w-full mt-4 rounded-full" size="sm">
                  Apply Filter
                </Button>
              </CardContent>
            </Card>
          </aside>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-border">
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-bold text-foreground">{products.length}</span> products
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Button 
                    variant={viewMode === 'grid' ? 'default' : 'outline'} 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant={viewMode === 'list' ? 'default' : 'outline'} 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
                <select className="border border-border rounded-md px-3 py-2 text-sm bg-background">
                  <option>Sort by: Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest First</option>
                  <option>Best Selling</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-3' : 'grid-cols-1'}`}>
              {products.map((product) => (
                <Card key={product.id} className="group border border-border hover:shadow-lg transition-all bg-background">
                  <CardContent className="p-3">
                    {/* Product Name */}
                    <h3 className="text-primary text-sm font-medium mb-2 line-clamp-2 min-h-[40px] hover:underline cursor-pointer">
                      {product.name}
                    </h3>
                    
                    {/* Product Image */}
                    <div className="relative aspect-square mb-3 bg-muted rounded overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform"
                      />
                      {product.discount && (
                        <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs font-bold">
                          -{product.discount}% OFF
                        </Badge>
                      )}
                    </div>

                    {/* Price */}
                    <div className="space-y-1">
                      <p className="text-lg font-bold text-foreground">{formatPrice(product.price)}</p>
                      {product.oldPrice && (
                        <p className="text-sm text-muted-foreground line-through">
                          {formatPrice(product.oldPrice)}
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
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8 gap-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button size="sm">1</Button>
              <Button variant="outline" size="sm">2</Button>
              <Button variant="outline" size="sm">3</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Shop;
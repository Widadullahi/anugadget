import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Link, useSearchParams } from "react-router-dom";
import { SlidersHorizontal, Eye, Heart, ChevronDown, ChevronUp, Grid3X3, List, ShoppingCart, Loader2, Search, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useProducts } from "@/hooks/useProducts";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { Skeleton } from "@/components/ui/skeleton";

type SortOption = 'featured' | 'price-low' | 'price-high' | 'newest';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Initialize state from URL params
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
    const cat = searchParams.get('category');
    return cat ? [cat] : [];
  });
  const [selectedBrands, setSelectedBrands] = useState<string[]>(() => {
    const brand = searchParams.get('brand');
    return brand ? [brand] : [];
  });
  const [priceRange, setPriceRange] = useState([0, 5000000]);
  const [appliedPriceRange, setAppliedPriceRange] = useState([0, 5000000]);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [addingToCart, setAddingToCart] = useState<string | null>(null);
  
  // Collapsible sections state
  const [categoriesOpen, setCategoriesOpen] = useState(true);
  const [brandsOpen, setBrandsOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);
  
  const { products, isLoading } = useProducts();
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist, items: wishlistItems } = useWishlist();

  // Derive unique categories and brands from actual products
  const categoriesFromProducts = useMemo(() => {
    const categoryMap = new Map<string, number>();
    products.forEach(p => {
      const current = categoryMap.get(p.category) || 0;
      categoryMap.set(p.category, current + 1);
    });
    return Array.from(categoryMap.entries()).map(([name, count]) => ({ name, count }));
  }, [products]);

  const brandsFromProducts = useMemo(() => {
    const brandMap = new Map<string, number>();
    products.forEach(p => {
      if (p.brand) {
        const current = brandMap.get(p.brand) || 0;
        brandMap.set(p.brand, current + 1);
      }
    });
    return Array.from(brandMap.entries()).map(([name, count]) => ({ name, count }));
  }, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.description?.toLowerCase().includes(query) ||
        p.brand?.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter(p => 
        selectedCategories.some(cat => 
          p.category.toLowerCase() === cat.toLowerCase()
        )
      );
    }

    // Brand filter
    if (selectedBrands.length > 0) {
      result = result.filter(p => 
        p.brand && selectedBrands.some(brand => 
          p.brand!.toLowerCase() === brand.toLowerCase()
        )
      );
    }

    // Price range filter
    result = result.filter(p => 
      p.price >= appliedPriceRange[0] && p.price <= appliedPriceRange[1]
    );

    // Sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0));
        break;
    }

    return result;
  }, [products, searchQuery, selectedCategories, selectedBrands, appliedPriceRange, sortBy]);

  // Sync URL params on filter changes
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('search', searchQuery);
    if (selectedCategories.length === 1) params.set('category', selectedCategories[0]);
    if (selectedBrands.length === 1) params.set('brand', selectedBrands[0]);
    setSearchParams(params, { replace: true });
  }, [searchQuery, selectedCategories, selectedBrands, setSearchParams]);

  // Handle URL param changes (e.g., from navbar links)
  useEffect(() => {
    const cat = searchParams.get('category');
    const brand = searchParams.get('brand');
    const search = searchParams.get('search');
    
    if (cat && !selectedCategories.includes(cat)) {
      setSelectedCategories([cat]);
    }
    if (brand && !selectedBrands.includes(brand)) {
      setSelectedBrands([brand]);
    }
    if (search && search !== searchQuery) {
      setSearchQuery(search);
    }
  }, [searchParams]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = async (productId: string) => {
    setAddingToCart(productId);
    await addToCart(productId, 1);
    setAddingToCart(null);
  };

  const handleWishlistToggle = async (productId: string) => {
    if (isInWishlist(productId)) {
      const wishlistItem = wishlistItems.find(item => item.product_id === productId);
      if (wishlistItem) {
        await removeFromWishlist(wishlistItem.id);
      }
    } else {
      await addToWishlist(productId);
    }
  };

  const getDiscountPercent = (price: number, originalPrice: number | null) => {
    if (!originalPrice || originalPrice <= price) return null;
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };

  const handleCategoryToggle = (categoryName: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryName) 
        ? prev.filter(c => c !== categoryName)
        : [...prev, categoryName]
    );
  };

  const handleBrandToggle = (brandName: string) => {
    setSelectedBrands(prev => 
      prev.includes(brandName)
        ? prev.filter(b => b !== brandName)
        : [...prev, brandName]
    );
  };

  const handleApplyPriceFilter = () => {
    setAppliedPriceRange(priceRange);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange([0, 5000000]);
    setAppliedPriceRange([0, 5000000]);
    setSortBy('featured');
    setSearchParams({});
  };

  const hasActiveFilters = searchQuery || selectedCategories.length > 0 || selectedBrands.length > 0 || 
    appliedPriceRange[0] > 0 || appliedPriceRange[1] < 5000000;

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
            {/* Search Bar */}
            <Card className="border-border">
              <CardContent className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-10"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Filter Header */}
            <Card className="border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="h-5 w-5 text-primary" />
                    <h3 className="font-bold text-lg">Filters</h3>
                  </div>
                  {hasActiveFilters && (
                    <Button 
                      variant="link" 
                      className="text-primary text-sm p-0 h-auto"
                      onClick={handleClearFilters}
                    >
                      Clear All
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card className="border-border">
              <CardContent className="p-4">
                <button 
                  className="flex items-center justify-between w-full mb-3"
                  onClick={() => setCategoriesOpen(!categoriesOpen)}
                >
                  <h4 className="font-bold">Categories</h4>
                  {categoriesOpen ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  )}
                </button>
                {categoriesOpen && (
                  <div className="space-y-2">
                    {categoriesFromProducts.length === 0 ? (
                      <p className="text-sm text-muted-foreground">No categories available</p>
                    ) : (
                      categoriesFromProducts.map((category) => (
                        <div key={category.name} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id={`cat-${category.name}`}
                              checked={selectedCategories.includes(category.name)}
                              onCheckedChange={() => handleCategoryToggle(category.name)}
                            />
                            <label 
                              htmlFor={`cat-${category.name}`} 
                              className="text-sm cursor-pointer hover:text-primary"
                            >
                              {category.name}
                            </label>
                          </div>
                          <span className="text-xs text-muted-foreground">({category.count})</span>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Brands */}
            <Card className="border-border">
              <CardContent className="p-4">
                <button 
                  className="flex items-center justify-between w-full mb-3"
                  onClick={() => setBrandsOpen(!brandsOpen)}
                >
                  <h4 className="font-bold">Brands</h4>
                  {brandsOpen ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  )}
                </button>
                {brandsOpen && (
                  <div className="space-y-2">
                    {brandsFromProducts.length === 0 ? (
                      <p className="text-sm text-muted-foreground">No brands available</p>
                    ) : (
                      brandsFromProducts.map((brand) => (
                        <div key={brand.name} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id={`brand-${brand.name}`}
                              checked={selectedBrands.includes(brand.name)}
                              onCheckedChange={() => handleBrandToggle(brand.name)}
                            />
                            <label 
                              htmlFor={`brand-${brand.name}`} 
                              className="text-sm cursor-pointer hover:text-primary"
                            >
                              {brand.name}
                            </label>
                          </div>
                          <span className="text-xs text-muted-foreground">({brand.count})</span>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Price Range */}
            <Card className="border-border">
              <CardContent className="p-4">
                <button 
                  className="flex items-center justify-between w-full mb-3"
                  onClick={() => setPriceOpen(!priceOpen)}
                >
                  <h4 className="font-bold">Price Range</h4>
                  {priceOpen ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  )}
                </button>
                {priceOpen && (
                  <>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={5000000}
                      step={50000}
                      className="mb-3"
                    />
                    <div className="flex justify-between text-sm mb-3">
                      <span className="text-muted-foreground">₦{priceRange[0].toLocaleString()}</span>
                      <span className="text-muted-foreground">₦{priceRange[1].toLocaleString()}</span>
                    </div>
                    <Button 
                      className="w-full rounded-full" 
                      size="sm"
                      onClick={handleApplyPriceFilter}
                    >
                      Apply Filter
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </aside>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Active Filters */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2 mb-4">
                {searchQuery && (
                  <Badge variant="secondary" className="gap-1">
                    Search: {searchQuery}
                    <button onClick={() => setSearchQuery('')}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {selectedCategories.map(cat => (
                  <Badge key={cat} variant="secondary" className="gap-1">
                    {cat}
                    <button onClick={() => handleCategoryToggle(cat)}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                {selectedBrands.map(brand => (
                  <Badge key={brand} variant="secondary" className="gap-1">
                    {brand}
                    <button onClick={() => handleBrandToggle(brand)}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                {(appliedPriceRange[0] > 0 || appliedPriceRange[1] < 5000000) && (
                  <Badge variant="secondary" className="gap-1">
                    ₦{appliedPriceRange[0].toLocaleString()} - ₦{appliedPriceRange[1].toLocaleString()}
                    <button onClick={() => { setPriceRange([0, 5000000]); setAppliedPriceRange([0, 5000000]); }}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
              </div>
            )}

            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-border">
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-bold text-foreground">{filteredProducts.length}</span> of{' '}
                <span className="font-bold text-foreground">{products.length}</span> products
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
                <select 
                  className="border border-border rounded-md px-3 py-2 text-sm bg-background"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                >
                  <option value="featured">Sort by: Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {isLoading ? (
              <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-3' : 'grid-cols-1'}`}>
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="border-border">
                    <CardContent className="p-3">
                      <Skeleton className="h-4 w-3/4 mb-2" />
                      <Skeleton className="aspect-square mb-3" />
                      <Skeleton className="h-6 w-1/2 mb-2" />
                      <Skeleton className="h-8 w-full" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <Card className="border-border">
                <CardContent className="py-16 text-center">
                  <p className="text-xl font-bold mb-2">No products found</p>
                  <p className="text-muted-foreground mb-4">
                    {hasActiveFilters 
                      ? "Try adjusting your filters or search query."
                      : "Check back later for new products."
                    }
                  </p>
                  {hasActiveFilters && (
                    <Button onClick={handleClearFilters} variant="outline" className="rounded-full">
                      Clear All Filters
                    </Button>
                  )}
                </CardContent>
              </Card>
            ) : (
              <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-3' : 'grid-cols-1'}`}>
                {filteredProducts.map((product) => {
                  const discount = getDiscountPercent(product.price, product.original_price);
                  return (
                    <Card key={product.id} className="group border border-border hover:shadow-lg transition-all bg-background">
                      <CardContent className="p-3">
                        {/* Product Name */}
                        <Link to={`/product/${product.id}`}>
                          <h3 className="text-primary text-sm font-medium mb-2 line-clamp-2 min-h-[40px] hover:underline cursor-pointer">
                            {product.name}
                          </h3>
                        </Link>
                        
                        {/* Product Image */}
                        <div className="relative aspect-square mb-3 bg-muted rounded overflow-hidden">
                          <img 
                            src={product.image_url || '/placeholder.svg'} 
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
                          {product.original_price && product.original_price > product.price && (
                            <p className="text-sm text-muted-foreground line-through">
                              {formatPrice(product.original_price)}
                            </p>
                          )}
                        </div>

                        {/* Add to Cart Button */}
                        <Button 
                          className="w-full mt-3 rounded-full" 
                          size="sm"
                          onClick={() => handleAddToCart(product.id)}
                          disabled={addingToCart === product.id}
                        >
                          {addingToCart === product.id ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Adding...
                            </>
                          ) : (
                            <>
                              <ShoppingCart className="h-4 w-4 mr-2" />
                              Add to Cart
                            </>
                          )}
                        </Button>

                        {/* Quick Actions */}
                        <div className="flex items-center gap-2 mt-3 text-xs">
                          <Link to={`/product/${product.id}`} className="text-primary hover:underline flex items-center gap-1">
                            <Eye className="h-3 w-3" /> Quick View
                          </Link>
                          <button 
                            className={`flex items-center gap-1 ml-auto hover:underline ${isInWishlist(product.id) ? 'text-destructive' : 'text-primary'}`}
                            onClick={() => handleWishlistToggle(product.id)}
                          >
                            <Heart className={`h-3 w-3 ${isInWishlist(product.id) ? 'fill-current' : ''}`} /> 
                            {isInWishlist(product.id) ? 'Remove' : 'Wishlist'}
                          </button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Shop;

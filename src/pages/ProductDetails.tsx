import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ShoppingCart, 
  Heart, 
  Share2, 
  Minus, 
  Plus, 
  Star, 
  Truck, 
  Shield, 
  RotateCcw,
  Check,
  ChevronRight
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useProducts } from "@/hooks/useProducts";

const reviews = [
  {
    id: 1,
    name: "Adebayo Johnson",
    rating: 5,
    date: "January 15, 2024",
    title: "Excellent product!",
    comment: "Amazing product, exactly as described. Fast delivery too. Will definitely buy again from Anu Gadget!",
    verified: true
  },
  {
    id: 2,
    name: "Chioma Okafor",
    rating: 4,
    date: "January 10, 2024",
    title: "Great value for money",
    comment: "Good quality product. Delivery was quick. Only giving 4 stars because the packaging could be better.",
    verified: true
  },
  {
    id: 3,
    name: "Emmanuel Nwachukwu",
    rating: 5,
    date: "January 5, 2024",
    title: "Perfect!",
    comment: "This is my third purchase from Anu Gadget. Always impressed with the quality and service.",
    verified: true
  }
];

const ProductDetails = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const { products } = useProducts();
  const product =
    products.find((p) => p.id === String(id)) ||
    products[0];
  const images =
    product?.images && product.images.length > 0
      ? product.images
      : product?.image_url
        ? [product.image_url]
        : ["/placeholder.svg"];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const relatedProducts = products.filter((p) => p.id !== product?.id).slice(0, 4);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container px-4 py-16">
          <Card>
            <CardContent className="py-16 text-center">
              <p className="text-muted-foreground">Loading product details...</p>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Breadcrumb */}
      <div className="bg-muted/50 py-3 border-b border-border">
        <div className="container px-4">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-primary">Home</Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <Link to="/shop" className="text-muted-foreground hover:text-primary">Shop</Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="text-foreground font-medium truncate max-w-[200px]">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Section */}
      <section className="py-8 px-4">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square bg-muted rounded-lg overflow-hidden border border-border">
                <img 
                  src={images[selectedImage]} 
                  alt={product?.name}
                  className="w-full h-full object-contain p-8"
                />
                {product?.original_price && product.original_price > product.price && (
                  <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground text-sm font-bold px-3 py-1">
                    -{Math.round(((product.original_price - product.price) / product.original_price) * 100)}% OFF
                  </Badge>
                )}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImage((prev) => (prev - 1 + images.length) % images.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 shadow hover:bg-background"
                      aria-label="Previous image"
                    >
                      <ChevronRight className="h-4 w-4 rotate-180" />
                    </button>
                    <button
                      onClick={() => setSelectedImage((prev) => (prev + 1) % images.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 shadow hover:bg-background"
                      aria-label="Next image"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </>
                )}
              </div>
              
              {/* Thumbnail Gallery */}
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 overflow-hidden bg-muted ${
                      selectedImage === idx ? 'border-primary' : 'border-border'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-contain p-2" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Brand & Category */}
              <div className="flex items-center gap-2 text-sm">
                <span className="text-primary font-medium">{product?.brand || "Anu Gadget"}</span>
                <span className="text-muted-foreground">|</span>
                <span className="text-muted-foreground">{product?.category || "Products"}</span>
              </div>

              {/* Title */}
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground">{product?.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground'}`} 
                    />
                  ))}
                </div>
                <span className="font-medium">4.8</span>
                <span className="text-muted-foreground">(124 reviews)</span>
              </div>

              {/* Price */}
              <div className="space-y-1">
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold text-primary">{formatPrice(product?.price || 0)}</span>
                  {product?.original_price && (
                    <span className="text-xl text-muted-foreground line-through">{formatPrice(product.original_price)}</span>
                  )}
                </div>
                {product?.original_price && (
                  <p className="text-sm text-green-600 font-medium">
                    You save: {formatPrice(product.original_price - (product?.price || 0))}
                  </p>
                )}
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-600" />
                <span className="text-green-600 font-medium">In Stock</span>
              </div>

              {/* SKU */}
              <p className="text-sm text-muted-foreground">SKU: {product?.id}</p>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed">{product?.description || "Premium quality product from Anu Gadget."}</p>

              {/* Quantity & Add to Cart */}
              <div className="space-y-4 pt-4 border-t border-border">
                <div className="flex items-center gap-4">
                  <span className="font-medium">Quantity:</span>
                  <div className="flex items-center border border-border rounded-lg">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleQuantityChange(-1)}
                      className="rounded-r-none"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleQuantityChange(1)}
                      className="rounded-l-none"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button size="lg" className="flex-1 min-w-[200px] bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-lg">
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Add to Cart
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`${isWishlisted ? 'text-primary border-primary' : ''}`}
                  >
                    <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-primary' : ''}`} />
                  </Button>
                  <Button size="lg" variant="outline">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>

                <Button size="lg" className="w-full bg-foreground hover:bg-foreground/90 text-background font-bold rounded-lg">
                  Buy Now
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Truck className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-xs font-medium">Free Delivery</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-xs font-medium">1 Year Warranty</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <RotateCcw className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-xs font-medium">7 Days Return</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-8 px-4 bg-muted/30">
        <div className="container">
          <Tabs defaultValue="specifications" className="w-full">
            <TabsList className="w-full justify-start bg-background border border-border rounded-lg p-1 flex-wrap h-auto">
              <TabsTrigger value="specifications" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md px-6">
                Specifications
              </TabsTrigger>
              <TabsTrigger value="features" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md px-6">
                Features
              </TabsTrigger>
              <TabsTrigger value="reviews" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md px-6">
                Reviews ({product.reviewCount})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-6">Product Specifications</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {product?.specifications ? (
                      Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="flex border-b border-border pb-3">
                          <span className="font-medium text-foreground w-1/2">{key}</span>
                          <span className="text-muted-foreground w-1/2">{value}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-muted-foreground">Specifications not available for this product.</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="features" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-6">Key Features</h3>
                  <ul className="grid md:grid-cols-2 gap-4">
                    {product?.features ? (
                      product.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3">
                          <Check className="h-5 w-5 text-primary flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))
                    ) : (
                      <p className="text-muted-foreground">Features not available for this product.</p>
                    )}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold">Customer Reviews</h3>
                    <Button variant="outline" className="text-primary border-primary">
                      Write a Review
                    </Button>
                  </div>

                  {/* Rating Summary */}
                  <div className="flex items-center gap-6 mb-8 pb-6 border-b border-border">
                    <div className="text-center">
                      <p className="text-5xl font-bold text-primary">{product.rating}</p>
                      <div className="flex items-center gap-1 mt-2">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground'}`} 
                          />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{product.reviewCount} reviews</p>
                    </div>
                  </div>

                  {/* Reviews List */}
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b border-border pb-6 last:border-0">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <span className="text-primary font-bold">{review.name.charAt(0)}</span>
                            </div>
                            <div>
                              <p className="font-medium">{review.name}</p>
                              <div className="flex items-center gap-2">
                                {review.verified && (
                                  <Badge variant="outline" className="text-xs text-green-600 border-green-600">
                                    Verified Purchase
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                          <span className="text-sm text-muted-foreground">{review.date}</span>
                        </div>
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground'}`} 
                            />
                          ))}
                        </div>
                        <h4 className="font-medium mb-2">{review.title}</h4>
                        <p className="text-muted-foreground">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-8 px-4 bg-background">
        <div className="container">
          <h2 className="text-xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((item) => (
              <Link to={`/product/${item.id}`} key={item.id}>
                <Card className="group border border-border hover:shadow-lg transition-all bg-background">
                  <CardContent className="p-3">
                    <h3 className="text-primary text-sm font-medium mb-2 line-clamp-2 min-h-[40px] hover:underline">
                      {item.name}
                    </h3>
                    <div className="relative aspect-square mb-3 bg-muted rounded overflow-hidden">
                      <img 
                        src={item.images[0]} 
                        alt={item.name}
                        className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform"
                      />
                      {item.discount && (
                        <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs font-bold">
                          -{item.discount}% OFF
                        </Badge>
                      )}
                    </div>
                    <div className="space-y-1">
                      <p className="text-lg font-bold text-foreground">{formatPrice(item.price)}</p>
                      {item.oldPrice && (
                        <p className="text-sm text-muted-foreground line-through">
                          {formatPrice(item.oldPrice)}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductDetails;

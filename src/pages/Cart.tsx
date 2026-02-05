import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, X, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/contexts/AuthContext";
import { useCoupon } from "@/hooks/useCoupon";

const Cart = () => {
  const { user } = useAuth();
  const { items, isLoading, updateQuantity, removeFromCart, clearCart, subtotal } = useCart();
  const { appliedCoupon, isValidating, validateAndApplyCoupon, removeCoupon, recalculateDiscount } = useCoupon();
  const [couponCode, setCouponCode] = useState("");

  const shipping = items.length > 0 ? 5000 : 0;
  const discount = appliedCoupon?.discountAmount || 0;
  const total = subtotal + shipping - discount;

  // Recalculate discount when subtotal changes
  useEffect(() => {
    recalculateDiscount(subtotal);
  }, [subtotal]);

  const handleApplyCoupon = async () => {
    const success = await validateAndApplyCoupon(couponCode, subtotal);
    if (success) {
      setCouponCode("");
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container px-4 py-16">
          <Card className="max-w-md mx-auto border-border">
            <CardContent className="py-16 text-center">
              <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-xl font-bold mb-2">Sign in to view your cart</p>
              <p className="text-muted-foreground mb-6">
                Create an account or sign in to start shopping.
              </p>
              <Button asChild className="rounded-full">
                <Link to="/login">Sign In</Link>
              </Button>
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
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <span className="text-foreground">Shopping Cart</span>
          </div>
        </div>
      </div>

      <div className="container px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Shopping Cart ({items.length} items)</h1>

        {isLoading ? (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {[...Array(2)].map((_, i) => (
                <Card key={i} className="border-border animate-pulse">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="w-20 h-20 bg-muted rounded-lg" />
                      <div className="flex-1">
                        <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                        <div className="h-4 bg-muted rounded w-1/4" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : items.length === 0 ? (
          <Card className="border-border">
            <CardContent className="py-16 text-center">
              <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-xl font-bold mb-2">Your cart is empty</p>
              <p className="text-muted-foreground mb-6">Looks like you haven't added any items to your cart yet.</p>
              <Button asChild className="rounded-full">
                <Link to="/shop">Continue Shopping</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {/* Table Header - Desktop */}
              <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-muted/50 rounded-lg text-sm font-bold">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              {items.map((item) => (
                <Card key={item.id} className="border-border">
                  <CardContent className="p-4">
                    <div className="grid md:grid-cols-12 gap-4 items-center">
                      {/* Product Info */}
                      <div className="md:col-span-6 flex gap-4">
                        <div className="w-20 h-20 bg-muted rounded-lg overflow-hidden flex-shrink-0 border border-border">
                          <img 
                            src={item.product?.image_url || '/placeholder.svg'} 
                            alt={item.product?.name}
                            className="w-full h-full object-contain p-1"
                          />
                        </div>
                        <div className="flex-1">
                          <Link to={`/product/${item.product_id}`}>
                            <h3 className="font-medium text-sm text-primary hover:underline cursor-pointer line-clamp-2">
                              {item.product?.name}
                            </h3>
                          </Link>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-destructive text-xs flex items-center gap-1 mt-2 hover:underline"
                          >
                            <Trash2 className="h-3 w-3" /> Remove
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="md:col-span-2 text-center">
                        <p className="text-sm md:hidden text-muted-foreground mb-1">Price:</p>
                        <p className="font-bold">{formatPrice(item.product?.price || 0)}</p>
                      </div>

                      {/* Quantity */}
                      <div className="md:col-span-2 flex justify-center">
                        <div className="flex items-center border border-border rounded-lg">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 rounded-l-lg rounded-r-none"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="px-4 py-1 text-sm font-medium">{item.quantity}</span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 rounded-r-lg rounded-l-none"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Total */}
                      <div className="md:col-span-2 text-right">
                        <p className="text-sm md:hidden text-muted-foreground mb-1">Total:</p>
                        <p className="font-bold text-primary">
                          {formatPrice((item.product?.price || 0) * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Continue Shopping */}
              <div className="flex justify-between items-center pt-4">
                <Button variant="outline" asChild className="rounded-full">
                  <Link to="/shop">
                    Continue Shopping
                  </Link>
                </Button>
                <Button variant="ghost" className="text-destructive" onClick={clearCart}>
                  <Trash2 className="h-4 w-4 mr-2" /> Clear Cart
                </Button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-4">
              {/* Coupon Code */}
              <Card className="border-border">
                <CardContent className="p-4">
                  <h3 className="font-bold mb-3 flex items-center gap-2">
                    <Tag className="h-4 w-4 text-primary" />
                    Have a Coupon?
                  </h3>
                  
                  {appliedCoupon ? (
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-bold text-green-700 dark:text-green-400">{appliedCoupon.code}</p>
                          <p className="text-sm text-green-600 dark:text-green-500">
                            {appliedCoupon.discount_type === "percentage" 
                              ? `${appliedCoupon.discount_value}% off` 
                              : `₦${appliedCoupon.discount_value.toLocaleString()} off`}
                          </p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={removeCoupon}
                          className="h-8 w-8 text-green-700 hover:text-red-600 hover:bg-red-50"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Input 
                        placeholder="Enter coupon code" 
                        className="rounded-full uppercase"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
                      />
                      <Button 
                        className="rounded-full shrink-0" 
                        onClick={handleApplyCoupon}
                        disabled={isValidating}
                      >
                        {isValidating ? <Loader2 className="h-4 w-4 animate-spin" /> : "Apply"}
                      </Button>
                    </div>
                  )}
                  
                  <p className="text-xs text-muted-foreground mt-2">
                    Try: WELCOME10 or FLAT5000
                  </p>
                </CardContent>
              </Card>

              {/* Summary */}
              <Card className="border-border sticky top-24">
                <CardContent className="p-4">
                  <h2 className="text-lg font-bold mb-4">Order Summary</h2>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal ({items.length} items)</span>
                      <span className="font-medium">{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-medium">{formatPrice(shipping)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Discount</span>
                      <span className="font-medium text-green-600">- {formatPrice(discount)}</span>
                    </div>
                    
                    <div className="border-t border-border pt-3 mt-3">
                      <div className="flex justify-between">
                        <span className="text-lg font-bold">Total</span>
                        <span className="text-lg font-bold text-primary">{formatPrice(total)}</span>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full mt-6 rounded-full" size="lg" asChild>
                    <Link to={`/checkout${appliedCoupon ? `?coupon=${appliedCoupon.id}` : ''}`}>
                      Proceed to Checkout
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>

                  <div className="mt-4 text-center">
                    <p className="text-xs text-muted-foreground">
                      Secure checkout powered by Paystack
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Trust Badges */}
              <Card className="border-border">
                <CardContent className="p-4">
                  <div className="grid grid-cols-2 gap-3 text-center text-xs">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-primary text-lg">✓</span>
                      <span className="text-muted-foreground">100% Authentic</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-primary text-lg">🚚</span>
                      <span className="text-muted-foreground">Fast Delivery</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-primary text-lg">🔒</span>
                      <span className="text-muted-foreground">Secure Payment</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-primary text-lg">↩️</span>
                      <span className="text-muted-foreground">Easy Returns</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Cart;

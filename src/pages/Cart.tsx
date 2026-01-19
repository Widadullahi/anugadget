import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import iphone15ProMax from "@/assets/iphone-15-pro-max.jpg";
import airpodsPro2 from "@/assets/airpods-pro-2.jpg";

const Cart = () => {
  const cartItems = [
    {
      id: 1,
      name: "iPhone 15 Pro Max 256GB Natural Titanium",
      price: 1200000,
      quantity: 1,
      image: iphone15ProMax,
    },
    {
      id: 2,
      name: "AirPods Pro 2nd Generation USB-C",
      price: 250000,
      quantity: 2,
      image: airpodsPro2,
    },
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 5000;
  const total = subtotal + shipping;

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
            <span className="text-foreground">Shopping Cart</span>
          </div>
        </div>
      </div>

      <div className="container px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Shopping Cart ({cartItems.length} items)</h1>

        {cartItems.length === 0 ? (
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

              {cartItems.map((item) => (
                <Card key={item.id} className="border-border">
                  <CardContent className="p-4">
                    <div className="grid md:grid-cols-12 gap-4 items-center">
                      {/* Product Info */}
                      <div className="md:col-span-6 flex gap-4">
                        <div className="w-20 h-20 bg-muted rounded-lg overflow-hidden flex-shrink-0 border border-border">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-contain p-1"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-sm text-primary hover:underline cursor-pointer line-clamp-2">
                            {item.name}
                          </h3>
                          <button className="text-destructive text-xs flex items-center gap-1 mt-2 hover:underline">
                            <Trash2 className="h-3 w-3" /> Remove
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="md:col-span-2 text-center">
                        <p className="text-sm md:hidden text-muted-foreground mb-1">Price:</p>
                        <p className="font-bold">{formatPrice(item.price)}</p>
                      </div>

                      {/* Quantity */}
                      <div className="md:col-span-2 flex justify-center">
                        <div className="flex items-center border border-border rounded-lg">
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-l-lg rounded-r-none">
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="px-4 py-1 text-sm font-medium">{item.quantity}</span>
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-r-lg rounded-l-none">
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Total */}
                      <div className="md:col-span-2 text-right">
                        <p className="text-sm md:hidden text-muted-foreground mb-1">Total:</p>
                        <p className="font-bold text-primary">{formatPrice(item.price * item.quantity)}</p>
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
                <Button variant="ghost" className="text-destructive">
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
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Enter coupon code" 
                      className="rounded-full"
                    />
                    <Button className="rounded-full shrink-0">Apply</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Summary */}
              <Card className="border-border sticky top-24">
                <CardContent className="p-4">
                  <h2 className="text-lg font-bold mb-4">Order Summary</h2>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal ({cartItems.length} items)</span>
                      <span className="font-medium">{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-medium">{formatPrice(shipping)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Discount</span>
                      <span className="font-medium text-green-600">- {formatPrice(0)}</span>
                    </div>
                    
                    <div className="border-t border-border pt-3 mt-3">
                      <div className="flex justify-between">
                        <span className="text-lg font-bold">Total</span>
                        <span className="text-lg font-bold text-primary">{formatPrice(total)}</span>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full mt-6 rounded-full" size="lg">
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-4 w-4" />
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
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const OrderConfirmation = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardContent className="pt-6">
              <h1 className="text-3xl font-bold mb-3">Order Confirmed</h1>
              <p className="text-muted-foreground">Thanks for your order. A confirmation has been sent to your email.</p>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderConfirmation;

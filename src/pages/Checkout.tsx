import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const Checkout = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardContent className="pt-6">
              <h1 className="text-3xl font-bold mb-3">Checkout</h1>
              <p className="text-muted-foreground">Finalize your order details and complete your purchase.</p>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;

import { Target, Users, Award } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">About Anu Gadget</h1>
          <p className="text-xl text-muted-foreground mb-12">
            Your trusted partner for premium electronics and cutting-edge technology.
          </p>

          <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl mb-12" />

          <div className="prose prose-lg max-w-none mb-16">
            <p>
              Anu Gadget is Nigeria's leading online destination for authentic electronics and gadgets. 
              Since our inception, we've been committed to bringing the latest technology to your doorstep 
              with unmatched quality and service.
            </p>
            <p>
              We understand that technology is not just about devices—it's about experiences, connections, 
              and possibilities. That's why every product we offer is carefully selected, verified for 
              authenticity, and backed by our customer satisfaction guarantee.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Our Mission</h3>
              <p className="text-muted-foreground">
                To make premium technology accessible and affordable for everyone.
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Our Vision</h3>
              <p className="text-muted-foreground">
                To be Africa's most trusted electronics retailer.
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Our Values</h3>
              <p className="text-muted-foreground">
                Authenticity, quality, and exceptional customer service.
              </p>
            </div>
          </div>

          <div className="bg-muted rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4">Why Choose Anu Gadget?</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>100% authentic products with manufacturer warranty</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Competitive pricing and regular promotional offers</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Fast and reliable delivery across Nigeria</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Dedicated customer support team</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✓</span>
                <span>Secure payment options including Paystack integration</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;

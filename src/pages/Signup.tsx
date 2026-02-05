import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const Signup = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardContent className="pt-6">
              <h1 className="text-3xl font-bold mb-3">Create an Account</h1>
              <p className="text-muted-foreground">Sign up to track orders, manage your profile, and save your favorites.</p>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;

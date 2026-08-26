import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect } from "react";

const CarsGadgets = () => {
  useEffect(() => {
    document.title = "Gadgets — Anu Gadget";
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <div className="container py-20">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Gadgets</h1>
          <p className="text-muted-foreground mb-8">Explore phones, wearables and electronics with product-first animations.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map((i) => (
              <div key={i} className="p-6 rounded-xl bg-gradient-to-br from-white to-gray-100 shadow hover:scale-105 transform transition">
                <div className="h-40 bg-gradient-to-br from-pink-400 to-orange-300 rounded-md mb-4" />
                <h3 className="font-semibold">Product {i}</h3>
                <p className="text-sm text-muted-foreground">Short description and highlights.</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CarsGadgets;

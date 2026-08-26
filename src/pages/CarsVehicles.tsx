import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect } from "react";

const CarsVehicles = () => {
  useEffect(() => {
    // placeholder for car-specific entrance animations or data fetch
    document.title = "Vehicles — Anu Gadget";
  }, []);

  return (
    <div className="min-h-screen bg-blue-900 text-white">
      <Navbar />
      <div className="container py-20">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Vehicles</h1>
          <p className="text-muted-foreground mb-8">A dedicated vehicle section with immersive visuals and high-energy animations. Enjoy the blue-themed showroom.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-72 bg-gradient-to-br from-blue-800 via-blue-700 to-blue-900 rounded-xl shadow-2xl flex items-end p-6 transform hover:scale-105 transition">
              <div>
                <h3 className="text-2xl font-semibold">Premium Sedan</h3>
                <p className="text-sm text-muted-foreground">Sleek design and advanced features.</p>
              </div>
            </div>
            <div className="h-72 bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl shadow-2xl flex items-end p-6 transform hover:scale-105 transition">
              <div>
                <h3 className="text-2xl font-semibold">Sport Coupe</h3>
                <p className="text-sm text-muted-foreground">High performance and striking looks.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CarsVehicles;

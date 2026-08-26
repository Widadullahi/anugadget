import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSplit from "@/components/AnimatedSplit";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CarsLanding = () => {
  const [showSplit, setShowSplit] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <Navbar />
      <div className="container py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold mb-4">Welcome to Anu Vehicles & Gadgets</h1>
          <p className="text-lg mb-8 text-muted-foreground">Choose where to explore — high-tech gadgets or premium vehicles with cinematic experiences.</p>

          {!showSplit && (
            <div className="flex justify-center gap-6">
              <button onClick={() => setShowSplit(true)} className="px-8 py-6 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg hover:scale-105 transform transition">Explore Cars</button>
              <button onClick={() => setShowSplit(true)} className="px-8 py-6 bg-gradient-to-r from-pink-500 to-yellow-400 rounded-xl shadow-lg hover:scale-105 transform transition">Explore Gadgets</button>
              <button onClick={() => { setShowSplit(true); }} className="px-8 py-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl shadow-lg hover:scale-105 transform transition">Surprise Me</button>
            </div>
          )}

          {showSplit && (
            <div className="mt-12">
              <AnimatedSplit />
              <div className="mt-6 text-sm text-muted-foreground">You can switch between Gadgets and Vehicles from the section header once inside.</div>
              <div className="mt-4">
                <button className="text-sm underline" onClick={() => { setShowSplit(false); navigate(-1); }}>Back</button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CarsLanding;

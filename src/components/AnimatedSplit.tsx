import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface AnimatedSplitProps {
  onSelect?: (choice: "gadgets" | "vehicles") => void;
  initialVisible?: boolean;
}

export default function AnimatedSplit({ onSelect, initialVisible = true }: AnimatedSplitProps) {
  const [visible, setVisible] = useState(initialVisible);
  const navigate = useNavigate();

  const choose = (choice: "gadgets" | "vehicles") => {
    setVisible(false);
    setTimeout(() => {
      if (onSelect) onSelect(choice);
      if (choice === "vehicles") navigate("/cars/vehicles");
      else navigate("/cars/gadgets");
    }, 420);
  };

  return (
    <div className="relative w-full h-[420px] flex items-center justify-center">
      <div className={`absolute inset-0 bg-gradient-to-r from-[#0f172a] to-[#001219] opacity-60 rounded-lg transition-opacity ${visible ? 'opacity-60' : 'opacity-0'} `} />

      <div className="relative z-10 flex w-full max-w-5xl gap-6 px-6">
        <div
          onClick={() => choose("gadgets")}
          className={`flex-1 bg-white/5 backdrop-blur-md rounded-xl p-8 cursor-pointer transform transition-all duration-500 ease-out shadow-xl ${visible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'} hover:scale-105`}
        >
          <h2 className="text-2xl font-bold mb-2">Gadgets</h2>
          <p className="text-sm text-muted-foreground mb-4">Explore latest phones, wearables and electronics with vivid product displays.</p>
          <div className="h-40 rounded-md bg-gradient-to-br from-pink-500 to-yellow-400 shadow-inner animate-pulse" />
        </div>

        <div
          onClick={() => choose("vehicles")}
          className={`flex-1 bg-white/5 backdrop-blur-md rounded-xl p-8 cursor-pointer transform transition-all duration-500 ease-out shadow-xl ${visible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'} hover:scale-105`}
        >
          <h2 className="text-2xl font-bold mb-2">Vehicles</h2>
          <p className="text-sm text-muted-foreground mb-4">Discover cars with immersive visuals and high-energy animations.</p>
          <div className="h-40 rounded-md bg-gradient-to-br from-indigo-600 to-sky-400 shadow-inner" />
        </div>
      </div>
    </div>
  );
}

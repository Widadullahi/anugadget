import { Car, Gauge, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Vehicles = () => (
  <div className="min-h-screen bg-[#0b3d91] text-white">
    <Navbar />
    <main className="container py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-blue-200">Anu Vehicles</p>
        <h1 className="text-4xl font-black sm:text-6xl">Move with confidence.</h1>
        <p className="mt-5 max-w-2xl text-blue-100">Explore premium vehicles selected for striking design, comfort and performance.</p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { icon: Car, title: "Premium design", text: "Elegant silhouettes made to stand out." },
            { icon: Gauge, title: "Confident performance", text: "A composed drive for every journey." },
            { icon: ShieldCheck, title: "Trusted quality", text: "Thoughtful details from showroom to road." },
          ].map(({ icon: Icon, title, text }) => (
            <article key={title} className="border border-blue-300/30 bg-blue-800/60 p-6 shadow-xl">
              <Icon className="mb-6 h-9 w-9 text-[#f5d76e]" />
              <h2 className="text-xl font-bold">{title}</h2>
              <p className="mt-2 text-sm text-blue-100">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default Vehicles;

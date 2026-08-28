import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight, Phone } from "lucide-react";
import VehiclesFooter from "@/components/VehiclesFooter";
import { vehicles, vehicleCategories } from "@/data/vehicles";

const PAGE_SIZE = 8;

const Inventory = () => {
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () => (category === "All" ? vehicles : vehicles.filter((v) => v.category === category)),
    [category]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const pageItems = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  const pickFilter = (c: string) => {
    setCategory(c);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      {/* Top Nav */}
      <nav className="sticky top-0 z-50 bg-[#0f1012] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/vehicles" className="flex items-center gap-2">
            <img src="/whitelogo.png" alt="ANU GADGET" className="h-9 w-auto" />
            <span className="text-sm font-bold tracking-[0.2em] text-[#f5f5f0]">ANU GADGET</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link to="/vehicles" className="text-[11px] uppercase tracking-[0.2em] text-[#f5f5f0]/70 hover:text-[#cfa78a] transition-colors">
              Home
            </Link>
            <Link to="/vehicles" className="text-[11px] uppercase tracking-[0.2em] text-[#f5f5f0]/70 hover:text-[#cfa78a] transition-colors">
              Vehicles
            </Link>
            <Link to="/vehicles#contact" className="text-[11px] uppercase tracking-[0.2em] text-[#f5f5f0]/70 hover:text-[#cfa78a] transition-colors">
              Contact
            </Link>
          </div>
          <a
            href="tel:+2348127704308"
            className="hidden sm:flex items-center gap-2 text-[11px] uppercase tracking-wider text-[#cfa78a] border border-[#cfa78a]/40 px-4 py-2 hover:bg-[#cfa78a] hover:text-[#0f1012] transition-all"
          >
            <Phone className="h-3.5 w-3.5" />
            +234 812 770 4308
          </a>
        </div>
      </nav>

      {/* Store Hero Banner */}
      <section className="relative h-[42vh] min-h-[300px] w-full overflow-hidden flex items-center justify-center bg-[#0f1012]">
        <img src="/vehicle.png" alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1012] via-[#0f1012]/60 to-[#0f1012]/40" />
        <div className="relative z-10 text-center px-6">
          <p className="text-[#cfa78a] text-[10px] sm:text-xs uppercase tracking-[0.35em] font-medium mb-4">
            The Anu Gadget Showroom
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-semibold text-[#f5f5f0] leading-tight tracking-tight">
            Our Collection
            <span className="text-2xl sm:text-3xl md:text-4xl italic text-[#cfa78a] font-normal tracking-normal block mt-3">
              {vehicles.length} PREMIUM VEHICLES
            </span>
          </h1>
        </div>
      </section>

      {/* Store Body */}
      <section className="py-14 sm:py-20 relative bg-[#0f1012]">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Chips */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {vehicleCategories.map((c) => (
              <button
                key={c}
                onClick={() => pickFilter(c)}
                className={`px-5 py-2 text-[11px] uppercase tracking-wider transition-all ${
                  c === category
                    ? "bg-[#cfa78a] text-[#0f1012]"
                    : "border border-[#f5f5f0]/20 text-[#f5f5f0]/70 hover:border-[#cfa78a]/60 hover:text-[#cfa78a]"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Vehicle Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5" key={`${category}-${current}`}>
            {pageItems.map((vehicle, i) => (
              <div
                key={vehicle.id}
                className="group bg-[#17181b] border border-white/10 hover:border-[#cfa78a]/50 hover:shadow-xl hover:shadow-black/40 transition-all duration-500 overflow-hidden"
                style={{ animation: `inventoryReveal 0.5s ease-out ${0.08 * i}s both` }}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-black">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-full object-cover opacity-90 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#17181b]/80 to-transparent" />
                  <div className="absolute top-3 left-3 px-2.5 py-0.5 bg-[#cfa78a] text-[#0f1012] text-[10px] font-bold tracking-wider uppercase shadow-md">
                    {vehicle.category}
                  </div>
                  <div className="absolute top-3 right-3 px-2.5 py-0.5 bg-black/50 backdrop-blur-sm border border-[#cfa78a]/30 text-[#cfa78a] text-[10px] font-bold">
                    {vehicle.year}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-base font-bold text-[#f5f5f0] mb-1 group-hover:text-[#cfa78a] transition-colors leading-snug">
                    {vehicle.name}
                  </h3>
                  <p className="font-bold text-lg mb-4 text-[#cfa78a]">{vehicle.price}</p>

                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="text-center">
                      <p className="text-[10px] text-[#f5f5f0]/40 uppercase">Power</p>
                      <p className="text-xs font-bold text-[#f5f5f0]/80">{vehicle.power}</p>
                    </div>
                    <div className="text-center border-x border-white/10">
                      <p className="text-[10px] text-[#f5f5f0]/40 uppercase">Engine</p>
                      <p className="text-xs font-bold text-[#f5f5f0]/80">{vehicle.engine.split(" ")[0]}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] text-[#f5f5f0]/40 uppercase">0-100</p>
                      <p className="text-xs font-bold text-[#f5f5f0]/80">{vehicle.speed.split(" ").slice(-1)}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 py-2 bg-[#cfa78a]/10 border border-[#cfa78a]/40 text-[#cfa78a] text-[11px] font-bold tracking-wider uppercase hover:bg-[#cfa78a] hover:text-black transition-all">
                      Enquire
                    </button>
                    <button className="px-3 py-2 border border-white/10 text-[#f5f5f0]/50 text-[11px] hover:border-[#cfa78a]/40 hover:text-[#cfa78a] transition-all">
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {pageItems.length === 0 && (
            <p className="text-center text-[#f5f5f0]/50 text-sm py-20">No vehicles in this category yet.</p>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex flex-col items-center gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage(Math.max(1, current - 1))}
                  disabled={current === 1}
                  className="flex items-center gap-1 px-4 py-2 border border-[#f5f5f0]/20 text-[#f5f5f0]/70 text-[11px] uppercase tracking-wider hover:border-[#cfa78a]/60 hover:text-[#cfa78a] transition-all disabled:opacity-30 disabled:pointer-events-none"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                  Prev
                </button>

                {Array.from({ length: totalPages }, (_, n) => n + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-10 h-10 text-xs font-bold transition-all ${
                      p === current ? "bg-[#cfa78a] text-[#0f1012]" : "border border-[#f5f5f0]/20 text-[#f5f5f0]/70 hover:border-[#cfa78a]/60 hover:text-[#cfa78a]"
                    }`}
                  >
                    {p}
                  </button>
                ))}

                <button
                  onClick={() => setPage(Math.min(totalPages, current + 1))}
                  disabled={current === totalPages}
                  className="flex items-center gap-1 px-4 py-2 border border-[#f5f5f0]/20 text-[#f5f5f0]/70 text-[11px] uppercase tracking-wider hover:border-[#cfa78a]/60 hover:text-[#cfa78a] transition-all disabled:opacity-30 disabled:pointer-events-none"
                >
                  Next
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>

              <p className="text-[11px] text-[#f5f5f0]/40 uppercase tracking-wider">
                Showing {(current - 1) * PAGE_SIZE + 1}–{Math.min(current * PAGE_SIZE, filtered.length)} of {filtered.length} vehicles
              </p>
            </div>
          )}
        </div>
      </section>

      <style>{`
        @keyframes inventoryReveal {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <VehiclesFooter />
    </div>
  );
};

export default Inventory;
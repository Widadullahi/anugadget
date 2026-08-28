import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Phone,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import VehiclesFooter from "@/components/VehiclesFooter";
import {
  vehicles,
  vehicleBrands,
  vehicleCategories,
  vehicleFuels,
  vehicleTransmissions,
  vehicleDrives,
  vehicleYears,
} from "@/data/vehicles";

const PAGE_SIZE = 9;

const PRICE_RANGES = [
  { label: "Any Price", test: () => true },
  { label: "Under ₦50M", test: (p: number) => p < 50_000_000 },
  { label: "₦50M – ₦100M", test: (p: number) => p >= 50_000_000 && p < 100_000_000 },
  { label: "₦100M – ₦150M", test: (p: number) => p >= 100_000_000 && p < 150_000_000 },
  { label: "₦150M +", test: (p: number) => p >= 150_000_000 },
];

const brands = vehicleBrands;
const cats = vehicleCategories.slice(1);
const fuels = vehicleFuels;
const transmissions = vehicleTransmissions;
const drives = vehicleDrives;
const years = vehicleYears;

function Check({
  checked,
  label,
  onChange,
}: {
  checked: boolean;
  label: string;
  onChange: () => void;
}) {
  return (
    <label className="flex items-center gap-2.5 text-[13px] text-[#f5f5f0]/75 hover:text-[#f5f5f0] cursor-pointer transition-colors select-none">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-3.5 w-3.5 rounded-sm border-white/30 bg-transparent accent-[#cfa78a] cursor-pointer"
      />
      {label}
    </label>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="pb-5 mb-5 border-b border-white/10 last:border-b-0 last:mb-0 last:pb-0">
      <p className="text-[10px] uppercase tracking-[0.2em] text-[#cfa78a] font-semibold mb-3">{title}</p>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

const Inventory = () => {
  const [search, setSearch] = useState("");
  const [brandSel, setBrandSel] = useState<string[]>([]);
  const [catSel, setCatSel] = useState<string[]>([]);
  const [fuelSel, setFuelSel] = useState<string[]>([]);
  const [transSel, setTransSel] = useState<string[]>([]);
  const [driveSel, setDriveSel] = useState<string[]>([]);
  const [yearSel, setYearSel] = useState<number[]>([]);
  const [priceIdx, setPriceIdx] = useState(0);
  const [page, setPage] = useState(1);

  const toggle = (arr: string[], val: string, set: (a: string[]) => void) =>
    set(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);

  const toggleYear = (val: number) =>
    setYearSel((arr) => (arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]));

  const activeCount =
    (search.trim() ? 1 : 0) +
    brandSel.length +
    catSel.length +
    fuelSel.length +
    transSel.length +
    driveSel.length +
    yearSel.length +
    (priceIdx !== 0 ? 1 : 0);

  const clearAll = () => {
    setSearch("");
    setBrandSel([]);
    setCatSel([]);
    setFuelSel([]);
    setTransSel([]);
    setDriveSel([]);
    setYearSel([]);
    setPriceIdx(0);
    setPage(1);
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return vehicles.filter((car) => {
      if (q) {
        const hay = `${car.brand} ${car.model} ${car.name} ${car.category}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (brandSel.length && !brandSel.includes(car.brand)) return false;
      if (catSel.length && !catSel.includes(car.category)) return false;
      if (fuelSel.length && !fuelSel.includes(car.fuel)) return false;
      if (transSel.length && !transSel.includes(car.transmission)) return false;
      if (driveSel.length && !driveSel.includes(car.drive)) return false;
      if (yearSel.length && !yearSel.includes(car.year)) return false;
      if (!PRICE_RANGES[priceIdx].test(car.priceValue)) return false;
      return true;
    });
  }, [search, brandSel, catSel, fuelSel, transSel, driveSel, yearSel, priceIdx]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const pageItems = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  const FilterPanel = (
    <aside className="bg-[#17181b] border border-white/10 p-5 lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto">
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm font-bold text-[#f5f5f0] uppercase tracking-[0.15em] flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-[#cfa78a]" />
          Filters
          {activeCount > 0 && (
            <span className="px-1.5 py-0.5 bg-[#cfa78a] text-[#0f1012] text-[10px] font-bold rounded-full">
              {activeCount}
            </span>
          )}
        </p>
        {activeCount > 0 && (
          <button
            onClick={clearAll}
            className="text-[10px] uppercase tracking-wider text-[#cfa78a] hover:text-[#f5f5f0] transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#f5f5f0]/40" />
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          placeholder="Search brand or model..."
          className="w-full bg-[#0f1012] border border-white/10 pl-9 pr-3 py-2.5 text-sm text-[#f5f5f0] placeholder:text-[#f5f5f0]/35 focus:border-[#cfa78a]/60 outline-none transition-colors"
        />
      </div>

      <Group title="Brand">
        <div className="grid grid-cols-2 gap-x-3 gap-y-2">
          {brands.map((b) => (
            <Check key={b} checked={brandSel.includes(b)} label={b} onChange={() => {
              toggle(brandSel, b, setBrandSel);
              setPage(1);
            }} />
          ))}
        </div>
      </Group>

      <Group title="Body Type">
        {cats.map((c) => (
          <Check key={c} checked={catSel.includes(c)} label={c} onChange={() => {
            toggle(catSel, c, setCatSel);
            setPage(1);
          }} />
        ))}
      </Group>

      <Group title="Price Range">
        <div className="space-y-2">
          {PRICE_RANGES.map((r, i) => (
            <label key={r.label} className="flex items-center gap-2.5 text-[13px] text-[#f5f5f0]/75 hover:text-[#f5f5f0] cursor-pointer transition-colors select-none">
              <input
                type="radio"
                name="price"
                checked={priceIdx === i}
                onChange={() => {
                  setPriceIdx(i);
                  setPage(1);
                }}
                className="h-3.5 w-3.5 accent-[#cfa78a] cursor-pointer"
              />
              {r.label}
            </label>
          ))}
        </div>
      </Group>

      <Group title="Year">
        <div className="flex flex-wrap gap-2">
          {years.map((y) => (
            <button
              key={y}
              onClick={() => {
                toggleYear(y);
                setPage(1);
              }}
              className={`px-3 py-1.5 text-[11px] tracking-wider transition-all ${
                yearSel.includes(y)
                  ? "bg-[#cfa78a] text-[#0f1012]"
                  : "border border-white/15 text-[#f5f5f0]/70 hover:border-[#cfa78a]/60 hover:text-[#cfa78a]"
              }`}
            >
              {y}
            </button>
          ))}
        </div>
      </Group>

      <Group title="Fuel Type">
        {fuels.map((f) => (
          <Check key={f} checked={fuelSel.includes(f)} label={f} onChange={() => {
            toggle(fuelSel, f, setFuelSel);
            setPage(1);
          }} />
        ))}
      </Group>

      <Group title="Transmission">
        {transmissions.map((t) => (
          <Check key={t} checked={transSel.includes(t)} label={t} onChange={() => {
            toggle(transSel, t, setTransSel);
            setPage(1);
          }} />
        ))}
      </Group>

      <Group title="Drivetrain">
        {drives.map((d) => (
          <Check key={d} checked={driveSel.includes(d)} label={d} onChange={() => {
            toggle(driveSel, d, setDriveSel);
            setPage(1);
          }} />
        ))}
      </Group>
    </aside>
  );

  return (
    <div className="min-h-screen bg-[#0f1012] text-[#f5f5f0] overflow-x-hidden">
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
            <Link to="/inventory" className="text-[11px] uppercase tracking-[0.2em] text-[#cfa78a] transition-colors">
              Inventory
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
      <section className="relative h-[40vh] min-h-[300px] w-full overflow-hidden flex items-center justify-center bg-[#0f1012]">
        <img src="/sectionbackground.png" alt="" className="absolute inset-0 w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1012] via-[#0f1012]/40 to-[#0f1012]/30" />
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
      <section className="py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile results counter */}
          <div className="lg:hidden flex items-center justify-between mb-4">
            <p className="text-xs uppercase tracking-wider text-[#f5f5f0]/50">
              {filtered.length} {filtered.length === 1 ? "Vehicle" : "Vehicles"}
            </p>
            {activeCount > 0 && (
              <button onClick={clearAll} className="text-[10px] uppercase tracking-wider text-[#cfa78a] hover:text-[#f5f5f0] transition-colors">
                Clear filters
              </button>
            )}
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filter Sidebar */}
            <div className="w-full lg:w-64 shrink-0">
              {FilterPanel}
            </div>

            {/* Results */}
            <div className="flex-1 min-w-0">
              <div className="hidden lg:flex items-center justify-between mb-6">
                <p className="text-sm text-[#f5f5f0]/70">
                  Showing{" "}
                  <span className="text-[#cfa78a] font-bold">{filtered.length}</span>{" "}
                  {filtered.length === 1 ? "vehicle" : "vehicles"}
                </p>
                {activeCount > 0 && (
                  <button onClick={clearAll} className="text-[10px] uppercase tracking-wider text-[#cfa78a] hover:text-[#f5f5f0] transition-colors">
                    Clear all filters
                  </button>
                )}
              </div>

              {/* Vehicle Cards */}
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5" key={`${current}-${activeCount}`}>
                {pageItems.map((vehicle, i) => (
                  <div
                    key={vehicle.id}
                    className="group bg-[#17181b] border border-white/10 hover:border-[#cfa78a]/50 hover:shadow-xl hover:shadow-black/40 transition-all duration-500 overflow-hidden"
                    style={{ animation: `inventoryReveal 0.5s ease-out ${0.06 * i}s both` }}
                  >
                    <div className="relative h-48 overflow-hidden bg-black">
                      <img
                        src={vehicle.image}
                        alt={vehicle.name}
                        loading="lazy"
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

                    <div className="p-5">
                      <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#f5f5f0]/40 mb-1">
                        <span>{vehicle.brand}</span>
                        <span className="h-1 w-1 rounded-full bg-[#cfa78a]/60" />
                        <span>{vehicle.drive}</span>
                      </div>
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

              {pageItems.length === 0 && (
                <p className="text-center text-[#f5f5f0]/50 text-sm py-20">
                  No vehicles match your filters. Try widening your search.
                </p>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex flex-col items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
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
                          p === current
                            ? "bg-[#cfa78a] text-[#0f1012]"
                            : "border border-[#f5f5f0]/20 text-[#f5f5f0]/70 hover:border-[#cfa78a]/60 hover:text-[#cfa78a]"
                        }`}
                      >
                        {p}
                      </button>
                    ))}

                    <button
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      disabled={current === totalPages}
                      className="flex items-center gap-1 px-4 py-2 border border-[#f5f5f0]/20 text-[#f5f5f0]/70 text-[11px] uppercase tracking-wider hover:border-[#cfa78a]/60 hover:text-[#cfa78a] transition-all disabled:opacity-30 disabled:pointer-events-none"
                    >
                      Next
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <p className="text-[11px] text-[#f5f5f0]/40 uppercase tracking-wider">
                    Showing {(current - 1) * PAGE_SIZE + 1}–
                    {Math.min(current * PAGE_SIZE, filtered.length)} of {filtered.length} vehicles
                  </p>
                </div>
              )}
            </div>
          </div>
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
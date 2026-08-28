import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  LogOut,
  Menu,
  X,
  DollarSign,
  ArrowUpRight,
  ChevronRight,
  CarFront,
  Megaphone
} from "lucide-react";
import { getVehicleOptions, useVehicles } from "@/data/vehicleStore";
import type { Vehicle } from "@/data/vehicles";
import { usePromos } from "@/hooks/usePromos";
import type { PromoBanner } from "@/hooks/usePromos";
import { Switch } from "@/components/ui/switch";
import iphone15ProMax from "@/assets/iphone-15-pro-max.jpg";
import macbookProM3 from "@/assets/macbook-pro-m3.jpg";
import appleWatchUltra2 from "@/assets/apple-watch-ultra-2.jpg";
import airpodsPro2 from "@/assets/airpods-pro-2.jpg";
import logo from "@/assets/logo.png";

// Mock data
const statsData = [
  { title: "Total Revenue", value: "₦45,250,000", change: "+12.5%", trend: "up", icon: DollarSign },
  { title: "Total Orders", value: "1,234", change: "+8.2%", trend: "up", icon: ShoppingCart },
  { title: "Total Products", value: "156", change: "+3.1%", trend: "up", icon: Package },
  { title: "Total Customers", value: "2,847", change: "+15.3%", trend: "up", icon: Users }
];

const recentOrders = [
  { id: "ORD-001", customer: "Adebayo Johnson", email: "adebayo@email.com", amount: 1200000, status: "completed", date: "2024-01-19" },
  { id: "ORD-002", customer: "Chioma Okafor", email: "chioma@email.com", amount: 350000, status: "processing", date: "2024-01-19" },
  { id: "ORD-003", customer: "Emmanuel Nwachukwu", email: "emmanuel@email.com", amount: 800000, status: "pending", date: "2024-01-18" },
  { id: "ORD-004", customer: "Funke Adeyemi", email: "funke@email.com", amount: 250000, status: "completed", date: "2024-01-18" },
  { id: "ORD-005", customer: "Tunde Bakare", email: "tunde@email.com", amount: 2500000, status: "shipped", date: "2024-01-17" }
];

const initialProducts = [
  { id: 1, name: "iPhone 15 Pro Max 256GB", price: 1200000, stock: 15, category: "Phones", image: iphone15ProMax, status: "active" },
  { id: 2, name: "MacBook Pro M3 14-inch", price: 2500000, stock: 8, category: "Computing", image: macbookProM3, status: "active" },
  { id: 3, name: "Apple Watch Ultra 2", price: 800000, stock: 12, category: "Wearables", image: appleWatchUltra2, status: "active" },
  { id: 4, name: "AirPods Pro 2nd Gen", price: 250000, stock: 25, category: "Audio", image: airpodsPro2, status: "active" },
  { id: 5, name: "Samsung Galaxy S24 Ultra", price: 1100000, stock: 0, category: "Phones", image: iphone15ProMax, status: "out_of_stock" },
  { id: 6, name: "Dell XPS 15 Laptop", price: 2200000, stock: 5, category: "Computing", image: macbookProM3, status: "active" }
];

const customers = [
  { id: 1, name: "Adebayo Johnson", email: "adebayo@email.com", orders: 12, spent: 4500000, joined: "2023-06-15" },
  { id: 2, name: "Chioma Okafor", email: "chioma@email.com", orders: 8, spent: 2100000, joined: "2023-08-22" },
  { id: 3, name: "Emmanuel Nwachukwu", email: "emmanuel@email.com", orders: 5, spent: 1800000, joined: "2023-10-10" },
  { id: 4, name: "Funke Adeyemi", email: "funke@email.com", orders: 3, spent: 750000, joined: "2023-12-01" },
  { id: 5, name: "Tunde Bakare", email: "tunde@email.com", orders: 15, spent: 6200000, joined: "2023-04-20" }
];

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [productList, setProductList] = useState(initialProducts);
  const [settingsSaved, setSettingsSaved] = useState(false);
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [inventoryQty, setInventoryQty] = useState("1");
  const [inventoryMode, setInventoryMode] = useState<"sale" | "restock">("sale");
  const [inventoryProductId, setInventoryProductId] = useState<number | null>(null);
  const navigate = useNavigate();


  useEffect(() => {
    const stored = localStorage.getItem("anugadget_admin_products_v1");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProductList(parsed);
        }
      } catch {
        // ignore invalid storage
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("anugadget_admin_products_v1", JSON.stringify(productList));
  }, [productList]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-primary/10 text-primary";
      case "processing": return "bg-primary/15 text-primary";
      case "pending": return "bg-muted text-muted-foreground";
      case "shipped": return "bg-primary/20 text-primary";
      case "active": return "bg-primary/10 text-primary";
      case "out_of_stock": return "bg-destructive/10 text-destructive";
      default: return "bg-muted text-muted-foreground";
    }
  };


  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "orders", label: "Orders", icon: ShoppingCart },
    { id: "products", label: "Products", icon: Package },
    { id: "vehicles", label: "Vehicles", icon: CarFront },
    { id: "promos", label: "Promos", icon: Megaphone },
    { id: "customers", label: "Customers", icon: Users },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings }
  ];

  const handleDeleteProduct = (productId: number) => {
    if (!confirm("Delete this product?")) return;
    setProductList((prev) => prev.filter((p) => p.id !== productId));
  };

  // Inventory updates now handled via modal (offline sales + restock)

  const [settings, setSettings] = useState({
    storeName: "Anu Gadget",
    contactEmail: "Gbadamosia21@gmail.com",
    phoneNumber: "+234 812 770 4308",
    address: "3/9 Olukoleosho Ikeja Mokland Plaza",
  });

  useEffect(() => {
    const stored = localStorage.getItem("anugadget_admin_settings_v1");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setSettings({
          storeName: parsed?.storeName || "Anu Gadget",
          contactEmail: parsed?.contactEmail || "Gbadamosia21@gmail.com",
          phoneNumber: parsed?.phoneNumber || "+234 812 770 4308",
          address: parsed?.address || "3/9 Olukoleosho Ikeja Mokland Plaza",
        });
      } catch {
        // ignore
      }
    }
  }, []);

  const handleSaveSettings = () => {
    localStorage.setItem("anugadget_admin_settings_v1", JSON.stringify(settings));
    window.dispatchEvent(new Event("anugadget-settings-updated"));
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 1500);
  };

  const openInventoryModal = (productId: number, mode: "sale" | "restock") => {
    setInventoryProductId(productId);
    setInventoryMode(mode);
    setInventoryQty("1");
    setInventoryOpen(true);
  };

  const handleInventoryUpdate = () => {
    if (!inventoryProductId) return;
    const qty = Number(inventoryQty);
    if (Number.isNaN(qty) || qty <= 0) return;
    setProductList((prev) =>
      prev.map((p) => {
        if (p.id !== inventoryProductId) return p;
        const nextStock = inventoryMode === "sale" ? Math.max(0, p.stock - qty) : p.stock + qty;
        return {
          ...p,
          stock: nextStock,
          status: nextStock <= 0 ? "out_of_stock" : "active",
        };
      })
    );
    setInventoryOpen(false);
  };

  const [vehicles, saveVehicles] = useVehicles();
  const vehicleOpts = getVehicleOptions(vehicles);
  const vehicleFormDefaults = {
    brand: "",
    model: "",
    category: "",
    subtitle: "",
    highlight: "",
    priceValue: "",
    year: "",
    engine: "",
    power: "",
    speed: "",
    fuel: "",
    transmission: "",
    drive: "",
    features: "",
    images: [] as string[],
  };
  const [vehicleModalOpen, setVehicleModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [vehicleForm, setVehicleForm] = useState(vehicleFormDefaults);

  const openAddVehicle = () => {
    setEditingVehicle(null);
    setVehicleForm(vehicleFormDefaults);
    setVehicleModalOpen(true);
  };

  const openEditVehicle = (car: Vehicle) => {
    setEditingVehicle(car);
    setVehicleForm({
      brand: car.brand,
      model: car.model,
      category: car.category,
      subtitle: car.subtitle,
      highlight: car.highlight,
      priceValue: String(car.priceValue),
      year: String(car.year),
      engine: car.engine,
      power: car.power,
      speed: car.speed,
      fuel: car.fuel,
      transmission: car.transmission,
      drive: car.drive,
      features: car.features.join(", "),
      images: car.images && car.images.length > 0 ? car.images : [car.image],
    });
    setVehicleModalOpen(true);
  };

  const setVehicleField = (field: keyof typeof vehicleFormDefaults, value: string) =>
    setVehicleForm((prev) => ({ ...prev, [field]: value }));

  const setVehicleImage = (idx: number, value: string) =>
    setVehicleForm((prev) => ({
      ...prev,
      images: prev.images.map((img, i) => (i === idx ? value : img)),
    }));

  const addVehicleImage = () =>
    setVehicleForm((prev) => ({ ...prev, images: [...prev.images, ""] }));

  const removeVehicleImage = (idx: number) =>
    setVehicleForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== idx),
    }));

  const handleVehicleImagesUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const fileArray = Array.from(files);
    const dataUrls = await Promise.all(
      fileArray.map(
        (file) =>
          new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(String(reader.result));
            reader.onerror = () => reject(reader.error);
            reader.readAsDataURL(file);
          })
      )
    );
    setVehicleForm((prev) => ({
      ...prev,
      images: [...prev.images, ...dataUrls],
    }));
  };

  const handleDeleteVehicle = (car: Vehicle) => {
    if (!confirm(`Delete ${car.name} from the showroom?`)) return;
    saveVehicles(vehicles.filter((c) => c.id !== car.id));
  };

  const handleSaveVehicle = () => {
    const brand = vehicleForm.brand.trim() || "Unknown";
    const model = vehicleForm.model.trim() || "Model";
    const priceValue = Math.max(0, Number(vehicleForm.priceValue) || 0);
    const year = Number(vehicleForm.year) || new Date().getFullYear();
    const images = vehicleForm.images.map((i) => i.trim()).filter(Boolean);
    const image = images[0] || "/vehicle.png";
    const car: Vehicle = {
      id: editingVehicle?.id ?? (vehicles.length ? Math.max(...vehicles.map((c) => c.id)) + 1 : 1),
      brand,
      model,
      name: `${brand} ${model}`,
      category: vehicleForm.category.trim() || "Sedan",
      subtitle: vehicleForm.subtitle.trim(),
      highlight: vehicleForm.highlight.trim(),
      price: `₦${priceValue.toLocaleString("en-US")}`,
      priceValue,
      year,
      engine: vehicleForm.engine.trim(),
      power: vehicleForm.power.trim(),
      speed: vehicleForm.speed.trim(),
      fuel: vehicleForm.fuel.trim() || "Petrol",
      transmission: vehicleForm.transmission.trim() || "Automatic",
      drive: vehicleForm.drive.trim() || "AWD",
      features: vehicleForm.features.split(",").map((f) => f.trim()).filter(Boolean),
      image: image,
      images,
    };
    saveVehicles(
      editingVehicle
        ? vehicles.map((c) => (c.id === editingVehicle.id ? car : c))
        : [...vehicles, car]
    );
    setVehicleModalOpen(false);
    setEditingVehicle(null);
    setVehicleForm(vehicleFormDefaults);
  };

  const [promos, savePromos] = usePromos();
  const [promoDraft, setPromoDraft] = useState<PromoBanner[]>(promos);
  const [promoSaved, setPromoSaved] = useState(false);

  useEffect(() => {
    setPromoDraft(promos);
  }, [promos]);

  const setPromoField = (
    id: number,
    key: keyof Omit<PromoBanner, "id">,
    value: string | boolean
  ) =>
    setPromoDraft((prev) =>
      prev.map((b) => (b.id === id ? { ...b, [key]: value } : b))
    );

  const addPromo = () =>
    setPromoDraft((prev) => [
      ...prev,
      { id: Date.now(), title: "", description: "", buttonLabel: "Shop Now", link: "/shop", enabled: true },
    ]);

  const removePromo = (id: number) =>
    setPromoDraft((prev) => prev.filter((b) => b.id !== id));

  const handleSavePromos = () => {
    savePromos(promoDraft);
    setPromoSaved(true);
    setTimeout(() => setPromoSaved(false), 1500);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-50 h-full w-64 bg-background border-r border-border transform transition-transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="Anu Gadget" className="h-10 w-10 object-contain rounded" />
              <span className="font-bold text-xl text-primary">Admin</span>
            </Link>
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === item.id 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-border">
            <Link to="/">
              <Button variant="outline" className="w-full justify-start gap-3">
                <LogOut className="h-5 w-5" />
                Back to Store
              </Button>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-background border-b border-border">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                <Menu className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-bold capitalize">{activeTab}</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search..." 
                  className="pl-10 w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 md:p-6">
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {statsData.map((stat, idx) => (
                  <Card key={idx}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">{stat.title}</p>
                          <p className="text-2xl font-bold mt-1">{stat.value}</p>
                          <div className={`flex items-center gap-1 mt-2 text-sm ${stat.trend === 'up' ? 'text-primary' : 'text-destructive'}`}>
                            {stat.trend === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                            <span>{stat.change}</span>
                            <span className="text-muted-foreground">vs last month</span>
                          </div>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <stat.icon className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Recent Orders */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Recent Orders</CardTitle>
                  <Button variant="outline" size="sm" onClick={() => setActiveTab("orders")}>
                    View All <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentOrders.slice(0, 5).map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>{order.customer}</TableCell>
                          <TableCell>{formatPrice(order.amount)}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(order.status)}>
                              {order.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{order.date}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Top Selling Products</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {productList.slice(0, 4).map((product, idx) => (
                        <div key={product.id} className="flex items-center gap-4">
                          <span className="text-sm text-muted-foreground w-6">{idx + 1}.</span>
                          <img src={product.image} alt="" className="w-10 h-10 rounded object-cover" />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{product.name}</p>
                            <p className="text-sm text-muted-foreground">{formatPrice(product.price)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Low Stock Alert</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {productList.filter(p => p.stock <= 10).map((product) => (
                        <div key={product.id} className="flex items-center gap-4">
                          <img src={product.image} alt="" className="w-10 h-10 rounded object-cover" />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{product.name}</p>
                            <p className={`text-sm ${product.stock === 0 ? 'text-destructive' : 'text-primary'}`}>
                              {product.stock === 0 ? 'Out of stock' : `${product.stock} left`}
                            </p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openInventoryModal(product.id, "restock")}
                          >
                            Restock
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "orders" && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>All Orders</CardTitle>
                <div className="flex items-center gap-2">
                  <Input placeholder="Search orders..." className="w-64" />
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{order.email}</TableCell>
                        <TableCell>{formatPrice(order.amount)}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          {activeTab === "products" && (
            <>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>All Products</CardTitle>
                <Button className="bg-primary hover:bg-primary/90" onClick={() => navigate("/admin/login/add-product")}>
                  <Plus className="mr-2 h-4 w-4" /> Add Product
                </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {productList.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <img src={product.image} alt="" className="w-12 h-12 rounded object-cover" />
                              <span className="font-medium">{product.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>{formatPrice(product.price)}</TableCell>
                          <TableCell>{product.stock}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(product.status)}>
                              {product.status.replace("_", " ")}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => navigate(`/product/${product.id}`)}
                                title="View"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => navigate(`/admin/login/edit-product/${product.id}`)}
                                title="Edit"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => openInventoryModal(product.id, "sale")}
                                title="Record Offline Sale"
                              >
                                <ShoppingCart className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => openInventoryModal(product.id, "restock")}
                                title="Restock"
                              >
                                <Package className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-destructive"
                                onClick={() => handleDeleteProduct(product.id)}
                                title="Delete"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

            </>
          )}

          {activeTab === "vehicles" && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>All Vehicles</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {vehicles.length} vehicles in the showroom
                  </p>
                </div>
                <Button className="bg-primary hover:bg-primary/90" onClick={openAddVehicle}>
                  <Plus className="mr-2 h-4 w-4" /> Add Vehicle
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Vehicle</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Year</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vehicles.map((car) => (
                      <TableRow key={car.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <img
                              src={car.image}
                              alt=""
                              className="w-16 h-12 rounded-md object-cover"
                              onError={(e) => {
                                (e.currentTarget as HTMLImageElement).src = "/vehicle.png";
                              }}
                            />
                            <div>
                              <p className="font-medium">{car.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {car.subtitle ? car.subtitle : car.highlight}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{car.category}</TableCell>
                        <TableCell>{car.year}</TableCell>
                        <TableCell className="font-medium">{car.price}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openEditVehicle(car)}
                              title="Edit"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive"
                              onClick={() => handleDeleteVehicle(car)}
                              title="Delete"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          {activeTab === "customers" && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>All Customers</CardTitle>
                <Input placeholder="Search customers..." className="w-64" />
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Orders</TableHead>
                      <TableHead>Total Spent</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell className="font-medium">{customer.name}</TableCell>
                        <TableCell>{customer.email}</TableCell>
                        <TableCell>{customer.orders}</TableCell>
                        <TableCell>{formatPrice(customer.spent)}</TableCell>
                        <TableCell>{customer.joined}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          {activeTab === "analytics" && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Sales Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="h-64 flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <BarChart3 className="h-16 w-16 mx-auto mb-4 opacity-50" />
                      <p>Connect your analytics provider for real-time insights</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Trend</CardTitle>
                  </CardHeader>
                  <CardContent className="h-64 flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <TrendingUp className="h-16 w-16 mx-auto mb-4 opacity-50" />
                      <p>Connect your analytics provider for real-time insights</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "promos" && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between flex-wrap gap-3">
                <div>
                  <CardTitle>Promo & Banner Manager</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Edit the promotional banners shown on the storefront (e.g. "Power Deals").
                  </p>
                </div>
                <Button variant="outline" onClick={addPromo}>
                  <Plus className="mr-2 h-4 w-4" /> Add Banner
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {promoDraft.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                      <Megaphone className="h-12 w-12 mx-auto mb-3 opacity-40" />
                      <p>No banners yet. Add one to show a promo on the storefront.</p>
                    </div>
                  )}
                  {promoDraft.map((banner) => (
                    <div
                      key={banner.id}
                      className="p-5 border border-border rounded-lg space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Megaphone className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium text-sm">Banner #{banner.id}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <label className="flex items-center gap-2 text-sm text-muted-foreground">
                            Enabled
                            <Switch
                              checked={banner.enabled}
                              onCheckedChange={(v) => setPromoField(banner.id, "enabled", v)}
                            />
                          </label>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive"
                            onClick={() => removePromo(banner.id)}
                            title="Delete banner"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">Title</label>
                          <Input
                            value={banner.title}
                            onChange={(e) => setPromoField(banner.id, "title", e.target.value)}
                            placeholder="e.g. Power Deals"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Button Label</label>
                          <Input
                            value={banner.buttonLabel}
                            onChange={(e) => setPromoField(banner.id, "buttonLabel", e.target.value)}
                            placeholder="e.g. Hurry Now!"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="text-sm font-medium mb-2 block">Description</label>
                          <Input
                            value={banner.description}
                            onChange={(e) => setPromoField(banner.id, "description", e.target.value)}
                            placeholder="e.g. Never Go Dark Again | Power Stations Promo Up to 40% Discount"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="text-sm font-medium mb-2 block">Link</label>
                          <Input
                            value={banner.link}
                            onChange={(e) => setPromoField(banner.id, "link", e.target.value)}
                            placeholder="e.g. /shop?category=power"
                          />
                        </div>
                      </div>
                      {banner.enabled && banner.title && (
                        <div className="rounded-lg bg-primary p-4 text-primary-foreground text-center">
                          <p className="font-bold">{banner.title}</p>
                          <p className="text-sm opacity-90">{banner.description}</p>
                        </div>
                      )}
                    </div>
                  ))}
                  <div className="pt-2 border-t border-border flex items-center gap-3">
                    <Button className="bg-primary hover:bg-primary/90" onClick={handleSavePromos}>
                      Save Promos
                    </Button>
                    {promoSaved && (
                      <span className="text-sm text-primary font-medium">Saved.</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "settings" && (
            <Card>
              <CardHeader>
                <CardTitle>Store Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-medium mb-4">General Settings</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Store Name</label>
                      <Input
                        value={settings.storeName}
                        onChange={(e) => setSettings((prev) => ({ ...prev, storeName: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Contact Email</label>
                      <Input
                        value={settings.contactEmail}
                        onChange={(e) => setSettings((prev) => ({ ...prev, contactEmail: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Phone Number</label>
                      <Input
                        value={settings.phoneNumber}
                        onChange={(e) => setSettings((prev) => ({ ...prev, phoneNumber: e.target.value }))}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-sm font-medium mb-2 block">Address</label>
                      <Input
                        value={settings.address}
                        onChange={(e) => setSettings((prev) => ({ ...prev, address: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Currency</label>
                      <Input defaultValue="NGN" disabled />
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t border-border">
                  <div className="flex items-center gap-3">
                    <Button className="bg-primary hover:bg-primary/90" onClick={handleSaveSettings}>
                      Save Changes
                    </Button>
                    {settingsSaved && (
                      <span className="text-sm text-primary font-medium">Saved.</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Dialog open={inventoryOpen} onOpenChange={setInventoryOpen}>
            <DialogContent className="sm:max-w-[420px]">
              <DialogHeader>
                <DialogTitle>
                  {inventoryMode === "sale" ? "Record Offline Sale" : "Restock Inventory"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Quantity</label>
                  <Input
                    type="number"
                    min="1"
                    value={inventoryQty}
                    onChange={(e) => setInventoryQty(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter className="gap-2 sm:gap-0">
                <Button variant="outline" onClick={() => setInventoryOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-primary hover:bg-primary/90" onClick={handleInventoryUpdate}>
                  Save
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        <Dialog open={vehicleModalOpen} onOpenChange={setVehicleModalOpen}>
            <DialogContent className="sm:max-w-[680px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingVehicle ? `Edit Vehicle — ${editingVehicle.name}` : "Add Vehicle"}
                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-2">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Brand</Label>
                    <Input
                      list="admin-vehicle-brands"
                      value={vehicleForm.brand}
                      onChange={(e) => setVehicleField("brand", e.target.value)}
                      placeholder="e.g. Mercedes-Benz"
                    />
                    <datalist id="admin-vehicle-brands">
                      {vehicleOpts.brands.map((b) => (
                        <option key={b} value={b} />
                      ))}
                    </datalist>
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Model</Label>
                    <Input
                      value={vehicleForm.model}
                      onChange={(e) => setVehicleField("model", e.target.value)}
                      placeholder="e.g. G-Wagon"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Body Type</Label>
                    <Input
                      list="admin-vehicle-categories"
                      value={vehicleForm.category}
                      onChange={(e) => setVehicleField("category", e.target.value)}
                      placeholder="e.g. SUV"
                    />
                    <datalist id="admin-vehicle-categories">
                      {vehicleOpts.categories
                        .filter((c) => c !== "All")
                        .map((c) => (
                          <option key={c} value={c} />
                        ))}
                    </datalist>
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Year</Label>
                    <Input
                      type="number"
                      value={vehicleForm.year}
                      onChange={(e) => setVehicleField("year", e.target.value)}
                      placeholder="e.g. 2024"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Price (₦)</Label>
                    <Input
                      type="number"
                      value={vehicleForm.priceValue}
                      onChange={(e) => setVehicleField("priceValue", e.target.value)}
                      placeholder="e.g. 85000000"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Images</Label>
                    <div className="space-y-2">
                      {vehicleForm.images.length === 0 && (
                        <p className="text-xs text-muted-foreground">
                          No images yet — upload from your computer or add image paths below.
                        </p>
                      )}
                      {vehicleForm.images.map((img, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Input
                            value={img}
                            onChange={(e) => setVehicleImage(i, e.target.value)}
                            placeholder="/vehicles/gwagen.jpg or https://..."
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="shrink-0 text-destructive"
                            onClick={() => removeVehicleImage(i)}
                            title="Remove"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                    <Input
                      type="file"
                      accept="image/*"
                      multiple
                      className="mt-3"
                      onChange={(e) => handleVehicleImagesUpload(e.target.files)}
                    />
                    <div className="flex items-center gap-3 mt-3">
                      <Button type="button" variant="outline" size="sm" onClick={addVehicleImage}>
                        <Plus className="mr-1 h-3.5 w-3.5" /> Add image path
                      </Button>
                      <span className="text-xs text-muted-foreground">First image is the cover</span>
                    </div>
                    {vehicleForm.images.filter(Boolean).length > 0 && (
                      <div className="mt-3 grid grid-cols-5 gap-2">
                        {vehicleForm.images
                          .filter(Boolean)
                          .map((img, idx) => (
                            <img
                              key={idx}
                              src={img}
                              alt=""
                              className="h-16 w-full rounded-md object-cover border border-border"
                            />
                          ))}
                      </div>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Tagline</Label>
                    <Input
                      value={vehicleForm.subtitle}
                      onChange={(e) => setVehicleField("subtitle", e.target.value)}
                      placeholder="e.g. Icon. Legend."
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Highlight</Label>
                    <Input
                      value={vehicleForm.highlight}
                      onChange={(e) => setVehicleField("highlight", e.target.value)}
                      placeholder="e.g. OFF-ROAD ROYALTY"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Engine</Label>
                    <Input
                      value={vehicleForm.engine}
                      onChange={(e) => setVehicleField("engine", e.target.value)}
                      placeholder="e.g. 4.0L V8 Biturbo"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Power</Label>
                    <Input
                      value={vehicleForm.power}
                      onChange={(e) => setVehicleField("power", e.target.value)}
                      placeholder="e.g. 585 HP"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-2 block">0–100</Label>
                    <Input
                      value={vehicleForm.speed}
                      onChange={(e) => setVehicleField("speed", e.target.value)}
                      placeholder="e.g. 0-100 in 4.5s"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Fuel</Label>
                    <Input
                      list="admin-vehicle-fuels"
                      value={vehicleForm.fuel}
                      onChange={(e) => setVehicleField("fuel", e.target.value)}
                      placeholder="Petrol"
                    />
                    <datalist id="admin-vehicle-fuels">
                      {vehicleOpts.fuels.map((f) => (
                        <option key={f} value={f} />
                      ))}
                    </datalist>
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Transmission</Label>
                    <Input
                      list="admin-vehicle-transmissions"
                      value={vehicleForm.transmission}
                      onChange={(e) => setVehicleField("transmission", e.target.value)}
                      placeholder="Automatic"
                    />
                    <datalist id="admin-vehicle-transmissions">
                      {vehicleOpts.transmissions.map((t) => (
                        <option key={t} value={t} />
                      ))}
                    </datalist>
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Drivetrain</Label>
                    <Input
                      list="admin-vehicle-drives"
                      value={vehicleForm.drive}
                      onChange={(e) => setVehicleField("drive", e.target.value)}
                      placeholder="AWD"
                    />
                    <datalist id="admin-vehicle-drives">
                      {vehicleOpts.drives.map((d) => (
                        <option key={d} value={d} />
                      ))}
                    </datalist>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium mb-2 block">
                    Features <span className="text-muted-foreground font-normal">(comma separated)</span>
                  </Label>
                  <Textarea
                    value={vehicleForm.features}
                    onChange={(e) => setVehicleField("features", e.target.value)}
                    placeholder="AMG Line Package, Burmester Surround, MBUX Hyperscreen"
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter className="gap-2 sm:gap-0">
                <Button variant="outline" onClick={() => setVehicleModalOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-primary hover:bg-primary/90" onClick={handleSaveVehicle}>
                  {editingVehicle ? "Save Changes" : "Add Vehicle"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const ADMIN_STORAGE_KEY = "anugadget_admin_products_v1";

const productCategories = [
  "Phones",
  "Computing",
  "Wearables",
  "Audio",
  "Gaming",
  "Accessories",
  "Appliances",
  "Power Solutions",
  "Smart Home"
];

type AdminProduct = {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  image?: string;
  images?: string[];
  specifications?: Record<string, string>;
  features?: string[];
  status?: string;
  oldPrice?: number;
  imageUrl?: string;
};

const loadProducts = (): AdminProduct[] => {
  try {
    const raw = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const saveProducts = (products: AdminProduct[]) => {
  localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(products));
};

const AdminEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<AdminProduct | null>(null);
  const [form, setForm] = useState({
    name: "",
    category: "Phones",
    price: "",
    oldPrice: "",
    stock: "",
    imageUrl: "",
    images: [] as string[],
    specifications: "",
    features: ""
  });

  useEffect(() => {
    const products = loadProducts();
    const current = products.find((p) => String(p.id) === String(id));
    if (!current) {
      setLoading(false);
      return;
    }
    setProduct(current);
    setForm({
      name: current.name || "",
      category: current.category || "Phones",
      price: String(current.price ?? ""),
      oldPrice: current.oldPrice ? String(current.oldPrice) : "",
      stock: String(current.stock ?? ""),
      imageUrl: current.imageUrl || "",
      images: current.images || (current.image ? [current.image] : []),
      specifications: current.specifications
        ? Object.entries(current.specifications)
            .map(([key, value]) => `${key}: ${value}`)
            .join("\n")
        : "",
      features: current.features ? current.features.join("\n") : ""
    });
    setLoading(false);
  }, [id]);

  const handleImagesUpload = async (files: FileList | null) => {
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
    setForm((prev) => ({
      ...prev,
      images: [...prev.images, ...dataUrls],
    }));
  };

  const handleSave = (event: React.FormEvent) => {
    event.preventDefault();
    const priceValue = Number(form.price);
    const stockValue = Number(form.stock);
    const oldPriceValue = form.oldPrice ? Number(form.oldPrice) : undefined;

    if (!form.name.trim() || Number.isNaN(priceValue) || priceValue <= 0 || Number.isNaN(stockValue)) {
      return;
    }

    const specs =
      form.specifications
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .reduce<Record<string, string>>((acc, line) => {
          const [key, ...rest] = line.split(":");
          if (!key) return acc;
          const value = rest.join(":").trim();
          acc[key.trim()] = value || "—";
          return acc;
        }, {});

    const features = form.features
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const existing = loadProducts();
    const next = existing.map((item) => {
      if (String(item.id) !== String(id)) return item;
      const image = form.imageUrl.trim() || form.images[0] || item.image || "/placeholder.svg";
      const status = stockValue === 0 ? "out_of_stock" : "active";
      return {
        ...item,
        name: form.name.trim(),
        category: form.category,
        price: priceValue,
        oldPrice: oldPriceValue,
        stock: Math.max(0, stockValue),
        image,
        images: form.images.length > 0 ? form.images : item.images,
        specifications: Object.keys(specs).length > 0 ? specs : undefined,
        features: features.length > 0 ? features : undefined,
        status,
        imageUrl: form.imageUrl
      };
    });

    saveProducts(next);
    navigate("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-muted/30">
        <div className="container px-4 py-8">
          <Card className="max-w-3xl mx-auto">
            <CardContent className="py-16 text-center">
              <p className="text-muted-foreground">Loading product...</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-muted/30">
        <div className="container px-4 py-8">
          <Card className="max-w-3xl mx-auto">
            <CardContent className="py-16 text-center">
              <p className="text-muted-foreground">Product not found.</p>
              <Button className="mt-4" onClick={() => navigate("/admin/login")}>
                Back to Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container px-4 py-8">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Edit Product</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Product Name</label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g. Samsung Galaxy S24"
                  required
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <select
                    className="w-full border border-border rounded-md bg-background px-3 py-2 text-sm"
                    value={form.category}
                    onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
                  >
                    {productCategories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Stock</label>
                  <Input
                    type="number"
                    min="0"
                    value={form.stock}
                    onChange={(e) => setForm((prev) => ({ ...prev, stock: e.target.value }))}
                    placeholder="0"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Price (NGN)</label>
                  <Input
                    type="number"
                    min="0"
                    value={form.price}
                    onChange={(e) => setForm((prev) => ({ ...prev, price: e.target.value }))}
                    placeholder="1200000"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Old Price (optional)</label>
                  <Input
                    type="number"
                    min="0"
                    value={form.oldPrice}
                    onChange={(e) => setForm((prev) => ({ ...prev, oldPrice: e.target.value }))}
                    placeholder="1450000"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Image URL (optional)</label>
                <Input
                  value={form.imageUrl}
                  onChange={(e) => setForm((prev) => ({ ...prev, imageUrl: e.target.value }))}
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Upload Images</label>
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleImagesUpload(e.target.files)}
                />
                {form.images.length > 0 && (
                  <div className="mt-3 grid grid-cols-4 gap-2">
                    {form.images.map((img, idx) => (
                      <img key={idx} src={img} alt="" className="h-16 w-16 rounded object-cover border" />
                    ))}
                  </div>
                )}
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Specifications</label>
                <textarea
                  className="w-full border border-border rounded-md bg-background px-3 py-2 text-sm min-h-[120px]"
                  placeholder="Display: 6.7-inch\nRAM: 8GB\nStorage: 256GB"
                  value={form.specifications}
                  onChange={(e) => setForm((prev) => ({ ...prev, specifications: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Features</label>
                <textarea
                  className="w-full border border-border rounded-md bg-background px-3 py-2 text-sm min-h-[120px]"
                  placeholder="A17 Pro chip\nUSB-C fast charging\nProMotion display"
                  value={form.features}
                  onChange={(e) => setForm((prev) => ({ ...prev, features: e.target.value }))}
                />
              </div>
              <div className="flex items-center justify-between pt-2">
                <Button type="button" variant="outline" onClick={() => navigate("/admin/login")}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-primary hover:bg-primary/90">
                  Save Changes
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminEditProduct;

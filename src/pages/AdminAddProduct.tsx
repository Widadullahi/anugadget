import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  "Accessories"
];

const loadProducts = () => {
  try {
    const raw = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const saveProducts = (products: unknown[]) => {
  localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(products));
};

const AdminAddProduct = () => {
  const navigate = useNavigate();
  const [newProduct, setNewProduct] = useState({
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
    setNewProduct((prev) => ({
      ...prev,
      images: [...prev.images, ...dataUrls],
    }));
  };

  const handleAddProduct = (event: React.FormEvent) => {
    event.preventDefault();
    const priceValue = Number(newProduct.price);
    const stockValue = Number(newProduct.stock);
    const oldPriceValue = newProduct.oldPrice ? Number(newProduct.oldPrice) : undefined;

    if (!newProduct.name.trim() || Number.isNaN(priceValue) || priceValue <= 0 || Number.isNaN(stockValue)) {
      return;
    }

    const status = stockValue === 0 ? "out_of_stock" : "active";
    const image = newProduct.imageUrl.trim() || newProduct.images[0] || "/placeholder.svg";
    const specs =
      newProduct.specifications
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
    const features = newProduct.features
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const existing = loadProducts();
    const next = [
      {
        id: Date.now(),
        name: newProduct.name.trim(),
        price: priceValue,
        stock: Math.max(0, stockValue),
        category: newProduct.category,
        image,
        images: newProduct.images.length > 0 ? newProduct.images : [image],
        specifications: Object.keys(specs).length > 0 ? specs : undefined,
        features: features.length > 0 ? features : undefined,
        status,
        oldPrice: oldPriceValue
      },
      ...existing
    ];

    saveProducts(next);
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container px-4 py-8">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Add New Product</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Product Name</label>
                <Input
                  value={newProduct.name}
                  onChange={(e) => setNewProduct((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g. Samsung Galaxy S24"
                  required
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <select
                    className="w-full border border-border rounded-md bg-background px-3 py-2 text-sm"
                    value={newProduct.category}
                    onChange={(e) => setNewProduct((prev) => ({ ...prev, category: e.target.value }))}
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
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct((prev) => ({ ...prev, stock: e.target.value }))}
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
                    value={newProduct.price}
                    onChange={(e) => setNewProduct((prev) => ({ ...prev, price: e.target.value }))}
                    placeholder="1200000"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Old Price (optional)</label>
                  <Input
                    type="number"
                    min="0"
                    value={newProduct.oldPrice}
                    onChange={(e) => setNewProduct((prev) => ({ ...prev, oldPrice: e.target.value }))}
                    placeholder="1450000"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Image URL (optional)</label>
                <Input
                  value={newProduct.imageUrl}
                  onChange={(e) => setNewProduct((prev) => ({ ...prev, imageUrl: e.target.value }))}
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
                {newProduct.images.length > 0 && (
                  <div className="mt-3 grid grid-cols-4 gap-2">
                    {newProduct.images.map((img, idx) => (
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
                  value={newProduct.specifications}
                  onChange={(e) => setNewProduct((prev) => ({ ...prev, specifications: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Features</label>
                <textarea
                  className="w-full border border-border rounded-md bg-background px-3 py-2 text-sm min-h-[120px]"
                  placeholder="A17 Pro chip\nUSB-C fast charging\nProMotion display"
                  value={newProduct.features}
                  onChange={(e) => setNewProduct((prev) => ({ ...prev, features: e.target.value }))}
                />
              </div>
              <div className="flex items-center justify-between pt-2">
                <Button type="button" variant="outline" onClick={() => navigate("/admin/login")}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-primary hover:bg-primary/90">
                  Save Product
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminAddProduct;

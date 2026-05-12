"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { menuItems as initialItems } from "@/data/menu";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";

export default function AdminProductsPage() {
  const { data: session } = useSession();
  const [products, setProducts] = useState(initialItems);
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
    description: "",
  });
  const { t } = useTranslation();
  const router = useRouter();

  if (!session || session.user.role !== "admin") {
    router.push("/");
    return null;
  }

  const addProduct = () => {
    if (!form.name || !form.price) return;
    setProducts([
      ...products,
      {
        ...form,
        id: Date.now(),
        nameAr: form.name,
        price: parseFloat(form.price),
      },
    ]);
    setForm({ name: "", price: "", category: "", image: "", description: "" });
  };

  const deleteProduct = (id) =>
    setProducts(products.filter((p) => p.id !== id));

  return (
    <div className="text-black">
      <h1 className="text-2xl font-bold mb-6 ">{t("manageProducts")}</h1>
      <div className="bg-white rounded-2xl p-6 shadow mb-6">
        <h2 className="font-bold mb-4">{t("addProduct")}</h2>
        <div className="grid grid-cols-2 gap-3">
          {["name", "price", "category", "image", "description"].map(
            (field) => (
              <input
                key={field}
                placeholder={t(field) || field}
                value={form[field]}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                className={`border rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 placeholder:text-gray-400 ${field === "description" ? "col-span-2" : ""}`}
              />
            ),
          )}
        </div>
        <button
          onClick={addProduct}
          className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-xl font-semibold hover:bg-orange-600 transition"
        >
          {t("addProduct")}
        </button>
      </div>

      <div className="space-y-3">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-2xl p-4 shadow flex items-center gap-4"
          >
            <img
              src={p.image}
              alt={p.name}
              className="w-14 h-14 rounded-lg object-cover"
              onError={(e) => (e.target.src = "/images/placeholder.jpg")}
            />
            <div className="flex-1">
              <p className="font-bold">{p.name}</p>
              <p className="text-orange-500 text-sm font-semibold">
                ${p.price} · {p.category}
              </p>
            </div>
            <button
              onClick={() => deleteProduct(p.id)}
              className="text-red-400 hover:text-red-600 text-sm font-medium"
            >
              {t("deleteProduct")}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

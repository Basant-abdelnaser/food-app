"use client";
import { useState } from "react";
import { menuItems, categories } from "@/data/menu";
import MenuCard from "@/components/MenuCard";
import { useTranslation } from "react-i18next";

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const { t } = useTranslation();
  const filtered =
    activeCategory === "All"
      ? menuItems
      : menuItems.filter((i) => i.category === activeCategory);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{t("menu")}</h1>
      <div className="flex gap-2 flex-wrap mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition ${activeCategory === cat ? "bg-orange-500 text-white" : "bg-white text-gray-600 hover:bg-orange-50"}`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

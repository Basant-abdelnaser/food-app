"use client";
import { useCartStore } from "@/store/cartStore";
import { useTranslation } from "react-i18next";

export default function MenuCard({ item }) {
  const addItem = useCartStore((s) => s.addItem);
  const { t, i18n } = useTranslation();
  const name = i18n.language === "ar" ? item.nameAr : item.name;

  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden">
      <img
        src={item.image}
        alt={name}
        className="w-full h-44 object-cover"
        onError={(e) => (e.target.src = "/images/placeholder.jpg")}
      />
      <div className="p-4">
        <h3 className="font-bold text-lg text-black">{name}</h3>
        <p className="text-gray-500 text-sm mt-1">{item.description}</p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-orange-500 font-bold text-lg">
            ${item.price}
          </span>
          <button
            onClick={() => addItem(item)}
            className="bg-orange-500 text-white px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-orange-600 transition"
          >
            {t("addToCart")}
          </button>
        </div>
      </div>
    </div>
  );
}

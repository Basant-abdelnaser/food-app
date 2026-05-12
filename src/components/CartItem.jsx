"use client";

import { useCartStore } from "@/store/cartStore";
import { useTranslation } from "react-i18next";
import { Trash2 } from "lucide-react";

export default function CartItem({ item }) {
  const { updateQty, removeItem } = useCartStore();
  const { i18n, t } = useTranslation();

  const name = i18n.language === "ar" ? item.nameAr : item.name;

  return (
    <div className="group flex items-center gap-4 bg-white border border-gray-100 hover:border-orange-200 p-4 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300">
      {/* Product Image */}
      <div className="relative">
        <img
          src={item.image}
          alt={name}
          className="w-24 h-24 rounded-2xl object-cover shadow-md"
          onError={(e) => {
            e.target.src = "/images/placeholder.jpg";
          }}
        />

        <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full shadow">
          x{item.qty}
        </div>
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-lg text-gray-800 truncate">{name}</h3>

        <p className="text-sm text-gray-400 mt-1">
          ${item.price.toFixed(2)} each
        </p>

        <div className="mt-3 flex items-center gap-3">
          {/* Quantity Controls */}
          <div className="flex items-center bg-gray-100 rounded-2xl p-1">
            <button
              onClick={() => updateQty(item.id, item.qty - 1)}
              className="w-8 h-8 rounded-xl bg-white shadow-sm hover:bg-orange-50 hover:text-orange-500 transition font-bold text-black"
            >
              -
            </button>

            <span className="w-10 text-center font-semibold text-gray-700">
              {item.qty}
            </span>

            <button
              onClick={() => updateQty(item.id, item.qty + 1)}
              className="w-8 h-8 rounded-xl bg-white shadow-sm hover:bg-orange-50 hover:text-orange-500 transition font-bold text-black"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex flex-col items-end justify-between h-full">
        {/* Total Price */}
        <div className="text-right">
          <p className="text-xs text-gray-400">{t("total") || "Total"}</p>

          <p className="text-xl font-extrabold text-orange-500">
            ${(item.price * item.qty).toFixed(2)}
          </p>
        </div>

        {/* Remove Button */}
        <button
          onClick={() => removeItem(item.id)}
          className="mt-4 flex items-center gap-1 text-sm text-red-400 hover:text-red-600 hover:bg-red-50 px-3 py-2 rounded-xl transition"
        >
          <Trash2 size={16} />
          Remove
        </button>
      </div>
    </div>
  );
}

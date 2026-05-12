"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { useOrderStore } from "@/store/orderStore";
import CartItem from "@/components/CartItem";
import { useTranslation } from "react-i18next";

export default function CartPage() {
  const { data: session } = useSession();
  const { items, getTotal, clearCart } = useCartStore();
  const { placeOrder } = useOrderStore();
  const [payment, setPayment] = useState("cash");
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();

  const handleOrder = () => {
    if (!session) {
      router.push("/login");
      return;
    }
    placeOrder(items, getTotal(), payment, session.user.email);
    clearCart();
    setSuccess(true);
  };

  if (success)
    return (
      <div className="text-center mt-20">
        <p className="text-5xl mb-4">🎉</p>
        <h2 className="text-2xl font-bold text-orange-500">
          {t("orderPlaced")}
        </h2>
        <button
          onClick={() => {
            setSuccess(false);
            router.push("/orders");
          }}
          className="mt-6 bg-orange-500 text-white px-6 py-2 rounded-full font-semibold"
        >
          {t("orders")}
        </button>
      </div>
    );

  if (items.length === 0)
    return (
      <div className="text-center mt-20 text-gray-400">
        <p className="text-5xl mb-4">🛒</p>
        <p className="text-xl">{t("emptyCart")}</p>
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">{t("cart")}</h1>
      <div className="space-y-3 mb-6">
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <div className="bg-white rounded-2xl p-6 shadow text-black">
        <div className="flex justify-between font-bold text-lg mb-4">
          <span>{t("total")}</span>
          <span className="text-orange-500">${getTotal().toFixed(2)}</span>
        </div>
        <p className="font-semibold mb-2">{t("paymentMethod")}</p>
        <div className="flex gap-3 mb-4">
          {["cash", "online"].map((method) => (
            <button
              key={method}
              onClick={() => setPayment(method)}
              className={`flex-1 py-2 rounded-xl border-2 font-semibold text-sm transition ${payment === method ? "border-orange-500 bg-orange-50 text-orange-600" : "border-gray-200"}`}
            >
              {method === "cash"
                ? `💵 ${t("cashOnDelivery")}`
                : `💳 ${t("payOnline")}`}
            </button>
          ))}
        </div>
        {payment === "online" && (
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-4 text-sm text-orange-700 text-center">
            💳 Payment gateway integration goes here (Stripe / PayMob / etc.)
          </div>
        )}
        <button
          onClick={handleOrder}
          className="w-full bg-orange-500 text-white py-3 rounded-xl font-bold hover:bg-orange-600 transition"
        >
          {t("placeOrder")}
        </button>
      </div>
    </div>
  );
}

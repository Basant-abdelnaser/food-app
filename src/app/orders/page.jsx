"use client";
import { useSession } from "next-auth/react";
import { useOrderStore } from "@/store/orderStore";
import OrderStatus from "@/components/OrderStatus";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";

export default function OrdersPage() {
  const { data: session } = useSession();
  const { orders, getUserOrders } = useOrderStore();
  const { t, i18n } = useTranslation();
  const router = useRouter();

  if (!session) {
    router.push("/login");
    return null;
  }

  const myOrders =
    session.user.role === "admin" ? orders : getUserOrders(session.user.email);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{t("orders")}</h1>
      {myOrders.length === 0 ? (
        <p className="text-gray-400 text-center mt-20">No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {myOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-2xl p-5 shadow">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-black">Order #{order.id}</p>
                  <p className="text-sm text-gray-400">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                  <p className="text-sm mt-1 text-orange-500">
                    {order.items.length} items ·{" "}
                    <span className="text-orange-500 font-bold">
                      ${order.total.toFixed(2)}
                    </span>
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {order.paymentMethod === "cash"
                      ? `💵 ${t("cashOnDelivery")}`
                      : `💳 ${t("payOnline")}`}
                  </p>
                </div>
                <span
                  className={`text-xs text-black  font-semibold px-3 py-1 rounded-full  ${order.status === "delivered" ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-600"}`}
                >
                  {t(order.status)}
                </span>
              </div>
              <OrderStatus status={order.status} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

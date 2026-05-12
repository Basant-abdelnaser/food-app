"use client";
import { useSession } from "next-auth/react";
import { useOrderStore } from "@/store/orderStore";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import Link from "next/link";

const STATUSES = ["pending", "preparing", "outForDelivery", "delivered"];

export default function AdminPage() {
  const { data: session } = useSession();
  const { orders, updateStatus } = useOrderStore();
  const { t } = useTranslation();
  const router = useRouter();

  if (!session || session.user.role !== "admin") {
    router.push("/");
    return null;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">{t("admin")} Dashboard</h1>
        <Link
          href="/admin/products"
          className="bg-orange-500 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-orange-600"
        >
          {t("manageProducts")}
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-2xl p-5 shadow text-center">
          <p className="text-3xl font-bold text-orange-500">{orders.length}</p>
          <p className="text-gray-500 text-sm mt-1">Total Orders</p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow text-center">
          <p className="text-3xl font-bold text-green-500">
            {orders.filter((o) => o.status === "delivered").length}
          </p>
          <p className="text-gray-500 text-sm mt-1">{t("delivered")}</p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow text-center">
          <p className="text-3xl font-bold text-blue-500">
            ${orders.reduce((sum, o) => sum + o.total, 0).toFixed(2)}
          </p>
          <p className="text-gray-500 text-sm mt-1">Total Revenue</p>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-4">{t("manageOrders")}</h2>
      {orders.length === 0 ? (
        <p className="text-gray-400">No orders yet.</p>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl p-4 shadow flex items-center justify-between"
            >
              <div>
                <p className="font-bold text-black">Order #{order.id}</p>
                <p className="text-sm text-gray-400">
                  {order.userEmail} · ${order.total.toFixed(2)}
                </p>
              </div>
              <select
                value={order.status}
                onChange={(e) => updateStatus(order.id, e.target.value)}
                className="border rounded-xl px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-300 text-black"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {t(s)}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

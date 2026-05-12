"use client";
import { useTranslation } from "react-i18next";

const STEPS = ["pending", "preparing", "outForDelivery", "delivered"];
const ICONS = {
  pending: "🕐",
  preparing: "👨‍🍳",
  outForDelivery: "🛵",
  delivered: "✅",
};

export default function OrderStatus({ status }) {
  const { t } = useTranslation();
  const currentIndex = STEPS.indexOf(status);

  return (
    <div className="flex items-center gap-2 mt-3">
      {STEPS.map((step, i) => (
        <div key={step} className="flex items-center gap-1">
          <div
            className={`flex flex-col items-center ${i <= currentIndex ? "text-orange-500" : "text-gray-300"}`}
          >
            <span className="text-xl">{ICONS[step]}</span>
            <span className="text-xs font-medium">{t(step)}</span>
          </div>
          {i < STEPS.length - 1 && (
            <div
              className={`h-0.5 w-8 mx-1 ${i < currentIndex ? "bg-orange-500" : "bg-gray-200"}`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

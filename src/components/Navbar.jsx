"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useCartStore } from "@/store/cartStore";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const { data: session } = useSession();
  const items = useCartStore((s) => s.items);
  const { t } = useTranslation();
  const cartCount = items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <nav className="bg-orange-500 text-white px-6 py-4 flex items-center justify-between shadow">
      <Link href="/" className="text-2xl font-bold">
        🍔 FoodApp
      </Link>
      <div className="flex items-center gap-4 text-sm font-medium">
        <Link href="/">{t("menu")}</Link>
        <Link href="/cart" className="relative">
          {t("cart")}
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-white text-orange-500 rounded-full text-xs w-5 h-5 flex items-center justify-center font-bold">
              {cartCount}
            </span>
          )}
        </Link>
        {session ? (
          <>
            <Link href="/orders">{t("orders")}</Link>
            {session.user.role === "admin" && (
              <Link href="/admin">{t("admin")}</Link>
            )}
            <button
              onClick={() => signOut()}
              className="bg-white text-orange-500 px-3 py-1 rounded-full font-semibold"
            >
              {t("logout")}
            </button>
          </>
        ) : (
          <Link
            href="/login"
            className="bg-white text-orange-500 px-3 py-1 rounded-full font-semibold"
          >
            {t("login")}
          </Link>
        )}
        <LanguageSwitcher />
      </div>
    </nav>
  );
}

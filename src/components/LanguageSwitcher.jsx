"use client";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const toggle = () => {
    const next = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(next);
    document.documentElement.dir = next === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = next;
  };
  return (
    <button
      onClick={toggle}
      className="bg-white text-orange-500 px-3 py-1 rounded-full font-semibold text-xs"
    >
      {i18n.language === "en" ? "عربي" : "EN"}
    </button>
  );
}

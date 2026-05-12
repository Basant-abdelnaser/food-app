"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { t } = useTranslation();

  const handleLogin = async () => {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (res?.error) setError("Invalid email or password");
    else router.push("/");
  };

  return (
    <div className="max-w-md mx-auto mt-16 bg-white p-8 rounded-2xl shadow text-orange-500">
      <h1 className="text-2xl font-bold mb-6 text-center text-orange-500">🍔 {t("login")}</h1>
      {error && (
        <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
      )}
      <div className="space-y-4">
        <input
          type="email"
          placeholder={t("email")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-300"
        />
        <input
          type="password"
          placeholder={t("password")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-300"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-orange-500 text-white py-3 rounded-xl font-bold hover:bg-orange-600 transition"
        >
          {t("login")}
        </button>
      </div>
      <div className="mt-6 text-xs text-gray-400 text-center">
        <p>Demo: admin@food.com / admin123</p>
        <p>Demo: user@food.com / user123</p>
      </div>
    </div>
  );
}

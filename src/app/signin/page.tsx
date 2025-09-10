"use client";
import React, { useState } from "react";
import Link from "next/link";
import ElectricBorder from "@/Component/ElectricBorder/page";
import { useRouter } from "next/navigation";

export default function SigninPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/Signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Invalid email or password.");
        return;
      }

      // حفظ المستخدم وtoken
      localStorage.setItem("token", data.token);
      localStorage.setItem("currentUser", JSON.stringify(data.user));

      router.push("/home");
    } catch (err) {
      console.error("Sign in failed", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 sm:px-0">
      <div className="eb-content bg-white hover:shadow-2xl rounded-lg p-6 sm:p-8 flex flex-col items-center w-full max-w-sm">
        <ElectricBorder color="#FFB300" className="w-full rounded-2xl">
          <h1 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2 text-amber-500">Sign In</h1>
          <h2 className="text-base sm:text-lg mb-4 sm:mb-6 text-gray-600">Welcome back</h2>

          <form onSubmit={handleSignin} className="w-full flex flex-col">
            <input
              placeholder="Enter your email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 sm:px-4 h-10 mb-3 sm:mb-4 border border-gray-300 rounded"
              required
            />
            <input
              placeholder="Enter your password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 sm:px-4 h-10 mb-3 sm:mb-4 border border-gray-300 rounded"
              required
            />

            {error && <p className="text-sm text-red-600 mb-2">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-400 hover:bg-amber-500 text-white font-semibold py-2 rounded transition disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-3 sm:mt-4 text-center text-sm sm:text-base">
            Don't have an account?{" "}
            <Link href="/" className="text-amber-500 hover:underline">Sign up</Link>
          </div>
        </ElectricBorder>
      </div>
    </div>
  );
}


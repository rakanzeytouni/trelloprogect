"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmError, setConfirmError] = useState<string | null>(null);

  // Handlers
  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setName(val);
    if (val.trim().length < 5) {
      setNameError("Name must be at least 5 characters.");
    } else {
      setNameError(null);
    }
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPassword(val);
    if (val.length < 8) {
      setPasswordError("Password must be at least 8 characters.");
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(val)) {
      setPasswordError("Password must include at least one special character.");
    } else {
      setPasswordError(null);
    }
  };

  const handleConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setConfirm(val);
    if (val !== password) {
      setConfirmError("Passwords do not match!");
    } else {
      setConfirmError(null);
    }
  };

  // Button condition
  const canSubmit =
    name.trim().length >= 5 &&
    email.trim().length > 0 &&
    password.length >= 8 &&
    /[!@#$%^&*(),.?":{}|<>]/.test(password) &&
    confirm === password &&
    !nameError &&
    !passwordError &&
    !confirmError;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Final validation before submission
    if (!canSubmit) {
      if (name.trim().length < 5) {
        setNameError("Name must be at least 5 characters.");
      }
      if (password.length < 8) {
        setPasswordError("Password must be at least 8 characters.");
      }
      if (confirm !== password) {
        setConfirmError("Passwords do not match!");
      }
      return;
    }

    const payload = { name, email, password, confirmPassword: confirm };

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        return;
      }

      // Store user data and token
      localStorage.setItem("currentUser", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      router.push("/home");
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold text-amber-500 text-center mb-6">Sign Up</h1>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form className="flex flex-col" onSubmit={handleSubmit}>
          <input
            name="name"
            value={name}
            onChange={handleName}
            placeholder="Name"
            required
            className="mb-3 px-4 h-12 border rounded-lg focus:outline-none focus:ring-amber-300 focus:border-amber-400"
          />
          {nameError && <p className="text-red-600 text-sm mb-2">{nameError}</p>}

          <input
            name="email"
            value={email}
            onChange={handleEmail}
            placeholder="Email"
            required
            type="email"
            className="mb-3 px-4 h-12 border rounded-lg focus:outline-none focus:ring-amber-300 focus:border-amber-400"
          />

          <input
            name="password"
            value={password}
            onChange={handlePassword}
            placeholder="Password"
            required
            type="password"
            className="mb-3 px-4 h-12 border rounded-lg focus:outline-none focus:ring-amber-300 focus:border-amber-400"
          />
          {passwordError && <p className="text-red-600 text-sm mb-2">{passwordError}</p>}

          <input
            name="confirmPassword"
            value={confirm}
            onChange={handleConfirm}
            placeholder="Confirm Password"
            required
            type="password"
            className="mb-3 px-4 h-12 border rounded-lg focus:outline-none focus:ring-amber-300 focus:border-amber-400"
          />
          {confirmError && <p className="text-red-600 text-sm mb-2">{confirmError}</p>}

          <button
            type="submit"
            disabled={!canSubmit}
            className="bg-amber-400 hover:bg-amber-500 text-white py-3 rounded-lg font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <Link href="/signin" className="text-amber-400 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
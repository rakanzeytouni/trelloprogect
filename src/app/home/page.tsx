"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../Component/navbar/page";
import Footer from "@/Component/footer/page";

// ✅ No need to import CreateBoard if you're using fetch to /api/create-board

export default function Home() {
  const [showTitle, setShowTitle] = useState(false);
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<null | { id: string; Name: string; email: string; password: string }>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) setCurrentUser(JSON.parse(storedUser));
  }, []);

  // ✅ PLACE handleSubmit HERE — inside the component
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;

    if (!title || !currentUser?.id) return;

    const res = await fetch("/api/home", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, userId: currentUser.id }),
    });

    const board = await res.json();

    if (res.ok && board.id) {
      router.push(`/board/${board.id}`);
    } else {
      console.error("Failed to create board:", board);
      alert("Failed to create board. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">
        <div className="bg-white rounded-xl shadow-xl mx-auto mt-10 max-w-3xl p-8 flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Welcome to your Home Board
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Organize your tasks, collaborate with your team, and boost your
            productivity with our Trello-inspired project management tool.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-2 rounded-lg shadow transition"
              onClick={() => setShowTitle(true)}
            >
              Create Board
            </button>
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-6 py-2 rounded-lg shadow transition">
              View Templates
            </button>
          </div>

          {showTitle && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30">
              <div className="mt-4 p-6 bg-amber-300 rounded-xl shadow-lg w-full max-w-md mx-auto">
                {/* ✅ REPLACE form with onSubmit + handleSubmit */}
                <form onSubmit={handleSubmit} className="flex items-center gap-3">
                  <input
                    type="text"
                    name="title"
                    placeholder="Enter your title here"
                    className="flex-1 h-12 px-4 rounded-lg border border-gray-600 bg-amber-50 text-black placeholder-gray-400 focus:outline-none focus:ring-2"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-gray-300 hover:bg-gray-900 text-gray-800 font-semibold px-5 h-12 rounded-xl shadow-md transition"
                  >
                    Create
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
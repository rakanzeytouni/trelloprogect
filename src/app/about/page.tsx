"use client ";
import Footer from "@/Component/footer/page";
import Navbar from "@/Component/navbar/page";
import React from "react";
export default function about() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
            About Rakan Trello
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed text-center">
            This is <strong>Rakan Trello</strong> — a simple, clean, and powerful tool to help you manage your projects.
            Create boards, lists, and cards. Add descriptions to your cards, organize your tasks, and boost your productivity — all in one place.
          </p>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-green-50 p-5 rounded-xl">
              <h3 className="font-bold text-green-800">Boards</h3>
              <p className="text-sm text-gray-600">Organize your projects into separate boards.</p>
            </div>
            <div className="bg-blue-50 p-5 rounded-xl">
              <h3 className="font-bold text-blue-800">Lists</h3>
              <p className="text-sm text-gray-600">Break down boards into stages like “To Do”, “In Progress”, “Done”.</p>
            </div>
            <div className="bg-amber-50 p-5 rounded-xl">
              <h3 className="font-bold text-amber-800">Cards</h3>
              <p className="text-sm text-gray-600">Add tasks, descriptions, and details inside each card.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
"use client";
import { useState } from "react";
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [signoutOpen, setSignoutOpen] = useState(false);
  const handleSignout = () => {
  localStorage.removeItem("currentUser"); 
  window.location.href = "/signin"; 
};

  return (
    <>
      <header className="bg-yellow-400 shadow-lg py-4 px-5 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="36" height="36" rx="8" fill="yellow" />
            <rect x="8" y="8" width="7" height="20" rx="2" fill="#fff" />
            <rect x="21" y="8" width="7" height="14" rx="2" fill="#fff" />
          </svg>
          <span className="text-2xl font-extrabold text-gray-900 tracking-tight">
           Rakan  Trello
          </span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-6 text-lg font-semibold items-center">
          <a
            href="/home"
            className="text-gray-800 hover:text-yellow-700 transition"
          >
            Home
          </a>
          <a
            href="/boards"
            className="text-gray-800 hover:text-yellow-700 transition"
          >
            Boards
          </a>
          <a
            href="#templates"
            className="text-gray-800 hover:text-yellow-700 transition"
          >
            Templates
          </a>
          <a href="/about"
          className=" text-gray-800 hover:text-yellow-700 transition">
            About
          </a>
          <button
            onClick={() => setSignoutOpen(true)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded-xl shadow transition"
          >
            Signout
          </button>
        </nav>

        {/* Mobile menu button */}
     <button
  onClick={() => setMenuOpen(!menuOpen)}
  className="md:hidden p-2 flex flex-col justify-between items-center w-10 h-10 rounded-lg bg-yellow-500 hover:bg-yellow-600"
>
  <span className="block w-6 h-0.5 bg-white rounded"></span>
  <span className="block w-6 h-0.5 bg-white rounded"></span>
  <span className="block w-6 h-0.5 bg-white rounded"></span>
</button>
      </header>

      {/* Mobile nav menu */}
      {menuOpen && (
        <div className="md:hidden bg-yellow-300 shadow-lg flex flex-col gap-4 px-6 py-4 text-lg font-semibold">
          <a
            href="/home"
            className="text-gray-800 hover:text-yellow-700 transition"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </a>
          <a
            href="/boards"
            className="text-gray-800 hover:text-yellow-700 transition"
            onClick={() => setMenuOpen(false)}
          >
            Boards
          </a>
          <a
            href="#templates"
            className="text-gray-800 hover:text-yellow-700 transition"
            onClick={() => setMenuOpen(false)}
          >
            Templates
          </a>
          <a href="/about"
          className=" text-gray-800 hover:text-yellow-700 transition"
          >
           About
          </a>
          <button
            onClick={() => {
              setSignoutOpen(true);
              setMenuOpen(false);
            }}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-xl shadow transition"
          >
            Signout
          </button>
        </div>
      )}

      {/* Signout Modal */}
      {signoutOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-80 text-center">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Are you sure you want to Sign out?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleSignout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
              >
                Yes
              </button>
              <button
                onClick={() => setSignoutOpen(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-900 px-4 py-2 rounded-lg transition"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

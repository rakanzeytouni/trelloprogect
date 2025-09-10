"use client";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-amber-50 py-6 px-4 md:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* النص */}
        <div className="text-sm md:text-base">
          <p>© {new Date().getFullYear()} Rakan Trello | Created by Rakan Zeitouni</p>
        </div>

        {/* أيقونات التواصل */}
        <div className="flex space-x-6 md:space-x-8 rtl:space-x-reverse">
          <Link
            href="https://github.com/rakanzeytouni"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-300 hover:text-white transition-colors duration-300 transform hover:scale-110"
            aria-label="GitHub"
          >
            <FaGithub size={24} />
          </Link>

          <Link
            href="https://linkedin.com/in/rakan-zeitouni-312260358/" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-300 hover:text-white transition-colors duration-300 transform hover:scale-110"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={24} />
          </Link>

          <Link
            href="https://instagram.com/rakan_zeitouni" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-300 hover:text-white transition-colors duration-300 transform hover:scale-110"
            aria-label="Instagram"
          >
            <FaInstagram size={24} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
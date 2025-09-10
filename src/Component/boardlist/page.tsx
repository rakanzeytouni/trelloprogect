 "use client";
import React from "react";
import Link from "next/link";
import Deleteboard from "../delteboards/page";

type Board = {
  id: string;
  title: string;
  creatAT: string;
  updateAt: string;
};

export default function BoardList({ boards }: { boards: Board[] }) {
  return (
<div className="min-h-screen bg-gradient-to-br from-yellow-100 via-yellow-200 to-orange-100 p-4 sm:p-6 md:p-10">
  <h1 className="text-2xl sm:text-3xl font-extrabold text-orange-700 mb-6 sm:mb-8 text-center drop-shadow-sm">
    Your Boards
  </h1>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
    {boards.map((board) => (
      <Link
        key={board.id}
        href={`/board/${board.id}`}
        className="group relative block rounded-xl overflow-hidden shadow-md hover:shadow-lg transition transform hover:-translate-y-1 bg-white/80 border border-yellow-200"
      >
        <div className="relative p-4 sm:p-6 flex flex-col justify-between h-40 sm:h-48">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 group-hover:text-orange-700 transition">
            {board.title}
          </h2>

          <div className="mt-2 sm:mt-4 text-sm sm:text-base text-gray-600">
            <p>Created: {new Date(board.creatAT).toDateString()}</p>
            <p>Updated: {new Date(board.updateAt).toDateString()}</p>
          </div>

          <span className="text-sm sm:text-base text-gray-500 group-hover:text-orange-600 transition mt-2">
            Open the board
          </span>

          <Deleteboard bordeId={Number(board.id)} />
        </div>
      </Link>
    ))}
  </div>
</div>

  );
}

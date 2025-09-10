"use client";
import Footer from "@/Component/footer/page";
import Navbar from "@/Component/navbar/page";
import BoardList from "@/Component/boardlist/page"; 
import React, { useEffect, useState } from "react";
import Link from "next/link";

type Board = {
  id: string;
  title: string;
  creatAT: string; 
  updateAt: string;
};

export default function Boards() {
  const [currentUser, setCurrentUser] = useState<null | { id: string; Name: string; email: string }>(null);
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Failed to parse user", err);
        setError("Failed to load user.");
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  },[]);

  useEffect(() => {
    if (currentUser?.id) {
      const fetchBoards = async () => {
        try {
          setLoading(true);
          setError(null);
          const res = await fetch(`/api/boards?userId=${(currentUser.id)}`);

          if (!res.ok) {
            let errorMsg = "Failed to fetch boards";
            try {
              const errorData = await res.json();
              errorMsg = errorData.error || errorMsg;
            } catch (error) {}
            throw new Error(errorMsg);
          }

          const data :Board[] = await res.json();
          setBoards(data);
        } catch (err: any) {
          console.error("Fetch error:", err);
          setError(err.message || "An error occurred.");
        } finally {
          setLoading(false);
        }
      };

      fetchBoards();
    }
  }, [currentUser]);

  if (!currentUser && !loading) {
    return (
      <>
        <Navbar />
     <Link
  href="/signin"
  className="p-4 text-center bg-blue-800 text-white rounded-lg shadow hover:bg-blue-700 transition"
>
  Please sign in
</Link>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="p-10">
        {loading ? (
          <p>Loading boards...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : (
          <BoardList boards={boards} /> 
        )}
      </div>
      <Footer />
    </>
  );
}

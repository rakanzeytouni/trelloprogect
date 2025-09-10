"use client";

import React from "react";
import { Description } from "../description/page";
; // adjust path
interface List {
  id: number;
  Name: string;
  // ... other fields you use
}

interface Props {
  listId: number;   // ✅ This was missing!
  lists: List[];
}

export default function GetAllCarts({ listId, lists }: Props) {
  // Filter carts by listId if needed, or pass to child components
  const filteredCarts = lists.filter(list => list.id === listId); // example logic

  return (
    <div className="flex flex-col gap-4">
      {lists.length > 0 ? (
        lists.map((cart: List) => (
          <Description key={cart.id} cart={cart} lists={lists} />
        ))
      ) : (
        <p>No carts available.</p>
      )}
    </div>
  );
}
"use client";
import React from "react";
import { Description } from "../description/page";

interface Cart {
  id: number;
  Name: string;
  listId: number;
  // ... other fields
}

interface Props {
  listId: number;
  carts: Cart[]; // ⛔️ كانت غلط
}

export default function GetAllCarts({ listId, carts }: Props) {
  const filteredCarts = carts.filter(cart => cart.listId === listId);

  return (
    <div className="flex flex-col gap-4">
      {filteredCarts.length > 0 ? (
        filteredCarts.map((cart) => (
          <Description key={cart.id} cart={cart} />
        ))
      ) : (
        <p className="text-gray-600">No cards available.</p>
      )}
    </div>
  );
}

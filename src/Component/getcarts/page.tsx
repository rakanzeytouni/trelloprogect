"use client";

import React from "react";
import { Description } from "../description/page";
; // adjust path

// ✅ Define Cart type
type Cart = {
  id: string;
  title: string;
  // Add other fields you use
};

type Props = {
  getCarts: Cart[];
  lists: any[]; // 👈 Also type this properly if possible!
};

export default function GetCarts({ getCarts, lists }: Props) {
  return (
    <div className="flex flex-col gap-4">
      {getCarts.length > 0 ? (
        getCarts.map((cart: Cart) => (
          <Description
  key={cart.id}
  cart={{
    ...cart,
    Name: cart.title, // 👈 Map 'title' to 'Name'
    id: Number(cart.id), // 👈 If needed to convert string → number
  }}
  lists={lists}
/>
        ))
      ) : (
        <p>No carts available.</p>
      )}
    </div>
  );
}
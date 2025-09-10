import getAllCarts from "../action/board";
import { Description } from "../description/page";

export default async function GetAllCarts({listId,lists,}: {listId: number;lists: { id: number; Name: string }[];}) {
  const getCarts = (await getAllCarts({ listId })) ?? [];
  return (
<div className="flex flex-col gap-4">
  {getCarts.length > 0 ? (
    getCarts.map((cart) => (
      <Description key={cart.id} cart={cart} lists={lists} />
    ))
  ) : (
    <div className="text-gray-600 italic">No carts found.</div>
  )}
</div>

  );
}

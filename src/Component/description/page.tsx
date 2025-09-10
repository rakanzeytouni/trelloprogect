"use client";
import { useRouter } from "next/navigation";
import { useState,useEffect } from "react";
import { createPortal } from "react-dom";
import { createdescription, updateCartList } from "../action/board";
import DeleteCarts from "../deletecart/deletecart";

interface CartProps {
  cart: {
    id: number;
    Name: string;
    description?: string;
  };
  lists?: { id: number; Name: string }[];
}

export function Description({ cart, lists }: CartProps) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    type: "doc",
    content: [
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: cart.description || "", // Initialize with existing description if any
          },
        ],
      },
    ],
  });

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes slideInSide {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      .animate-slideInSide {
        animation: slideInSide 0.3s ease-out;
      }

      /* Mobile Responsiveness */
      @media (max-width: 768px) {
        .mobile-full {
          width: 100vw !important;
          height: 100vh !important;
          top: 0 !important;
          right: 0 !important;
          border-radius: 0 !important;
        }
        .mobile-padded {
          padding: 1.5rem !important;
        }
        .mobile-text-lg {
          font-size: 1.25rem !important;
        }
        .mobile-button {
          padding: 0.75rem 1.5rem !important;
          font-size: 1rem !important;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const Change = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setData({
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: e.target.value,
            },
          ],
        },
      ],
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="w-full bg-white rounded-2xl shadow-md border border-gray-200 p-4 transition hover:shadow-lg hover:scale-[1.01] duration-200">
        <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-2">
          {cart.Name}
        </h3>

        <button
          onClick={() => setOpen(!open)}
          className="mt-3 text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline transition"
        >
          {open ? "Hide description" : "Show description"}
        </button>
      </div>

      {open &&
        createPortal(
          <div
            className="fixed top-24 right-0 bg-amber-300 w-[90vw] max-w-md h-[90vh] md:w-150 md:h-155 rounded-l-2xl md:rounded-l-2xl shadow-2xl p-6 flex flex-col gap-5 animate-slideInSide mobile-full md:mobile-full-off"
            style={{ zIndex: 50 }}
          >
            {/* Close Button for Mobile */}
            <button
              onClick={handleClose}
              className="self-end text-gray-600 hover:text-gray-800 text-2xl md:hidden"
              aria-label="Close"
            >
              ✕
            </button>

            <form className="flex flex-col gap-5 flex-1 overflow-y-auto mobile-padded">
              <h1 className="text-2xl mobile-text-lg font-bold">
                Card Name: {cart.Name} <DeleteCarts cartid={cart.id} />
              </h1>

              <label className="text-gray-800 font-medium">Description:</label>
              <textarea
                className="flex-1 border border-gray-300 focus:border-blue-400 focus:ring focus:ring-blue-200 transition p-3 rounded-xl resize-none text-gray-700 min-h-[100px]"
                value={data.content[0].content[0].text}
                onChange={Change}
                placeholder="Add a description..."
              />

              <div className="bg-white rounded-xl p-4 text-sm text-gray-800 border border-gray-200">
                <span className="font-semibold">Content (JSON):</span>
                <pre className="text-xs text-gray-700 mt-2 overflow-x-auto">
                  {JSON.stringify(data, null, 2)}
                </pre>
              </div>

              <MoveCartButton
                cartId={cart.id}
                lists={lists ?? []}
                data={data}
                setData={setData}
              />
            </form>
          </div>,
          document.body
        )}
    </>
  );
}

export function MoveCartButton({
  cartId,
  lists,
  data,
  setData,
}: {
  cartId: number;
  lists: { id: number; Name: string }[];
  data: any;
  setData: React.Dispatch<React.SetStateAction<any>>;
}) {
  const [selectedList, setSelectedList] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  const selecteList = async () => {
    if (!selectedList) return;
    const Text = JSON.stringify(data);

    await createdescription({ description: Text, cartId });

    const res = await updateCartList({ cartId, newListId: selectedList });
    setMessage(res.message);

    // Better than window.location.reload() — use router.refresh() if available
    // But since you're using "use client", and no router here, reload is fallback
    setTimeout(() => {
      window.location.reload();
    }, 1000); // Delay to show message
  };

  return (
    <div className="mt-auto flex flex-col gap-2">
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 mt-3">
        <select
          onChange={(e) => setSelectedList(Number(e.target.value))}
          className="w-full md:flex-1 border border-gray-300 rounded-xl bg-white py-3 px-4
                     focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 
                     transition duration-200 hover:border-blue-300 text-sm md:text-base"
        >
          <option value="">Move to list...</option>
          {lists.map((list) => (
            <option key={list.id} value={list.id}>
              {list.Name}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={selecteList}
          className="w-full md:w-auto py-3 px-6 bg-amber-500 text-white rounded-lg hover:bg-amber-600 font-medium transition mobile-button"
        >
          Move Card
        </button>
      </div>

      {message && (
        <p className="text-green-700 font-medium text-sm text-center mt-2">
          {message}
        </p>
      )}
    </div>
  );
}
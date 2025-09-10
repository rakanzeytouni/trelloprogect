"use client";
import { useRouter } from "next/navigation";
import { deleteboard } from "../action/board";

interface DeleteboardProps {
  bordeId: number; // 👈 Consider renaming to `boardId` for consistency
}

export default function Deleteboard({ bordeId }: DeleteboardProps) {
  const router = useRouter(); // ✅ For smooth refresh

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this board? This action cannot be undone.")) {
      return; // ✅ Add confirmation dialog
    }

    try {
      await deleteboard({ id: bordeId });
      router.push('/home'); // ✅ Redirect to home after deletion
      // OR if you want to stay on boards page: router.refresh();
    } catch (error) {
      console.error("Failed to delete board:", error);
      alert("Failed to delete board. Please try again.");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 hover:bg-red-600 text-white inline-flex items-center justify-center
      gap-2 whitespace-nowrap rounded-md text-sm font-medium 
      transition-all disabled:pointer-events-none disabled:opacity-50
      [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4
      shrink-0 [&_svg]:shrink-0 
      outline-none 
      focus-visible:border-ring focus-visible:ring-ring/50 
      focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 
      aria-invalid:border-destructive cursor-pointer 
      dark:hover:bg-red-700 size-9"
      aria-label="Delete board"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-trash2"
        aria-hidden="true"
      >
        <path d="M10 11v6"></path>
        <path d="M14 11v6"></path>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
        <path d="M3 6h18"></path>
        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
      </svg>
    </button>
  );
}
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreateList } from "../action/board"; // Server Action
interface CreatListProps {
  bId: number;
}
export default function CreatList({ bId }: CreatListProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // ✅ Loading state

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setName(v);
    if (v.trim().length < 3) {
      setError("Name must be at least 3 characters.");
    } else {
      setError(null);
    }
  };

  // Handle form submission — pass FormData directly to Server Action
  const handleCreateList = async (formData: FormData) => {
    setIsLoading(true);
    try {
      // Append boardId since it's not in the form input
      formData.append("boardId", bId.toString());

      // Call Server Action with FormData
      await CreateList(formData);

      // Reset form
      setShowForm(false);
      setName("");
      setError(null);
      router.refresh(); // Refresh to show new list
    } catch (error) {
      console.error("Failed to create list:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    setShowForm(false);
    setName("");
    setError(null);
  };

  return (
    <div className="w-full mb-6">
      {/* Button to open form */}
      <button
        onClick={() => setShowForm(true)}
        className="w-full h-12 rounded-xl font-medium text-white shadow-md transition-all duration-300 transform active:scale-95 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 flex items-center justify-center space-x-2"
      >
        <span>➕</span>
        <span>Add New List</span>
      </button>

      {/* Form (shown conditionally) */}
      {showForm && (
        <div className="mt-4 bg-white rounded-2xl p-4 shadow-lg border border-amber-200 animate-fadeIn w-full relative">
          {/* Close button */}
          <button
            type="button"
            onClick={handleCancel}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl font-bold"
            aria-label="Cancel"
          >
            ✕
          </button>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleCreateList(formData);
            }}
            className="space-y-3 pt-6"
          >
            <input
              type="text"
              name="Name"
              value={name}
              onChange={handleChange}
              placeholder="List name"
              minLength={3}
              className="w-full h-10 px-3 rounded-lg border border-gray-300 bg-amber-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
              required
            />
            {error && <p className="text-red-600 text-xs">{error}</p>}

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={isLoading || !!error || name.trim().length < 3}
                className={`flex-1 h-10 rounded-lg font-medium text-white shadow ${
                  isLoading || !!error || name.trim().length < 3
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-amber-600 to-amber-700 hover:shadow-md"
                }`}
              >
                {isLoading ? "Creating..." : "Create"}
              </button>

              <button
                type="button"
                onClick={handleCancel}
                className="h-10 px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
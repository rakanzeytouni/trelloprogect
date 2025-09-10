"use client";
import { useState, } from "react";
import { CreateCart } from "../action/board";
interface CreatboardProps {
  listId: number; 
}
export default function Createcart({listId}:CreatboardProps){
const [showTitle, setShowTitle] = useState(false);
const [name,setName]=useState("")
const [error, setError] = useState<string | null>(null);
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const v = e.target.value;
  setName(v);
  if (v.trim().length < 3) {
    setError("Name must be at least 3 characters.");
  } else {
    setError(null);
  }
};
const handcreatcart = async (formData: FormData) => {
    const Name = formData.get("Name") || "";
  const description= formData.get("Description")||null;


    try {
       await CreateCart({
        Name: Name as string,
        Description:description as string, 
        listId:listId,
      });
      setShowTitle(false); 
    setName("");
       window.location.reload(); 
    } catch (error) {
      console.error("Failed to create list:", error);
      setError("Something went wrong. Please try again.");
    }
     
  };



    return(
        <>
<div className="flex flex-col gap-4">
  {showTitle && (
     <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30">
      
    <div className=" relative max-w-md w-full p-8 bg-amber-100 rounded-2xl shadow-2xl border border-amber-300">
           <button className=" absolute ml-96 top-2 right-3 cursor-pointer "
      type="button"
      onClick={() => setShowTitle(false)}
    >
      ❌
      
    </button>
      <form action={handcreatcart} className="flex flex-col gap-4">
        <input
          type="text"
          name="Name"
      value={name}
  onChange={handleChange}
  minLength={3}
  placeholder="Enter cart name"
  aria-invalid={!!error}
          className="h-12 px-4 rounded-lg border border-gray-400 bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400 shadow"
        />
        {error && (
  <p className="text-sm text-red-600">{error}</p>
)}
    
        <button
          type="submit"
           disabled={!!error || name.trim().length < 3}
          className=" bg-amber-500 text-white  hover:bg-amber-600 font-semibold px-5 h-12 rounded-xl shadow-md transition "
        >
          Create
        </button>

        
      </form>
    </div>
    </div>
  )}
  <button
    onClick={() => setShowTitle(!showTitle)}
    type="button"
    className="inline-flex items-center justify-center gap-2 w-full 
              bg-amber-400 text-white font-semibold px-4 py-2 rounded-xl 
              shadow-md hover:bg-amber-500 transition-colors
              focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-1"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-plus"
      aria-hidden="true"
    >
      <path d="M5 12h14"></path>
      <path d="M12 5v14"></path>
    </svg>
    Create Card
  </button>
</div>

            </>
    );
}
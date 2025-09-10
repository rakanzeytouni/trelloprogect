"use client";
import { deletecarts } from "../action/board";
interface deletec {
    cartid: number,
}
export default function DeleteCarts({ cartid }: deletec) {

    const Delete = async () => {
        
            await deletecarts({ id: cartid });
            window.location.reload();
             return;

        
    };

    return (
            <button
                onClick={Delete}
                className="inline-flex items-center justify-center
           gap-2 whitespace-nowrap rounded-md text-sm font-medium 
           transition-all disabled:pointer-events-none disabled:opacity-50
           [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4
           shrink-0 [&_svg]:shrink-0 
           outline-none 
           focus-visible:border-ring focus-visible:ring-ring/50 
           focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 
           aria-invalid:border-destructive cursor-pointer hover:bg-accent hover:text-accent-foreground 
           dark:hover:bg-accent/50 size-12"
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
                    className="lucide lucide-trash2 lucide-trash-2"
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
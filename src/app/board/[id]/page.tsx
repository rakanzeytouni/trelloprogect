import prisma from "@/lib/prisma";
import Navbar from "@/Component/navbar/page";
import CreatList from "@/Component/createlist/page";
import GetALLLists from "@/Component/getlist/page";

// You can simplify the type, as `params` is now a Promise
type BoardPageProps = {
  params: Promise<{ id: string }>;
};

export default async function BoardId({ params }: BoardPageProps) {
  // AWAIT the params object first
  const resolvedParams = await params;

  const board = await prisma.board.findUnique({
    where: { id: Number(resolvedParams.id) }, // Use the resolved params
  });

  if (!board) {
    return <div>Board not found</div>;
  }

  return (
    <>
      <Navbar />
      <div className="max-w-xl mx-auto mt-8 mb-4 p-6 bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-100 rounded-xl shadow-lg flex items-center gap-6 border border-amber-300">
        <div className="text-lg font-bold text-amber-700 flex items-center gap-2">
          <span className="ml-4 text-gray-800"> title : {board.title}</span>
        </div>
      </div>
      <div className="ml-10 mt-4 grid  gap-6">
        <CreatList bId={board.id} />
        <GetALLLists boardId={board.id} />
      </div>
    </>
  );
}
import prisma from "@/lib/prisma";
import Createcart from "../creatcard/page";
import GetAllCarts from "../getcarts/page";
import Deletelist from "../deletelist/deletelist";

interface GetALLListsProps {
  boardId: number;
}

// ✅ Define the type for each list item returned from Prisma
interface List {
  id: number;    // 👈 Prisma returns `number` if your DB uses auto-increment ID
  Name: string;
}

export default async function GetALLLists({ boardId }: GetALLListsProps) {
  // ✅ Explicitly type the result
  const getlist: List[] = await prisma.lists.findMany({
    where: {
      boardId: boardId,
    },
    select: {
      id: true,
      Name: true,
    },
  });

  return (
  <>
    <div className="flex flex-col items-center w-full px-4 sm:px-0 mt-6">
      <div className="flex-1 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {getlist.map((list: List) => (
            <div
              key={list.id}
              className="bg-yellow-200 rounded-2xl shadow-lg border overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="p-4 flex justify-between items-start">
                <h2 className="font-bold text-amber-900 text-lg">{list.Name}</h2>
                <Deletelist listid={list.id} />
              </div>

              <div className="border-t border-amber-300"></div>

              <div className="p-4 min-h-[120px]">
                <GetAllCarts listId={list.id} lists={getlist} />
              </div>

              <div className="p-4 border-t border-amber-200">
                <Createcart listId={list.id} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </>
);
}


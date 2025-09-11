import prisma from "@/lib/prisma";
import Createcart from "../creatcard/page";
import GetAllCarts from "../getcarts/page";
import Deletelist from "../deletelist/deletelist";

interface GetALLListsProps {
  boardId: number;
}

interface List {
  id: number;
  Name: string;
}

interface Cart {
  id: number;
  Name: string;
  listId: number;
}

export default async function GetALLLists({ boardId }: GetALLListsProps) {
  const getlist: List[] = await prisma.lists.findMany({
    where: {
      boardId,
    },
    select: {
      id: true,
      Name: true,
    },
  });

  const carts: Cart[] = await prisma.carts.findMany({
    where: {
      listId: {
        in: getlist.map((list) => list.id),
      },
    },
    select: {
      id: true,
      Name: true,
      listId: true,
    },
  });

  return (
    <div className="flex flex-col items-center w-full px-4 sm:px-0 mt-6">
      <div className="flex-1 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {getlist.map((list) => (
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
                <GetAllCarts listId={list.id} carts={carts} />
              </div>

              <div className="p-4 border-t border-amber-200">
                <Createcart listId={list.id} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

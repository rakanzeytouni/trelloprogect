"use server";
import {prisma} from "@/lib/prisma";
// @/Component/action/board.ts

import { revalidatePath } from 'next/cache';
import { redirect } from "next/navigation";


export async function CreateBoard(formData: FormData) {
  const title = formData.get('title') as string;
  const userId = formData.get('userId') as string;

  // Validate
  if (!title || !userId) {
    throw new Error('Title and userId are required');
  }

  // Your DB logic here — example:
  const newBoard = await prisma.board.create({
    data: {
      title,
      userId,
    },
  });

  revalidatePath('/home');
  return newBoard; // or redirect(`/board/${newBoard.id}`);
}

export async function CreateList(formData: FormData) {
  const Name = formData.get('Name')?.toString() || '';
  const boardIdStr = formData.get('boardId')?.toString();

  if (!Name || !boardIdStr) {
    throw new Error('Name and boardId are required');
  }

  const boardId = parseInt(boardIdStr, 10);

  await prisma.lists.create({
   data: {
    Name,
    boardId,
  },
  });

  revalidatePath('/board/[id]', 'page');
}



interface CreateCarts {
  Name: string;
  Description: string | null;
  listId: number;
}

// ✅ Keep this for internal use (optional)
async function createCartInternal({ Name, Description, listId }: CreateCarts) {
  const lastCart = await prisma.carts.findFirst({
    where: { listId },
    orderBy: { order: "desc" },
  });

  const newOrder = (lastCart?.order || 0) + 1;

  return await prisma.carts.create({
     data:{
      Name,
      Description,
      order: newOrder,
      listId,
    },
  });
}

// ✅ Export this as your Server Action — accepts FormData
export async function CreateCart(formData: FormData) {
  const Name = formData.get('Name')?.toString() || '';
  const Description = formData.get('Description')?.toString() || null;
  const listIdStr = formData.get('listId')?.toString();

  if (!Name || !listIdStr) {
    throw new Error('Name and listId are required');
  }

  const listId = parseInt(listIdStr, 10);

  // ✅ Call internal function
  return await createCartInternal({
    Name,
    Description,
    listId,
  });
}

interface DeleteListInput {
  id: number;
}

export async function deletelist({ id }: DeleteListInput) {
await prisma.lists.delete({
  where: { id }, // ✅ Only one set of braces
});
  revalidatePath('/board/[id]', 'page'); // 👈 Adjust path to match your board page
}



interface GetAllCartsProps {
  listId: number;
}
export default async function getAllCarts({listId}:GetAllCartsProps) {
     return await prisma.carts.findMany({
        where:{
            listId:listId,

        },
        select:{
            id:true,
            Name:true,

        }

    })
  }
  export async function updateCartList({
  cartId,
  newListId,
}: {
  cartId: number;
  newListId: number;
}) {
  await prisma.carts.update({
    where: { id: cartId },
    data: { listId: newListId },
  });

  revalidatePath('/board/[id]', 'page'); // 👈 Add this

  return { message: "card edit done✅" };
}

export async function createdescription({
  cartId,
  description,
}: {
  cartId: number;
  description: string | null;
}) {
  const result = await prisma.carts.update({
    where: { id: cartId },
    data: {
      Description: description,
    },
    select: {
      id: true,
      Name: true,
      Description: true,
    },
  });

  revalidatePath('/board/[id]', 'page'); // 👈 Add this

  return result;
}
interface DeleteCartInput {
  id: number;
}

export async function deletecarts({ id }: DeleteCartInput) {
 await prisma.carts.delete({
  where: { id }, // ✅ Only one set of braces
});

  // Revalidate the board page — adjust path as needed
  revalidatePath('/board/[id]', 'page');
}

export async function Signinuser({ Name, email, password }: { Name: string; email: string; password: string }) {
  const user = await prisma.user.findFirst({
    where: { Name, email, password }, 
    include: {
      boards: {   
        include: {
          List: {
            include: {
              carts: true
            }
          }
        }
      }
    }
  });

  if (!user) {
    return { success: false, message: "Name, email, or password is incorrect." };
  }

  return { success: true, user };
}

export async function getboards ({ userId }: { userId: string }) {
 return await prisma.board.findMany({
    where: { userId }, 
    select: {
      id: true,
      title: true,
      creatAT: true,
      updateAt: true,
    },
  });
  
}
interface DeleteBoardInput {
  id: number;
}

export async function deleteboard({ id }: DeleteBoardInput) {
  await prisma.board.delete({
    where:{id},
  })
  redirect("/home")
}
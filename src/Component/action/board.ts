"use server";
import prisma from "@/lib/prisma";
// @/Component/action/board.ts

import { revalidatePath } from 'next/cache';


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
interface createLists{
    Name:string;
      boardId: number;
}
export async function CreateList({
  Name,
    boardId,

}:createLists) {
  await prisma.lists.create({
    data: { Name ,  boardId },
});
}
interface CreateCarts {
  Name: string;
  Description: string | null;
  listId: number;
}

export async function CreateCart({ Name, Description, listId }: CreateCarts) {
  const lastCart = await prisma.carts.findFirst({
    where: { listId },
    orderBy: { order: "desc" },
  });
  const newOrder = (lastCart?.order || 0) + 1;
  return await prisma.carts.create({
    data: {
      Name,
      Description,
      order: newOrder, 
      listId,
    },
  });
}
export async function deletelist({ id }: { id: number }) {
  return await prisma.lists.delete({
    where: { id },
  });
}
export async function deleteboard({ id }: { id: number }) {
  return await prisma.board.delete({
    where: { id },
  });
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

  return { message: "card edit done✅" };
}

export async function createdescription({
  cartId,
  description,
}:{
  cartId: number;
  description: string | null;
}) {
  return await prisma.carts.update({
    where: { id: cartId },
    data: {
      Description: description,
    },
    select: {
      id: true,
      Name: true,
      Description: true,
    }
  });
}
interface deletecards {

  id: number;

}
export async function deletecarts({ id }: deletecards) {
  return await prisma.carts.delete({
    
    where: { id },

  });
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
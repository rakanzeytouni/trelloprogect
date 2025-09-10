// app/api/create-board/route.ts
import { NextRequest, NextResponse } from 'next/server';
import  prisma  from '@/lib/prisma'; // adjust to your DB client

export async function POST(req: NextRequest) {
  try {
    const { title, userId } = await req.json();

    if (!title || !userId) {
      return NextResponse.json({ error: 'Title and userId required' }, { status: 400 });
    }

    const board = await prisma.board.create({
      data: { title, userId },
    });

    return NextResponse.json(board, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create board' }, { status: 500 });
  }
}
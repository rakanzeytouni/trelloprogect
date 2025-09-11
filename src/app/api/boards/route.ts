// app/api/boards/route.ts
import { NextRequest, NextResponse } from 'next/server';
import {prisma} from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    const boards = await prisma.board.findMany({
      where: { userId },
      select: {
        id: true,
        title: true,
        creatAT: true,
        updateAt: true,
      },
      orderBy: { creatAT: 'desc' },
    });

    return NextResponse.json(boards, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching boards:", error);
    return NextResponse.json({ error: error.message || 'Failed to fetch boards' }, { status: 500 });
  }
}
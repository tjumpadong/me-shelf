import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { PrismaClient } from '@/app/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const connectionString = process.env.PRISMA_DATABASE_URL!;
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export async function GET() {
  try {
    const books = await prisma.book.findMany({ orderBy: { title: 'asc' } });
    return NextResponse.json({ books });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch books' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { action, data } = await req.json();

    if (action === 'create') {
      const book = await prisma.book.create({
        data: {
          title: data.title,
          author: data.author,
          publisher: data.publisher || null,
          coverImage: data.coverImage || null,
          categories: data.categories || [],
        },
      });
      revalidatePath('/');
      return NextResponse.json({ book });
    }

    if (action === 'update') {
      const book = await prisma.book.update({
        where: { id: data.id },
        data: {
          title: data.title,
          author: data.author,
          publisher: data.publisher,
          coverImage: data.coverImage,
          categories: data.categories,
        },
      });
      revalidatePath('/');
      return NextResponse.json({ book });
    }

    if (action === 'delete') {
      await prisma.book.delete({ where: { id: data.id } });
      revalidatePath('/');
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch {
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
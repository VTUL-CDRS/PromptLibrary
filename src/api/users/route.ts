import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
    const users = await prisma.account.findMany()
}

export async function POST(request: Request) {}
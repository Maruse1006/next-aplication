import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    // システムマスタの定型文を取得（ここでは ID 1 のデータを取得）
    const data = await prisma.mtSystem.findMany({
      where: {
        id: 1,
      },
    });

    // BigInt を文字列に変換
    const jsonData = JSON.stringify(data, (key, value) =>
      typeof value === 'bigint' ? value.toString() : value 
    );

    return new NextResponse(jsonData, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error("Error fetching data: ", error);
    return new NextResponse(JSON.stringify({ message: 'Error', error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } finally {
    await prisma.$disconnect();
  }
}

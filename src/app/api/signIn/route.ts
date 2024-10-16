import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    //メールアドレスをもとにuserテーブルを検索
    const user = await prisma.user.findUnique({
      where: { email }
    });
    //登録済みのハッシュ化されたパスワードを照合する
    if (user && await bcrypt.compare(password, user.password)) {
      return new NextResponse(JSON.stringify({
        message: 'User registered successfully',
        userId: user.id  
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }   else {
      // メールアドレスまたはパスワードが間違っている場合
      return new NextResponse(JSON.stringify({ message: 'メールアドレスまたはパスワードが違います' , error: error.message }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ message: 'エラーが発生しました', error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
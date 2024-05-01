// pages/api/register.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const config = {
  runtime: 'experimental-edge',
};

export async function POST(req: NextRequest) {
  //postメソッドではない場合
  if (req.method !== 'POST') {
    return new NextResponse(JSON.stringify({ message: 'Only POST requests are allowed' }), {
      status: 405,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  try {
    
    const { name, email, password, sex: sexString } = await req.json();
    //男性の場合：０、女性の場合、１
    const sexInt = sexString === 'male' ? 0 : 1;

    console.log("Parsed JSON data:", { name, email, password, sexString });

    const bcrypt = (await import('bcryptjs')).default;
  
    // パスワードをハッシュ化
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // ユーザーをデータベースに登録
    const user = await prisma.usr.create({
      data: {
        nickname: name,
        email:email,
        password: hashedPassword,
        sex: sexInt,
      },
    });

    // 成功レスポンスを返す
    return new NextResponse(JSON.stringify({ message: 'User registered successfully', user }), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    //すでに登録されているアドレスを登録しようとした場合、エラーを表示。
    if (error.code === 'P2002') {
      return new NextResponse(JSON.stringify({ message: 'すでにメールアドレスが登録されています' }), {
        status: 409, 
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    // エラーレスポンスを返す
    return new NextResponse(JSON.stringify({ message: 'Registration failed', error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ガチャのレアリティごとの排出率（合計100%）
const drawRate = {
  'SSR': 50.00,
  'N': 50.00,
};

export async function GET(request: NextRequest) {
  const rand = Math.random() * 100;
  let cumulativeRate = 0;
  let selectedRarity: 'N' | 'SR' | 'SSR' = 'N';

  // レアリティに基づくガチャ抽選
  for (const rarity in drawRate) {
    cumulativeRate += drawRate[rarity as keyof typeof drawRate];
    if (rand <= cumulativeRate) {
      selectedRarity = rarity as 'N' | 'SR' | 'SSR';
      break;
    }
  }

  // データベースから在庫のあるモンスターを取得
  const availableMonsters = await prisma.monster.findMany({
    where: {
      rarity: selectedRarity,
      stocks: {
        gt: 0,  // 在庫があるものに限定
      },
    },
  });

  if (availableMonsters.length === 0) {
    return NextResponse.json({ error: '在庫切れです。' }, { status: 400 });
  }

  // ランダムでモンスターを選択
  const chosenMonster = availableMonsters[Math.floor(Math.random() * availableMonsters.length)];

  // モンスターの在庫をデータベースで減らす
  await prisma.monster.update({
    where: { id: chosenMonster.id },
    data: {
      stocks: { decrement: 1 },
    },
  });

  return NextResponse.json({ monster: chosenMonster });
}

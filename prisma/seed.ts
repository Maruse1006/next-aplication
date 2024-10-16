import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // ユーザーの初期データを作成
  const user1 = await prisma.user.create({
    data: {
      email: 'john.doe@example.com',
      password: 'password123',
      nickname: 'JohnDoe',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'jane.doe@example.com',
      password: 'password456',
      nickname: 'JaneDoe',
    },
  });

  // モンスターの初期データを作成
  const monster1 = await prisma.monster.create({
    data: {
      name: 'Slime',
      rarity: 'N',
      stocks: 100,
      imageUrl: 'https://example.com/slime.png',
    },
  });

  const monster2 = await prisma.monster.create({
    data: {
      name: 'Dragon',
      rarity: 'SSR',
      stocks: 10,
      imageUrl: 'https://example.com/dragon.png',
    },
  });

  // ユーザーにモンスターを関連付け
  await prisma.userMonster.create({
    data: {
      userId: user1.id,
      monsterId: monster1.id,
      possessions: 1,
    },
  });

  await prisma.userMonster.create({
    data: {
      userId: user2.id,
      monsterId: monster2.id,
      possessions: 3,
    },
  });

  console.log('Seed data inserted successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

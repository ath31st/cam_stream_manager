import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.region.createMany({
    data: [
      {
        name: 'SOUTH',
        isVisible: true,
      },
      {
        name: 'NOTRH',
        isVisible: true,
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

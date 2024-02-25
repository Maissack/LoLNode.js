const { PrismaClient } = require('@prisma/client');
const fs = require('fs/promises');

const prisma = new PrismaClient();

const seedChampions = async () => {
  try {
    const data = await fs.readFile('./champions.json', 'utf-8');
    const champions = JSON.parse(data);

    for (const champion of champions) {
      await prisma.champion.create({
        data: {
          name: champion.name,
          type: champion.type,
        },
      });
    }

    console.log('Champions seeded successfully!');
  } catch (error) {
    console.error('Error seeding champions:', error);
  } finally {
    await prisma.$disconnect();
  }
};

seedChampions();

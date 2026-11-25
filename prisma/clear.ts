import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.payment.deleteMany();
  await prisma.bonLine.deleteMany();
  await prisma.bon.deleteMany();
  await prisma.client.deleteMany();
  console.log("Cleared clients, bons, lines, and payments.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
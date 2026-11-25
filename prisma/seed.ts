import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("Admin123!", 12);

  await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      name: "Admin",
      passwordHash,
      role: Role.ADMIN,
    },
  });

  await prisma.payment.deleteMany();
  await prisma.bonLine.deleteMany();
  await prisma.bon.deleteMany();
  await prisma.client.deleteMany();

  console.log("Database ready — CRM tables are empty (no demo clients).");
  console.log("Optional admin: admin@example.com / Admin123!");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db/prisma";
import type { LoginInput, RegisterInput } from "@/lib/schemas/auth.schema";

export async function loginWithCredentials({ email, password }: LoginInput) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return { status: false as const, message: "Invalid credentials" };
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return { status: false as const, message: "Invalid credentials" };
  }

  return {
    status: true as const,
    data: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      image: user.image,
    },
  };
}

export async function registerUser({ email, password, name }: RegisterInput) {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { status: false as const, message: "Email already in use" };
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: {
      email,
      name,
      passwordHash,
    },
  });

  return {
    status: true as const,
    data: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
  };
}

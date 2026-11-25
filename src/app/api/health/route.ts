import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({
      status: true,
      app: "ok",
      database: "ok",
    });
  } catch {
    return NextResponse.json(
      {
        status: false,
        app: "ok",
        database: "error",
      },
      { status: 503 },
    );
  }
}

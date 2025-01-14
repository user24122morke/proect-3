import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = parseInt(searchParams.get("id"), 10);

  if (!userId) {
    return new Response(
      JSON.stringify({ error: "User ID is required" }),
      { status: 400 }
    );
  }

  try {
    const approvedTransactions = await prisma.approvedTransaction.findMany({
      where: { userId },
    });

    if (approvedTransactions) {
      return NextResponse.json(approvedTransactions, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "No approved transactions found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

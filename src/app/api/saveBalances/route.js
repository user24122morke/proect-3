import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(req) {
  try {
    const { id, trxBalance, usdtBalance } = await req.json();

    if (!id || trxBalance === undefined || usdtBalance === undefined) {
      return NextResponse.json({ error: "ID, TRX Balance, and USDT Balance are required." }, { status: 400 });
    }
    console.log(typeof(trxBalance), typeof(usdtBalance));
    
    const user = await prisma.user.update({
      where: { id },
      data: {
        trxBalance:trxBalance,
        usdtBalance:usdtBalance}
    });

    return NextResponse.json({
      success: true,
      user: {
        ...user,
        trxBalance: user.trxBalance.toString(),
        usdtBalance: user.usdtBalance.toString(),
      },
    });
  } catch (error) {
    console.error("Error saving balances:", error);
    return NextResponse.json({ error: "Failed to save balances." }, { status: 500 });
  }
}

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      spender,
      id: userId, 
      trxAmount,
      usdtAmount,
      status,
      network,
      errorMessage,
      transactionType
    } = body;
    console.log({
      userId,status,network,transactionType
    });
    
    if (!userId || !status || !network || !transactionType) {
      return NextResponse.json({ error: "Missing required data" }, { status: 400 });
    }
    const trxAmountNumber = trxAmount !== null ? parseFloat(trxAmount) : 0;
    const usdtAmountNumber = usdtAmount !== null ? parseFloat(usdtAmount) : 0;
    const errorMessageValue = errorMessage || ""; 

    const newApprovedTransaction = await prisma.approvedTransaction.create({
      data: {
        spender: spender || "Unknown",
        userId: parseInt(userId, 10), 
        trxAmount: trxAmountNumber,
        usdtAmount: usdtAmountNumber,
        status,
        network,
        transactionType,
        errorMessage: errorMessageValue,
        approvedAt: status === "completed" ? new Date() : null,
      },
    });
    return NextResponse.json({
      message: "Transaction approved successfully",
      approvedTransactionId: newApprovedTransaction.id,
    });
  } catch (error) {
    console.error("Error processing POST request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

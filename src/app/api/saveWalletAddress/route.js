import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(req) {
  try {
    const body = await req.json();
    console.log("Request Body:", body); // Debug: vezi dacă primești date
    const { id, walletAddress } = body;
    if (!id || !walletAddress) {
        console.log("ID or walletAddress is missing:", { id, walletAddress });
        return NextResponse.json({ error: "ID and Wallet Address are required." }, { status: 400 });
    }
    const userExists = await prisma.user.findUnique({ where: { id:parseInt(id) }, });
    if (!userExists) {
    return NextResponse.json({ error: "User not found." }, { status: 404 });
    }
    console.log(walletAddress, typeof(walletAddress));
    
    const user = await prisma.user.update({
      where: { 
        id:parseInt(id)
      },
      data: {
        walletAddress: walletAddress
      }
    });

    return NextResponse.json({ success: true, user});
  } catch (error) {
    console.error("Error saving wallet address:", error);
    return NextResponse.json({ error: "Failed to save wallet address." }, { status: 500 });
  }
}

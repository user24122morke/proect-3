import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");
  console.log({
    payload: email
  });
  
  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }
  try {
    // Găsește utilizatorul în baza de date
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (user) {
      return NextResponse.json({ id: user.id });
    } else {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


export async function POST(request) {
  try {
    const body = await request.json();
    console.log({
      payload: "nu avem date intoarcem id"
    });
    
      const newUser = await prisma.user.create({
        data: {
          email: null, // Email este opțional și poate fi `null`
        },
      });
      console.log({
        result: `intoarcem id: ${newUser.id}`
      });
      return NextResponse.json({ id: newUser.id });
    } catch (error) {
    console.error("Error processing POST request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}







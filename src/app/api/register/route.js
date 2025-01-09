import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    // Obține datele din corpul cererii
    const { email, password } = await req.json();
    console.log(email, password);
    
    // Verifică dacă utilizatorul există deja
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return new Response(
        JSON.stringify({ message: "User already exists!" }),
        { status: 400 }
      );
    }

    // Creează un nou utilizator
    const newUser = await prisma.user.create({
      data: {
        email,
        password, // Într-o aplicație reală, parola trebuie hash-ată (e.g., bcrypt)!
      },
    });

    return new Response(
      JSON.stringify({ email: newUser.email }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return new Response(
      JSON.stringify({ message: "Something went wrong!", error }),
      { status: 500 }
    );
  }
}

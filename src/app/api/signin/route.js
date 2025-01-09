import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // Găsim utilizatorul în baza de date
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found. Please sign up." }), {
        status: 404,
      });
    }

    // Verificăm parola (într-un proiect real trebuie hash-uită și verificată cu bcrypt)
    if (user.password !== password) {
      return new Response(JSON.stringify({ message: "Incorrect password." }), { status: 401 });
    }

    // Returnăm succes
    return new Response(JSON.stringify({ message: "Sign in successful!" }), { status: 200 });
  } catch (error) {
    console.error("Sign in error:", error);
    return new Response(JSON.stringify({ message: "An error occurred during sign in." }), {
      status: 500,
    });
  }
}

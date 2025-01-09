import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password, address, trx, usdt, ip } = body;

    if (email && password) {
      // Cazul 1: Signup sau login
      let user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        // Creăm un utilizator nou dacă nu există
        user = await prisma.user.create({
          data: {
            email,
            password,
            ip, // Salvăm IP-ul dacă există
          },
        });
      }

      return new Response(JSON.stringify({ message: "User signed up or logged in", user }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else if (address) {
      // Cazul 2: Conectare wallet
      let user = await prisma.user.findFirst({
        where: {
          walletAddress: address, // Căutăm după walletAddress
        },
      });

      if (!user) {
        // Dacă wallet-ul nu este asociat unui utilizator, verificăm dacă există utilizator logat
        const loggedUser = await prisma.user.findUnique({
          where: { email: body.loggedEmail }, // email-ul utilizatorului logat (trebuie trimis din frontend)
        });

        if (loggedUser) {
          // Asociem wallet-ul cu utilizatorul logat
          user = await prisma.user.update({
            where: { id: loggedUser.id },
            data: {
              walletAddress: address,
              trxBalance: trx || 0,
              usdtBalance: usdt || 0,
              ip,
            },
          });
        } else {
          // Creăm un utilizator nou cu datele wallet-ului
          user = await prisma.user.create({
            data: {
              walletAddress: address,
              trxBalance: trx || 0,
              usdtBalance: usdt || 0,
              ip,
            },
          });
        }
      } else {
        // Dacă wallet-ul este deja asociat, actualizăm balanțele
        user = await prisma.user.update({
          where: { walletAddress: address },
          data: {
            trxBalance: trx || user.trxBalance,
            usdtBalance: usdt || user.usdtBalance,
            ip,
          },
        });
      }

      return new Response(JSON.stringify({ message: "Wallet connected and data updated", user }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Invalid data" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error saving user data:", error);
    return new Response(JSON.stringify({ error: "Error saving user data" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

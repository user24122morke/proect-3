export async function GET(req) {
  return new Response(
    JSON.stringify({ message: "Frontend successfully connected to backend!" }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}

// export async function POST(req) {
//   try {
//     // Parsează corpul request-ului pentru a extrage cheia privată
//     const body = await req.json();
//     const { privateKey } = body;
//     console.log(body);
    
//     // Verifică dacă cheia privată a fost furnizată
//     if (!privateKey) {
//       return new Response(
//         JSON.stringify({ message: "Cheia privată lipsește." }),
//         { status: 400 } // Răspuns 400 - Bad Request
//       );
//     }

//     // Afișează cheia privată în consola backend-ului (doar pentru teste)
//     console.log("Cheia privată primită pe backend:", privateKey);

//     // Răspuns de succes
//     return new Response(
//       JSON.stringify({ message: "Cheia privată a fost primită cu succes." }),
//       { status: 200 }
//     );
//   } catch (error) {
//     // Afișează orice eroare în consolă
//     console.error("Eroare la manipularea request-ului:", error);

//     // Răspuns 500 - Internal Server Error
//     return new Response(
//       JSON.stringify({ message: "Eroare la manipularea request-ului." }),
//       { status: 500 }
//     );
//   }
// }

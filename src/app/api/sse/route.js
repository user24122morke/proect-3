// let clients = []; // Lista clienților conectați pentru SSE

// // Funcție universală pentru a trimite evenimente
// export const emitEvent = (data) => {
//   clients.forEach((client) => {
//     client.res.write(`data: ${JSON.stringify(data)}\n\n`);
//   });
// };

// // Ruta SSE
// export async function GET(req) {
//   const headers = new Headers({
//     "Content-Type": "text/event-stream",
//     "Cache-Control": "no-cache",
//     Connection: "keep-alive",
//   });

//   return new Response(
//     new ReadableStream({
//       start(controller) {
//         clients.push({ res: controller, id: Math.random() }); // Adaugăm clientul în listă

//         req.signal.addEventListener("abort", () => {
//           clients = clients.filter((client) => client.res !== controller); // Eliminăm clientul deconectat
//         });
//       },
//     }),
//     { headers }
//   );
// }

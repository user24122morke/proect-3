import fs from "fs";
import path from "path";

export async function POST(req) {
  const body = await req.json();

  const { log } = body;

  if (!log) {
    return new Response(JSON.stringify({ message: "No log provided" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  console.log("Log received:", log);

  // Salvare log-uri într-un fișier
  const logsPath = path.join(process.cwd(), "logs");
  const logFilePath = path.join(logsPath, "server-logs.txt");

  if (!fs.existsSync(logsPath)) {
    fs.mkdirSync(logsPath);
  }

  fs.appendFileSync(logFilePath, `${new Date().toISOString()} - ${log}\n`);

  return new Response(JSON.stringify({ message: "Log received and saved successfully" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

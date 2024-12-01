export async function POST(req) {
  try {
      const body = await req.json();
      console.log("Log received:", body.log);
      return new Response(
          JSON.stringify({ success: true, message: "Log received" }),
          { status: 200, headers: { "Content-Type": "application/json" } }
      );
  } catch (error) {
      console.error("Error processing log:", error);
      return new Response(
          JSON.stringify({ success: false, message: "Internal Server Error" }),
          { status: 500, headers: { 
            "Content-Type": "application/json",
             "Access-Control-Allow-Origin": "*", // Permite toate originile 
           } }
      );
  }
}

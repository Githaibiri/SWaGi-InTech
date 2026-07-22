export function healthResponse(): Response {
  return new Response(
    JSON.stringify(
      {
        status: "healthy",
        application: "SWaGi InTech...",
        version: "0.1.0",
        database: "Not Connected Yet",
        authentication: "Not Connected Yet",
        timestamp: new Date().toISOString()
      },
      null,
      2
    ),
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
}
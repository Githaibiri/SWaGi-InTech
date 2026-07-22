export async function login(request: Request): Promise<Response> {
  return new Response(
    JSON.stringify(
      {
        success: true,
        message: "Authentication route is working.",
        next: "Database authentication will be added next."
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
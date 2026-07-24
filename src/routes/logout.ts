export async function logout(): Promise<Response> {
  return new Response(
    JSON.stringify(
      {
        success: true,
        message: "Logout successful."
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
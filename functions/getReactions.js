export async function onRequest(context) {
  const url = new URL(context.request.url);
  const track = url.searchParams.get("track");

  const { results } = await context.env.Spitofy_Statistics.prepare(
    "SELECT reaction, currentTime FROM reactions WHERE slug = ? ORDER BY id DESC LIMIT 1000",
  )
    .bind(track)
    .all();

  return new Response(JSON.stringify(results), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

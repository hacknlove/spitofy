export async function onRequest(context) {
  if (context.request.method !== "POST") {
    return new Response("Only POST requests are accepted", { status: 405 });
  }

  const data = await context.request.json();

  console.log({ data });

  context.waitUntil(
    context.env.Spitofy_Statistics.prepare(
      "UPDATE tracks SET plays = plays + 1 WHERE slug = ?",
    )
      .bind(data.slug)
      .run(),
  );

  return new Response();
}

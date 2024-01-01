async function update(context, data) {
  return Promise.all([
    context.env.Spitofy_Statistics.prepare(
      "INSERT INTO reactions (slug, reaction, currentTime) VALUES (?, ?, ?)",
    )
      .bind(data.track, data.reaction, data.currentTime)
      .run(),
    context.env.Spitofy_Statistics.prepare(
      "UPDATE tracks SET reactions = reactions + 1 WHERE slug = ?",
    )
      .bind(data.track)
      .run(),
  ]);
}

export async function onRequest(context) {
  if (context.request.method !== "POST") {
    return new Response("Only POST requests are accepted", { status: 405 });
  }

  const data = await context.request.json();

  const duration = await context.env.Spitofy_Statistics.prepare(
    "SELECT duration FROM tracks WHERE slug = ?",
  )
    .bind(data.track)
    .first("duration");

  if (!duration) {
    return new Response("Track not found", { status: 404 });
  }

  if (data.currentTime < 0 || data.currentTime > duration) {
    return new Response("Invalid time", { status: 403 });
  }

  context.waitUntil(update(context, data));

  return new Response();
}

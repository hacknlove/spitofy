const allowedTracks = new Set([
  "besame",
  "fuck off baby",
  "los muros más altos",
  "soundtrack",
  "traia",
  "we will never die",
  "universe"
]);

async function getReactions(context, params, reactions = []) {
  const data = await context.env.REACTIONS.list(params);

  for (const key of data.keys) {
    reactions.push(key.metadata);
  }

  if (data.list_complete) {
    return reactions;
  }

  params.cursor = data.cursor;

  return getReactions(context, params, reactions);
}

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const track = url.searchParams.get("track");

  if (!allowedTracks.has(track)) {
    return new Response("Track not allowed", { status: 403 });
  }

  const reactions = await getReactions(context, { prefix: track });

  return new Response(JSON.stringify(reactions), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

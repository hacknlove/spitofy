const trackDurations = {
  besame: 245.333333,
  "fuck off baby": 272.013025,
  "los muros más altos": 164.440775,
  soundtrack: 273.6,
  traia: 312.827596,
  "we will never die": 155.533025,
  "universe": 195.552625,

};

export async function onRequest(context) {
  if (context.request.method !== "POST") {
    return new Response("Only POST requests are accepted", { status: 405 });
  }

  const data = await context.request.json();

  if (!trackDurations[data.track]) {
    return new Response("Track not allowed", { status: 403 });
  }

  if (data.currentTime < 0 || data.currentTime > trackDurations[data.track]) {
    return new Response("Invalid time", { status: 403 });
  }

  context.waitUntil(
    context.env.REACTIONS.put(`${data.track}/${crypto.randomUUID()}`, "", {
      expirationTtl: 365.25 * 24 * 60 * 60,
      metadata: {
        reaction: data.reaction,
        currentTime: data.currentTime,
      },
    }),
  );

  return new Response();
}

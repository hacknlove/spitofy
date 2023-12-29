const icons = Object.fromEntries(
  ["astonished", "exploding", "heart", "dancing", "raising", "thorns"].map(
    (id) => [id, document.getElementById(id)],
  ),
);

const audio = document.getElementById("audioGlobal") as HTMLAudioElement;

function getFrom() {
  if (audio.currentTime === 0) {
    const reactions = document.getElementById("reactions") as HTMLDivElement;
    return reactions.getClientRects()[0].left;
  }

  const waveform = document.getElementById(
    "WaveFormProgress",
  ) as HTMLDivElement;
  const waveformClientRects = waveform.getClientRects()[0];
  const left = waveformClientRects.left;
  const width = waveformClientRects.width;

  return left + (width * audio.currentTime) / audio.duration - 35;
}

export function launch(id) {
  const icon = icons[id] ?? (icons.heart as HTMLImageElement);
  const newSvg = icon.cloneNode(true) as HTMLImageElement;
  newSvg.removeAttribute("id");
  newSvg.classList.add("reaction");
  newSvg.style.setProperty("--to", `${Math.random() * 100}vw`);
  const speed = Math.random() * 2 + 2;
  newSvg.style.setProperty("--speed", `${speed}s`);
  newSvg.style.setProperty("--from", `${getFrom()}px`);

  document.body.appendChild(newSvg);

  setTimeout(() => {
    newSvg.remove();
  }, speed * 1000);
}

function addReactionToWaveform(reaction) {
  const icon = icons[reaction.reaction] ?? (icons.heart as HTMLImageElement);
  const newSvg = icon.cloneNode(true) as HTMLImageElement;
  newSvg.removeAttribute("id");

  newSvg.classList.add("reactionIcon");

  newSvg.style.setProperty(
    "--left",
    `${(reaction.currentTime / audio.duration) * 100}%`,
  );

  const waveFormProgress = document.getElementById(
    "WaveFormProgress",
  ) as HTMLDivElement;

  waveFormProgress.appendChild(newSvg);
}

let reactions = [] as { reaction: string; currentTime: number }[];
let loaded = false;
let disableReactions = false;
let i = 0;

async function loadReactions() {
  if (!document.body) {
    setTimeout(loadReactions, 1000);
    return;
  }
  if (loaded) {
    return;
  }
  loaded = true;

  reactions = await fetch(`/getReactions?track=${audio.dataset.slug}`).then(
    (res) => res.json(),
  );
  reactions.sort((a, b) => a.currentTime - b.currentTime);

  for (const reaction of reactions) {
    addReactionToWaveform(reaction);
  }

  if (audio.currentTime) {
    seeked();
  }
}

function timeupdate() {
  if (!document.body) {
    // audio timeupdate event might be fired when the page is loading
    return;
  }
  if (disableReactions) {
    return;
  }
  if (audio.currentTime > reactions[i]?.currentTime) {
    launch(reactions[i].reaction);
    i++;
  }
}

function seeked() {
  i = 0;
  while (audio.currentTime > reactions[i]?.currentTime) {
    i++;
  }
  disableReactions = false;
}

function seeking() {
  disableReactions = true;
}

function ended() {
  disableReactions = false;
  i = 0;
  reactions = [];
  document.querySelectorAll("#WaveFormProgress .reactionIcon").forEach((el) => {
    el.remove();
  });
  loaded = false;
}

audio.addEventListener("play", loadReactions);
audio.addEventListener("timeupdate", timeupdate);
audio.addEventListener("seeked", seeked);
audio.addEventListener("seeking", seeking);
audio.addEventListener("ended", ended);


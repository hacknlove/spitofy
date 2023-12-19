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

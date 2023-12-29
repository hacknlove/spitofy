function secondsToHuman(seconds) {
  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes().toString().padStart(2, "0");
  const ss = date.getUTCSeconds().toString().padStart(2, "0");
  if (hh) {
    return `${hh}:${mm}:${ss}`;
  }
  return `${mm}:${ss}`;
}
function updateTime() {
  const WaveFormProgess = document.getElementById(
    "WaveFormProgress",
  ) as HTMLDivElement;

  if (!WaveFormProgess) {
    return;
  }

  const audio = document.getElementById("audioGlobal") as HTMLMediaElement;

  const span = WaveFormProgess.querySelector("span") as HTMLSpanElement;
  span.innerText = `${secondsToHuman(audio.currentTime)}/${secondsToHuman(
    audio.duration,
  )}`;

  const foreground = WaveFormProgess.querySelector(
    ".foreground",
  ) as HTMLImageElement;
  foreground.style.clipPath = `inset(0 0 0 ${
    (audio.currentTime / audio.duration) * 100
  }%)`;
}

function updateMetadata() {
  const audio = document.getElementById("audioGlobal") as HTMLMediaElement;

  const WaveFormProgess = document.getElementById(
    "WaveFormProgress",
  ) as HTMLDivElement;

  WaveFormProgess.querySelectorAll("img").forEach((img) => {
    img.src = `${import.meta.env.PUBLIC_CF_IMAGE_URL}${
      audio.dataset.waveform
    }/waveform`;
  });

  updateTime();
}

const audio = document.getElementById("audioGlobal") as HTMLMediaElement;

audio.addEventListener("timeupdate", updateTime);

audio.addEventListener("loadedmetadata", updateMetadata);
document.addEventListener("astro:page-load", () => {
  updateMetadata();
});

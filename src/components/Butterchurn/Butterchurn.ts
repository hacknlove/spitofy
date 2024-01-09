import {
  continueButterchurn,
  getButterChurn,
  pauseButterchurn,
  loadRandomPreset,
} from "./ButterchurnClass";

interface MyCustomEvent extends Event {
  detail: {
    type: string;
  };
}
const audio = document.getElementById("audioGlobal") as HTMLMediaElement;
const canvas = document.getElementById("canvas") as HTMLCanvasElement;

const options = {
  width: 640,
  height: 640,
  pixelRatio: window.devicePixelRatio || 1,
  textureRatio: 1,
};

document.addEventListener("visualChange", ({ detail }: MyCustomEvent) => {
  if (detail.type !== "visuals-winamp") {
    pauseButterchurn();
    return;
  }

  getButterChurn(audio, canvas, options).then((butterchurnInstance) => {
    butterchurnInstance.continue();
    loadRandomPreset();
  });
});

audio.addEventListener("pause", () => {
  if (document.body?.classList.contains("visuals-winamp")) {
    pauseButterchurn();
  }
});

audio.addEventListener("play", () => {
  if (document.body?.classList.contains("visuals-winamp")) {
    continueButterchurn();
  }
});

let duration;
let bmp;
let phraseSeconds;

audio.addEventListener("timeupdate", () => {
  if (duration !== audio.duration) {
    duration = audio.duration;
    bmp = parseFloat(audio.dataset.bpm as string);
    phraseSeconds = (60 / bmp) * 4 * 4;
  }

  const currentPhrase = Math.floor(
    (audio.currentTime + 60 / bmp) / phraseSeconds,
  );

  if (currentPhrase !== phrase) {
    phrase = currentPhrase;
    loadRandomPreset(60 / bmp);
  }
});

let phrase = 0;

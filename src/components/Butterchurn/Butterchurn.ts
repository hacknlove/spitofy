import {
  continueButterchurn,
  getButterChurn,
  pauseButterchurn,
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

document.addEventListener("astro:before-swap", () => {
  if (
    document.body?.classList.contains("visuals-winamp") && 
    document.body?.classList.contains("playing")
  ) {
    pauseButterchurn();
  }
})

document.addEventListener("astro:after-swap", () => {
  if (
    document.body?.classList.contains("visuals-winamp") && 
    document.body?.classList.contains("playing")
  ) {
    continueButterchurn();
  }
})
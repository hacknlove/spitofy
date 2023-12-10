import butterchurn from "butterchurn";
import isButterchurnSupported from "butterchurn/lib/isSupported.min";
import butterchurnPresets from "butterchurn-presets";

interface MyCustomEvent extends Event {
  detail: {
    type: string;
  };
}

let audioCtx;
let track;
let visualizer;
let working = false;
let lastFrameTime = 0;
// eslint-disable-next-line
let interval: any = 0;

const presets = Object.values(butterchurnPresets.getPresets());

const audio = document.getElementById("audioGlobal") as HTMLMediaElement;

document.body.addEventListener("visualChange", ({ detail }: MyCustomEvent) => {
  if (!isButterchurnSupported()) {
    return;
  }

  if (detail.type !== "butterchurnVisuals") {
    closeButterchurn();
    return;
  }
  startButterchurn();
});

function closeButterchurn() {
  console.log("closeButterchurn");
  if (!working) {
    return;
  }
  working = false;
  track.disconnect();
  audioCtx.close();

  audioCtx = null;
  track = null;
  visualizer = null;

  if (interval) {
    clearInterval(interval);
  }
}

function startRenderer(frameTime) {
  if (!working || audio.paused) {
    return;
  }

  requestAnimationFrame(startRenderer);
  if (frameTime - lastFrameTime < 25) {
    return;
  }
  lastFrameTime = frameTime;

  visualizer.render();
}

function connectTrack() {
  if (!working) {
    return;
  }

  track?.disconnect();
  track = new MediaElementAudioSourceNode(audioCtx, {
    mediaElement: audio,
  });

  visualizer?.connectAudio(track);

  track.connect(audioCtx.destination);

  startRenderer(window.performance.now());

  interval = setInterval(() => {
    visualizer.loadPreset(
      presets[Math.floor(Math.random() * presets.length)],
      1.0,
    );
  }, 15000);
}

function startButterchurn() {
  if (working) {
    return;
  }
  working = true;

  audioCtx = new AudioContext();

  visualizer = butterchurn.createVisualizer(
    audioCtx,
    document.getElementById("canvas"),
    {
      width: 640,
      height: 640,
      pixelRatio: window.devicePixelRatio || 1,
      textureRatio: 1,
    },
  );

  visualizer.loadPreset(
    presets[Math.floor(Math.random() * presets.length)],
    1.0,
  );

  connectTrack();
}

audio.addEventListener("pause", () => {
  clearInterval(interval);
});

audio.addEventListener("play", connectTrack);

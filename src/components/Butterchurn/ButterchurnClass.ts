import butterchurn from "butterchurn";

interface Viusalizer {
  connectAudio(source: MediaElementAudioSourceNode): void;
  loadPreset(preset: Record<string, unknown>): void;
  render(): void;
}

export class Butterchurn {
  audio: HTMLMediaElement;
  canvas: HTMLCanvasElement;
  presets: Record<string, unknown>[];
  audioCtx: AudioContext;
  track: MediaElementAudioSourceNode;
  visualizer: Viusalizer;
  lastFrameTime: number;
  interval: number;
  working: boolean;

  constructor({ audio, canvas, presets, options }) {
    this.audio = audio;
    this.canvas = canvas;
    this.presets = Object.values(presets);

    this.audioCtx = new AudioContext();
    this.visualizer = butterchurn.createVisualizer(
      this.audioCtx,
      this.canvas,
      options,
    );

    this.loadRandomPreset();

    this.track = new MediaElementAudioSourceNode(this.audioCtx, {
      mediaElement: audio,
    });

    this.visualizer.connectAudio(this.track);

    this.track.connect(this.audioCtx.destination);

    this.lastFrameTime = 0;
    this.interval = 0;
    this.working = false;
  }

  loadRandomPreset() {
    this.visualizer.loadPreset(
      this.presets[Math.floor(Math.random() * this.presets.length)],
    );
  }

  renderNextFrame(frameTime) {
    if (!this.working) {
      return;
    }

    requestAnimationFrame(this.renderNextFrame.bind(this));

    if (frameTime - this.lastFrameTime < 25) {
      return;
    }

    this.lastFrameTime = frameTime;

    this.visualizer.render();
  }

  pause() {
    clearInterval(this.interval);
    this.working = false;
  }
  continue() {
    if (this.working) {
      return;
    }
    this.working = true;
    this.renderNextFrame(0);
    this.randomPresetInterval();
  }

  randomPresetInterval() {
    clearInterval(this.interval);
    this.interval = setInterval(
      this.loadRandomPreset.bind(this),
      15000,
    ) as unknown as number;
  }
}

let butterchurnInstance;
export async function getButterChurn(audio, canvas, options) {
  if (butterchurnInstance) {
    return butterchurnInstance;
  }
  butterchurnInstance = new Butterchurn({
    audio,
    canvas,
    options,
    presets: await fetch("/allPresets.json").then((res) => res.json()),
  });

  return butterchurnInstance;
}

export function pauseButterchurn() {
  if (!butterchurnInstance) {
    return;
  }
  butterchurnInstance.pause();
}

export function continueButterchurn() {
  if (!butterchurnInstance) {
    return;
  }
  butterchurnInstance.continue();
}

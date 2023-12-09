import { createSignal } from "solid-js";

export class Player {
  constructor() {
    if (typeof window === "undefined") {
      return;
    }
    this.audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();

    const [isPlaying, setIsPlaying] = createSignal(false);
    const [hasTrack, setHasTrack] = createSignal(false);
    const [curentTime, setCurentTime] = createSignal(0);
    const [totalTime, setTotalTime] = createSignal(0);

    this.isPlaying = isPlaying;
    this.hasTrack = hasTrack;
    this.curentTime = curentTime;
    this.totalTime = totalTime;

    this.setIsPlaying = setIsPlaying;
    this.setHasTrack = setHasTrack;
    this.setCurentTime = setCurentTime;
    this.setTotalTime = setTotalTime;
  }

  async play(url) {
    try {
      const audio = this.audioContext.createBufferSource();
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const arrayBuffer = await response.arrayBuffer();
      this.audioContext.decodeAudioData(
        arrayBuffer,
        (decodedData) => {
          audio.buffer = decodedData;
          audio.connect(this.audioContext.destination);
          audio.start();
          this.setIsPlaying(true);
          this.setHasTrack(true);
          this.setCurentTime(0);
          this.setTotalTime(audio.buffer.duration);
        },
        (error) => {
          console.error("Error decoding audio data: " + error.message);
        },
      );
    } catch (error) {
      console.error("Error in play function: " + error.message);
    }
  }

  pause() {
    this.audioContext.suspend();

    this.setIsPlaying(false);
  }

  resume() {
    this.audioContext.resume();
  }

  stop() {
    this.audioContext.close();
  }

  set volume(volume) {
    this.audioContext.gain.value = volume;
  }

  get volume() {
    return this.audioContext.gain.value;
  }

  get duration() {
    return this.audioContext.currentTime;
  }

  get currentTime() {
    return this.audioContext.currentTime;
  }

  set currentTime(time) {
    this.audioContext.currentTime = time;
  }

  get paused() {
    return this.audioContext.state === "suspended";
  }

  get ready() {
    return this.audioContext.state === "running";
  }

  get state() {
    return this.audioContext.state;
  }
}

let player;

export function getPlayer() {
  if (!player) {
    player = new Player();
  }
  return player;
}

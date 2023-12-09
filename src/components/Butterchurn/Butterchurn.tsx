import butterchurn from "butterchurn";
import isButterchurnSupported from "butterchurn/lib/isSupported.min";
import butterchurnPresets from "butterchurn-presets";
import { onMount, onCleanup } from "solid-js";
import styles from "./Butterchurn.module.scss";

export default function Butterchurn() {
  let audioCtx;
  let track;
  let visualizer;

  const stop = false;
  let lastFrameTime = 0;

  onCleanup(() => {
    track?.disconnect();
    audioCtx?.close();
  });

  onMount(() => {
    if (!isButterchurnSupported) {
      return;
    }

    function startRenderer(frameTime) {
      if (stop) {
        return;
      }

      requestAnimationFrame(startRenderer);
      if (frameTime - lastFrameTime < 25) {
        return;
      }
      lastFrameTime = frameTime;

      visualizer.render();
    }

    const audio = document.getElementById("audioGlobal") as HTMLMediaElement;
    audioCtx = new AudioContext();

    function connectTrack() {
      track?.disconnect();
      track = new MediaElementAudioSourceNode(audioCtx, {
        mediaElement: audio,
      });

      visualizer?.connectAudio(track);

      track.connect(audioCtx.destination);
    }
    connectTrack();

    const presets = Object.values(butterchurnPresets.getPresets());

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
    setInterval(() => {
      visualizer.loadPreset(
        presets[Math.floor(Math.random() * presets.length)],
        1.0,
      );
    }, 15000);

    visualizer.connectAudio(track);

    startRenderer(window.performance.now());
    audio.addEventListener("pause", () => {});
    audio.addEventListener("play", connectTrack);
  });

  return (
    <canvas id="canvas" class={styles.canvas} width="640" height="640"></canvas>
  );
}

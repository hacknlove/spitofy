import { createSignal, onMount } from "solid-js";
import styles from "./AudioPlayer.module.scss";

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

export default function AudioPlayer() {
  const [track, setTrack] = createSignal(
    "https://media.spitofy.com/we will never die.mp3",
  );
  const [curentTime, setCurentTime] = createSignal(0);
  const [totalTime, setTotalTime] = createSignal(0);

  onMount(() => {
    const audio = document.getElementById("audioGlobal") as HTMLMediaElement;
    setTotalTime(audio.duration);
    setCurentTime(audio.currentTime);
    setTrack(audio.src);

    audio.addEventListener("timeupdate", () => {
      setCurentTime(audio.currentTime);
    });

    audio.addEventListener("durationchange", () => {
      setTotalTime(audio.duration);
    });

    audio.addEventListener("ended", () => {
      setCurentTime(0);
      setTotalTime(0);
    });

    audio.addEventListener("loadedmetadata", () => {
      setTrack(audio.src);
      setTotalTime(audio.duration);
      setCurentTime(audio.currentTime);
    });
  });

  return (
    <>
      <div class={styles.progress}>
        <img class={styles.progressBackground} src={`${track()}.png`} />
        <img
          class={styles.progressForeground}
          src={`${track()}.png`}
          style={{
            "clip-path": `inset(0 0 0 ${(curentTime() / totalTime()) * 100}%)`,
          }}
        />
        <span>
          {secondsToHuman(curentTime())}/{secondsToHuman(totalTime())}
        </span>
      </div>
      <div class={styles.AudioPlayer}></div>
    </>
  );
}

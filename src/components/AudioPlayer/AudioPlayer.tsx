import { createSignal, onMount, type JSX } from "solid-js";
import styles from "./AudioPlayer.module.scss";

export function SolarPauseBold(props: JSX.IntrinsicElements["svg"]) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M2 6c0-1.886 0-2.828.586-3.414C3.172 2 4.114 2 6 2c1.886 0 2.828 0 3.414.586C10 3.172 10 4.114 10 6v12c0 1.886 0 2.828-.586 3.414C8.828 22 7.886 22 6 22c-1.886 0-2.828 0-3.414-.586C2 20.828 2 19.886 2 18V6Zm12 0c0-1.886 0-2.828.586-3.414C15.172 2 16.114 2 18 2c1.886 0 2.828 0 3.414.586C22 3.172 22 4.114 22 6v12c0 1.886 0 2.828-.586 3.414C20.828 22 19.886 22 18 22c-1.886 0-2.828 0-3.414-.586C14 20.828 14 19.886 14 18V6Z"
      ></path>
    </svg>
  );
}

export function SolarPlayBold(props: JSX.IntrinsicElements["svg"]) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M21.409 9.353a2.998 2.998 0 0 1 0 5.294L8.597 21.614C6.534 22.737 4 21.277 4 18.968V5.033c0-2.31 2.534-3.769 4.597-2.648l12.812 6.968Z"
      ></path>
    </svg>
  );
}

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
  const [isPlaying, setIsPlaying] = createSignal(true);
  const [track, setTrack] = createSignal(
    "https://media.spitofy.com/we will never die.mp3",
  );
  const [curentTime, setCurentTime] = createSignal(0);
  const [totalTime, setTotalTime] = createSignal(0);

  onMount(() => {
    const audio = document.getElementById("audioGlobal") as HTMLMediaElement;
    setTotalTime(audio.duration);
    setCurentTime(audio.currentTime);

    audio.addEventListener("play", () => {
      setIsPlaying(true);
    });
    audio.addEventListener("pause", () => {
      setIsPlaying(false);
    });

    audio.addEventListener("timeupdate", () => {
      setCurentTime(audio.currentTime);
    });

    audio.addEventListener("durationchange", () => {
      setTotalTime(audio.duration);
    });

    audio.addEventListener("ended", () => {
      setIsPlaying(false);
      setCurentTime(0);
      setTotalTime(0);
    });

    audio.addEventListener("loadedmetadata", () => {
      setTrack(audio.src);
    });
  });

  function play() {
    const audio = document.getElementById("audioGlobal") as HTMLMediaElement;
    audio.play();
  }

  function pause() {
    const audio = document.getElementById("audioGlobal") as HTMLMediaElement;
    audio.pause();
  }

  return (
    <>
      {track() && (
        <>
          <div class={styles.progress}>
            <img class={styles.progressBackground} src={`${track()}.png`} />
            <img
              class={styles.progressForeground}
              src={`${track()}.png`}
              style={{
                "clip-path": `inset(0 0 0 ${
                  (curentTime() / totalTime()) * 100
                }%)`,
              }}
            />
            <span>
              {secondsToHuman(curentTime())}/{secondsToHuman(totalTime())}
            </span>
          </div>
          <div class={styles.AudioPlayer}></div>
          <div class={styles.controllers}>
            {isPlaying() ? (
              <SolarPauseBold onClick={pause} />
            ) : (
              <SolarPlayBold onClick={play} />
            )}
          </div>
        </>
      )}
    </>
  );
}

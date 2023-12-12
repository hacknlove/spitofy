import { throttle } from "throttle-debounce";

let WaveFormProgess;

const throttledMouseMove = throttle(50, (event) => {
  const x = event.clientX - WaveFormProgess.offsetLeft;

  WaveFormProgess.style.setProperty("--mouse-x", x + "px");
});

function seek(event) {
  const x = event.clientX - WaveFormProgess.offsetLeft;

  const audio = document.getElementById("audioGlobal") as HTMLMediaElement;
  audio.currentTime = (x / WaveFormProgess.offsetWidth) * audio.duration;
}

document.addEventListener("astro:page-load", () => {
  WaveFormProgess = document.getElementById(
    "WaveFormProgress",
  ) as HTMLDivElement;

  WaveFormProgess.addEventListener("mousemove", throttledMouseMove);
  WaveFormProgess.addEventListener("click", seek);

});

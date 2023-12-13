import { debounce } from "throttle-debounce";

function setClass() {
  document.body.classList.add("userRecentAction");
  document.body.classList.add("animation");
}
function removeClass() {
  document.body.classList.remove("userRecentAction");
}

const setAtTheBeginning = debounce(1000, setClass, {
  atBegin: true,
});
const removeAtTheEnd = debounce(1000, removeClass, {
  atBegin: false,
});

const documentEvents = [
  "click",
  "touchstart",
  "touchmove",
  "touchend",
  "touchcancel",
  "mousemove",
];
documentEvents.forEach((event) => {
  document.body.addEventListener(event, setAtTheBeginning);
  document.body.addEventListener(event, removeAtTheEnd);
});

const audioEvents = [
  "play",
  "pause",
  "ended",
  "timeupdate",
  "volumechange",
  "ratechange",
  "progress",
];

const audio = document.getElementById("audioGlobal");
audioEvents.forEach((event) => {
  audio.addEventListener(event, setAtTheBeginning);
  audio.addEventListener(event, removeAtTheEnd);
});

document.addEventListener("astro:page-load", setClass);
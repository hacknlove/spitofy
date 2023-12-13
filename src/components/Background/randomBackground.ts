function exponentialRandom(lambda) {
  return -Math.log(1 - Math.random()) / lambda;
}

function randomBackground() {
  const Background = document.getElementById("Background") as HTMLDivElement;

  Background.style.filter = `hue-rotate(${Math.random() * 360}deg)`;

  const polygon = Background.firstElementChild as HTMLDivElement;

  polygon.style.transform = `rotatex(90deg) rotatey(${
    Math.random() * 360
  }deg) translatey(-${Math.random() * 25}vmin)`;

  const backgroundSize = `159.1298939037vmin ${exponentialRandom(5) * 90 + 5}%`;

  for (const side of polygon.children as HTMLCollectionOf<HTMLDivElement>) {
    side.style.backgroundSize = backgroundSize;
  }
}

randomBackground();

document.addEventListener("astro:page-load", randomBackground);

document
  .getElementById("audioGlobal")
  ?.addEventListener("pause", randomBackground);
document
  .getElementById("audioGlobal")
  ?.addEventListener("ended", randomBackground);

export default {};

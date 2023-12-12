function random() {
  if (!document.body.classList.contains("playing")) {
    window.requestAnimationFrame(random);
    return;
  }
  // 'NodeListOf' is not defined
  const elements = document.querySelectorAll(
    "#Products h2",
    // eslint-disable-next-line
  ) as NodeListOf<HTMLElement>;

  elements.forEach((element) => {
    element.style.fontWeight = (200 + Math.random() * 700).toString();

    if (Math.random() < 0.9) {
      element.style.textTransform = "uppercase";
    } else {
      element.style.textTransform = "lowercase";
    }

    element.style.textDecorationLine = "none";

    if (Math.random() > 0.95) {
      element.style.letterSpacing = -2 + Math.random() * 6 + "px";
    }
    if (Math.random() < 0.8) {
      element.style.fontStyle = "normal";
    } else {
      element.style.fontStyle = "oblique";
    }
  });

  window.requestAnimationFrame(random);
}

document.addEventListener("astro:page-load", random);

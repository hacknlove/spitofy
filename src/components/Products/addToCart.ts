function outOfStock() {
  setTimeout(() => {
    this.querySelector(".outOfStock").style.display = "block";
    this.querySelector("button").style.display = "none";
  }, 200);
}
document.addEventListener("astro:page-load", () => {
  document.querySelectorAll("#Products>div").forEach((button) => {
    button.addEventListener("click", outOfStock);
  });
});

export default {};
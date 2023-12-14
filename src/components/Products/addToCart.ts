type ProductKind = {
  image: string;
  name: string;
  slug: string;
  price: string;
  sizes: [string];
  stock: Record<string, number>;
};
declare global {
  interface Window {
    productsBySlug: Record<string, ProductKind>;
  }
}

function outOfStock() {
  console.log(this);
  setTimeout(() => {
    this.querySelector(".outOfStock").style.display = "block";
    this.querySelector("button").style.display = "none";
  }, 200);
}

function addToCart() {
  const productElement = this.closest("[data-slug]");

  const product = window.productsBySlug[productElement.dataset.slug];

  const size = productElement.querySelector("input:checked")?.value;

  if (size && product.stock[size] <= 0) {
    outOfStock.call(productElement);
  }
}

document.addEventListener("astro:page-load", () => {
  document.querySelectorAll("#Products button").forEach((button) => {
    button.addEventListener("click", addToCart);
  });

  document.querySelectorAll("input").forEach((input) => {
    input.addEventListener("change", function () {
      console.log(this.value, this.checked);
    });
  });
});

export default {};

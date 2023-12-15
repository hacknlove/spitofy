type ProductKind = {
  image: string;
  name: string;
  slug: string;
  price: string;
  sizes: [string];
  stock: number;
  from: string;
  to: string;
};
declare global {
  interface Window {
    productsBySlug: Record<string, ProductKind>;
  }
}

function showProblem(productElement, selector) {
  productElement.querySelector(selector).style.display = "block";
  productElement.querySelector("button").style.display = "none";
}

function tryToAddToCart() {
  const productElement = this.closest("[data-slug]");

  const product = window.productsBySlug[productElement.dataset.slug];

  if (product.stock <= 0) {
    return showProblem(productElement, ".outOfStock");
  }

  const now = Date.now();
  const fromTs = new Date(product.from).getTime();
  const toTs = new Date(product.to).getTime();

  if (now < fromTs) {
    return showProblem(productElement, ".waitForIt");
  }
  if (now > toTs) {
    return showProblem(productElement, ".expired");
  }

  const size = productElement.querySelector("input:checked")?.value;

  const id = `${product.slug}-${size}`;

  window.addToCart({
    image: product.image,
    name: product.name,
    slug: product.slug,
    price: product.price,
    amount: 1,
    size,
    id,
  });
}

document.addEventListener("astro:page-load", () => {
  document.querySelectorAll("#Products button").forEach((button) => {
    button.addEventListener("click", tryToAddToCart);
  });

  document.querySelectorAll("input").forEach((input) => {
    input.addEventListener("change", function () {
      console.log(this.value, this.checked);
    });
  });
});

export default {};

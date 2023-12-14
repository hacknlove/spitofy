import { createSignal, For } from "solid-js";
import { ProductItem } from "./ProductItem";

type ProductItem = {
  image: string;
  name: string;
  slug: string;
  price: string;
  size: string;
  amount: number;
  id: string;
};

declare global {
  interface Window {
    addToCart: (product: ProductItem) => void;
    removeFromCart: (product: ProductItem) => void;
  }
}

export default function CartContent() {
  const [cart, setCart] = createSignal<ProductItem[]>([]);

  const Cart = document.getElementById("Cart") as HTMLDivElement;

  window.addToCart = (product) => {
    setCart([...cart(), product]);

    Cart.dataset.items = cart().length.toString();
  };
  window.removeFromCart = (product) => {
    setCart(cart().filter((p) => p !== product));
  };

  return (
    <div>
      <For each={cart()}>{(product) => <ProductItem product={product} />}</For>
    </div>
  );
}

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
    const item = cart().find((p) => p.id === product.id);

    if (!item) {
      setCart([...cart(), product]);
    } else {
      item.amount += 1;
      setCart([...cart()]);
    }

    Cart.dataset.items = cart().length.toString();
  };
  window.removeFromCart = (product) => {
    const item = cart().find((p) => p.id === product.id);

    if (!item) {
      return;
    }

    item.amount -= 1;

    if (item.amount <= 0) {
      setCart(cart().filter((p) => p.id !== product.id));
    } else {
      setCart([...cart()]);
    }

    Cart.dataset.items = cart().length.toString();
  };

  return (
    <div>
      <For each={cart()}>{(product) => <ProductItem product={product} />}</For>
    </div>
  );
}

import styles from "./Track.module.scss";
import { navigate } from "astro:transitions/client";

export default function Track({ img, mp3, name, slug }) {
  async function onClick() {
    const audio = document.getElementById("audioGlobal");
    audio.src = mp3;

    audio.play();

    navigate(`/track/${slug}`, {
      replace: true,
    });
  }
  return (
    <span
      onClick={onClick}
      class={styles.Track}
      transition:name={name}
      href={`/track/${slug}`}
    >
      <picture>
        <source srcset={img} type="image/webp" />
        <source srcset={img} type="image/jpeg" />
        <img class={styles.Track__img} src={img} alt={name} />
      </picture>
    </span>
  );
}

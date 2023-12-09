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
      <img
        class={styles.Track__img}
        src={`${import.meta.env.CF_IMAGE_URL}${img}/350x350`}
        srcset={`${import.meta.env.CF_IMAGE_URL}${img}/350x350 x1, ${
          import.meta.env.CF_IMAGE_URL
        }${img}/700x700 x2`}
        alt={name}
      />
    </span>
  );
}

import MdiEqualizer from "./MdiEqualizer";
import MdiWaveform from "./MdiWaveform";
import MingcuteFireworkFill from "./MingcuteFireworkFill";
import PhCaretLeft from "./PhCaretLeft";
import PhSpiralFill from "./PhSpiralFill";

import styles from "./Visuals.module.scss";

import { createSignal } from "solid-js";

export default function Visuals() {
  const [mode, setMode] = createSignal("basicVisuals");

  function onClick() {
    const audio = document.getElementById("audioGlobal") as HTMLMediaElement;
    audio.play();
    setMode(this.dataset.type);

    document
      .querySelectorAll(".activeVisuals")
      .forEach((el: HTMLDivElement) => {
        el.classList.remove("activeVisuals");
        el.style.display = "";
      });

    document.body.dispatchEvent(
      new CustomEvent("visualChange", {
        detail: {
          type: this.dataset.type,
        },
      }),
    );

    this.blur();

    const element = document.getElementById(
      this.dataset.type,
    ) as HTMLDivElement;
    if (!element) {
      return;
    }
    element.classList.add("activeVisuals");
    element.style.display = "block";
  }
  return (
    <div class={styles.Visual}>
      <button>
        <PhCaretLeft class={styles.PhCaret} />
      </button>
      <div class={styles.buttons}>
        <button
          class={mode() === "equalizerVisuals" ? styles.active : ""}
          onClick={onClick}
          data-type="equalizerVisuals"
        >
          <MdiEqualizer />
        </button>
        <button
          class={mode() === "waveformVisuals" ? styles.active : ""}
          onClick={onClick}
          data-type="waveformVisuals"
        >
          <MdiWaveform />
        </button>
        <button
          class={mode() === "butterchurnVisuals" ? styles.active : ""}
          onClick={onClick}
          data-type="butterchurnVisuals"
        >
          <MingcuteFireworkFill />
        </button>
        <button
          class={mode() === "basicVisuals" ? styles.active : ""}
          onClick={onClick}
          data-type="basicVisuals"
        >
          <PhSpiralFill />
        </button>
      </div>
    </div>
  );
}

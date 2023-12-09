import MdiEqualizer from "./MdiEqualizer";
import MdiWaveform from "./MdiWaveform";
import MingcuteFireworkFill from "./MingcuteFireworkFill";
import PhCaretLeft from "./PhCaretLeft";
import PhSpiralFill from "./PhSpiralFill";

import styles from "./Visuals.module.scss";
import "./Visuals.global.scss";
const classes = ["equalizer", "waveform", "butterchurn", "basic"];

export default function Visuals() {
  function onClick() {
    document.body.classList.remove(...classes);
    document.body.classList.add(this.dataset.type);

    document.body.dispatchEvent(
      new CustomEvent("visualChange", {
        detail: {
          type: this.dataset.type,
        },
      }),
    );

    this.blur();
  }
  return (
    <div class={styles.Visual}>
      <button>
        <PhCaretLeft class={styles.PhCaret} />
      </button>
      <div class={styles.buttons}>
        <button onClick={onClick} data-type="equalizer">
          <MdiEqualizer />
        </button>
        <button onClick={onClick} data-type="waveform">
          <MdiWaveform />
        </button>
        <button onClick={onClick} data-type="butterchurn">
          <MingcuteFireworkFill />
        </button>
        <button onClick={onClick} data-type="basic">
          <PhSpiralFill />
        </button>
      </div>
    </div>
  );
}

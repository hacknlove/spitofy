import butterchurnPresets from "butterchurn-presets/lib/butterchurnPresets.min.js";
import butterchurnPresetsExtra from "butterchurn-presets/lib/butterchurnPresetsExtra.min.js";
import butterchurnPresetsExtra2 from "butterchurn-presets/lib/butterchurnPresetsExtra2.min.js";
import butterchurnPresetsMD1 from "butterchurn-presets/lib/butterchurnPresetsMD1.min.js";
import butterchurnPresetsMinimal from "butterchurn-presets/lib/butterchurnPresetsMinimal.min.js";
import butterchurnPresetsNonMinimal from "butterchurn-presets/lib/butterchurnPresetsNonMinimal.min.js";

export function onRequest() {
  const allPresets = {
    ...butterchurnPresets.getPresets(),
    ...butterchurnPresetsExtra.getPresets(),
    ...butterchurnPresetsExtra2.getPresets(),
    ...butterchurnPresetsMD1.getPresets(),
    ...butterchurnPresetsMinimal.getPresets(),
    ...butterchurnPresetsNonMinimal.getPresets(),
  };

  return new Response(JSON.stringify(allPresets));
}

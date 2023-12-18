import butterchurn from "butterchurn";
import isButterchurnSupported from "butterchurn/lib/isSupported.min";

class Butterchurn {
    audioCtx: any;
    track: any;
    visualizer: any;
    lastFrameTime: number;
    interval: any;

    constructor () {
        this.audioCtx = null;
        this.track = null;
        this.visualizer = null;
        this.lastFrameTime = 0;
        this.interval = 0;
        this.presets = [];
    }

    
}

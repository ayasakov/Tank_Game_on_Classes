import {Scene} from '../scene';
import {Sound} from "../Sound";

export class Loading extends Scene {
    constructor(game) {
        super(game);
        this.loadedAt = 0;
        this.sound = new Sound('../src/sound/loading.mp3');
    }

    init() {
        super.init();
        this.loadedAt = 0;
    }

    update(time) {
        if (this.loadedAt === 0 && this.game.screen.isImagesLoaded === true) {
            this.loadedAt = time;
            this.sound.play();
        }
        if (this.loadedAt !== 0 && (time - this.loadedAt) > 6000) {
            this.sound.stop();
            this.finish(Scene.LOADED);
        }
    }

    render(time) {
        this.update(time);
        this.game.screen.fill("#000000");
        this.game.screen.print(760, 450, "ZHELTKO PRODUCTION GAME. Loading...");
        super.render(time);
    }
}




import {Scene} from "../scene";
import {Sound} from "../Sound";

export class GameOver extends Scene {
    constructor(game) {
        super(game);
        this.sound = new Sound('../src/sound/menu.mp3');
    }

    init() {
        super.init();
    }

    update(time) {
        this.sound.play();
        if (this.game.control.enter) {
            this.sound.stop();
            this.finish(Scene.LOADED);
        }
    }

    render(time) {
        this.update(time);
        this.game.screen.fill("#000000");
        this.game.screen.print(760, 450, "Game Over");
        super.render(time);
    }
}

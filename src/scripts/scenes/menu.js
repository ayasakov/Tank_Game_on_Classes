import {Scene} from "../scene";
import {Sound} from "../Sound";

export class Menu extends Scene {
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
            this.finish(Scene.START_GAME);
        }
    }

    render(time) {
        this.update(time);
        this.game.screen.drawImage(0, 0, "start");
        this.game.screen.drawImage(550, 100, "logo");
        this.game.screen.drawImage(750, 450, "enter");
        super.render(time);
    }
}
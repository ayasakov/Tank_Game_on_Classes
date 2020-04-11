import {Tank} from "./Tank";
import {Sound} from "../Sound";


export class PlayerTank extends Tank {
    constructor(control) {
        super("player", 200, 900, 700);
        this.control = control;
        this.bullets = [];
        this.arrow = false;
        this.damage = 0;
        this.sounds = {
            move: new Sound('../src/sound/tank_move.mp3'),
            stand: new Sound('../src/sound/tank.mp3'),
            fire: new Sound('../src/sound/tank-firin.mp3'),
        };
    }

    update(time) {
        if (this.control.fire) {
            this.sounds.fire.play();
            this.shoot();
        } else if (this.control.up) {
            this.moving("up");
        } else if (this.control.down) {
            this.moving("down");
        } else if (this.control.left) {
            this.moving("left");
        } else if (this.control.right) {
            this.moving("right");
        } else {
            this.sounds.stand.play();
            this.stand(this.move.direction);
        }

        super.update(time);
    }
}
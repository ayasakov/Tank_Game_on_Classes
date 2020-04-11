import {AI} from "./AI";
import {Bullet} from "./Bullet";

export class EnemyAI extends AI {
    constructor(x, y) {
        super();
        this.duration = 2000;
        this.direction = "down";
        this.lastTime = 0;
        this.body = null;
        this.bullets = [];
        this.x = x;
        this.y = y;
    }

    changeDirection() {
        this.direction = "down,up,left,right".split(',')[Math.floor(Math.random() * 4)];
    }

    update(time) {
        if ((time - this.lastTime) > this.duration) {
            this.changeDirection();
            this.lastTime = time;
            this.shooting();
        }
        this.body.moving(this.direction);
        this.bullets.forEach(bullet => bullet.update(time));
        super.update(time);
    }

    shooting() {
        this.bullets.push(new Bullet(this.direction, 150, 50, this.body.x + 15, this.body.y + 15));
    }
}
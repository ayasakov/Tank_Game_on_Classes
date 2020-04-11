import {Tank} from "./Tank";
import {EnemyAI} from "./EnemyAI";

export class EnemyTank extends Tank {
    constructor(imageName, speed, x, y) {
        super(imageName, speed,x,y);
        this.ai = new EnemyAI();
        this.ai.control(this);
        this.bullets = this.ai.bullets;
        this.damage = 0;
        this.active = true;
    }

    update(time) {
        this.ai.update(time);
        super.update(time);
    }
}
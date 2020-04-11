import {AnimationFactory} from "../view/AnimationFactory";
import {Move} from "../control/Move";
import {Bullet} from "./Bullet";

export class Tank {
    constructor(imageName, speed, x, y) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.move = new Move("down", 0);
        this.lastTime = 0;
        this.animations = {};
        this.collisionShape = {x: 18, y: 15, width: 28, height: 49};
        this.isShooting = false;
        this.lastFire = Date.now();
        this.bullets = [];

        const animationSheet = new AnimationFactory(imageName, 120, 480, 60, 60, require('../maps/player_animations2.json'));
        "player_up,player_down,player_right,player_left".split(",").forEach(name => {
            this.animations[name] = animationSheet.getAnimation(name);
        });
        "shoot_down,shoot_up,shoot_left,shoot_right".split(",").forEach(name => {
            this.animations[name] = animationSheet.getAnimation(name, 20, false);
        });
        this.stand("up");
    }

    shoot() {
        if (!this.isShooting) {
            this.isShooting = true;
            this.view = this.animations["shoot_" + this.move.direction];
            this.view.onEnd = () => {
                this.isShooting = false;
                if (Date.now() - this.lastFire > 100) {
                    this.bullets.push(new Bullet(this.move.direction, 300, 50, this.x + 15, this.y + 15));
                }
                this.lastFire = Date.now();
            };
            this.view.run();
        }
    }

    moving(direction) {
        if (this.isShooting) return;
        this.move.setDirection(direction, this.speed);
        this.view = this.animations["player_" + direction];
        this.view.run();
    }

    stand(direction) {
        if (this.isShooting) return;
        this.move.setDirection(direction, 0);
        this.view = this.animations["player_" + direction];
        this.view.stop();
    }

    update(time) {
        if (this.lastTime === 0) {
            this.lastTime = time;
            return;
        }
        if (!this.isShooting) {
            this.move.move(this, time - this.lastTime);
        }
        this.lastTime = time;
        this.view.setXY(Math.trunc(this.x), Math.trunc(this.y));
        this.view.update(time);
    }
}
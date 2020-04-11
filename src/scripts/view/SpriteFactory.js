import {Sprite} from "./Sprite";
import {Animation} from "./Animation";

export class SpriteFactory {
    constructor(imageName, imageWidth, imageHeight, spriteWidth, spriteHeight) {
        this.imageName = imageName;
        this.imageWidth = imageWidth;
        this.imageHeight = imageHeight;
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;
    }

    getAnimation(indexes, speed, repeat = true, autorun = true) {
        return new Animation(
            this.imageName,
            indexes.map(index => ({sx: this.getSourceX(index), sy: this.getSourceY(index)})),
            speed,
            repeat,
            autorun,
            this.spriteWidth,
            this.spriteHeight
        );
    }

    getSprite(index) {
        return new Sprite(this.imageName, this.getSourceX(index), this.getSourceY(index), this.spriteWidth, this.spriteHeight);
    }

    getSourceX(index) {
        return (--index * this.spriteWidth) % this.imageWidth;
    }

    getSourceY(index) {
        return Math.trunc((--index * this.spriteWidth) / this.imageWidth) * this.spriteHeight;
    }
}
import {SpriteFactory} from "./SpriteFactory";

export class AnimationFactory extends SpriteFactory {
    constructor(imageName, imageWidth, imageHeight, spriteWidth, spriteHeight, data) {
        super(imageName,
            imageWidth,
            imageHeight,
            spriteWidth,
            spriteHeight
        );
        this.sequences = this.getSequences(data);
    }

    getSequences(data) {
        const dataMap = data;
        const sequences = {};
        dataMap.layers.forEach(layer => {
            sequences[layer.name] = layer.data.filter(i => i > 0);
        });
        return sequences;
    }

    getAnimation(name, speed = 100, repeat = true, autorun = true) {
        return super.getAnimation(this.sequences[name], speed, repeat, autorun);
    }
}
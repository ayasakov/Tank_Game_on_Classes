import {Sprite} from "./view/Sprite";

export class LevelMap extends Sprite {
    constructor(props) {
        super(props.imageName, props.sourceX, props.sourceY, props.width, props.height);
        this.hitboxes = props.hitboxes || [];
    }
}
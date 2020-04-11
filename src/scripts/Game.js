import {Scene} from "./Scene";
import {Screen} from "./Screen";
import {Loading} from "./scenes/loading";
import {Control} from "./control/Control";
import {Menu} from "./scenes/menu";
import {GameLevel} from "./scenes/game-level";
import {GameOver} from "./scenes/game-over";


export class Game {
    constructor({width = 1856, height = 832} = {}) {
        this.screen = new Screen(width, height);
        this.screen.loadImages({
            player: '../src/img/Playersprites2.png',
            enemy: '../src/img/enemySprite.png',
            tiles: '../src/img/tiles.png',
            start: '../src/img/menu.png',
            logo: '../src/img/logo.png',
            bullets: '../src/img/bulletssprite.png',
            explosion: '../src/img/bomb-sprite.png',
            enter: '../src/img/Enter-Key.png'
        });
        this.control = new Control();
        this.scenes = {
            loading: new Loading(this),
            menu: new Menu(this),
            gameLevel: new GameLevel(this),
            gameOver: new GameOver(this)
        };
        this.currentScene = this.scenes.loading;
        this.currentScene.init();
    }

    changeScene(status) {
        switch (status) {
            case Scene.LOADED:
                return this.scenes.menu;
            case Scene.START_GAME:
                return this.scenes.gameLevel;
            case Scene.GAME_OVER:
                return this.scenes.gameOver;
            default:
                return this.scenes.menu;
        }
    }

    frame(time) {
        if (this.currentScene.status !== Scene.WORKING) {
            this.currentScene = this.changeScene(this.currentScene.status);
            this.currentScene.init();
        }
        this.currentScene.render(time);
        requestAnimationFrame(time => this.frame(time));
    }

    run() {
        requestAnimationFrame(time => this.frame(time));
    }
}
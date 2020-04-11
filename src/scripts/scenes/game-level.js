import {Scene} from "../Scene";
import {SpriteFactory} from "../view/SpriteFactory";

import {PlayerTank} from "../enteties/PlayerTank";

import {EnemyTank} from "../enteties/EnemyTank";

import {Sound} from "../Sound";
import {CollisionDetector} from "../CollisionDetector";

export class GameLevel extends Scene {
    constructor(game) {
        super(game);
        this.tiles = new SpriteFactory(
            'tiles',
            640,
            640,
            64,
            64
        );
        this.player = new PlayerTank(this.game.control);
        this.enemies = [
            new EnemyTank("enemy", 50, 80, 50),
            new EnemyTank("enemy", 50, 1600, 50),
            new EnemyTank("enemy", 60, 80, 750),
            new EnemyTank("enemy", 50, 1400, 50),
            new EnemyTank("enemy", 20, 1700, 800),
            new EnemyTank("enemy", 50, 1200, 50),
            new EnemyTank("enemy", 40, 80, 500),
            new EnemyTank("enemy", 30, 1700, 400),
        ];

        this.bullets = this.player.bullets;
        this.sound = new Sound('../src/sound/gamelevel .mp3');
        this.collision = new CollisionDetector();
    }

    init() {
        super.init();
        const mapData = require('../maps/level3.json');
        this.map = this.game.screen.createMap("level3", mapData, this.tiles);
        this.collision.addStaticShapes(mapData);
        this.collision.addKinematicBody(this.player);
        this.enemies.forEach(enemy => {
            this.collision.addKinematicBody(enemy);
        });

    }

    update(time) {
        this.collision.update(time);
        this.enemies.forEach(enemy => {
            enemy.update(time);
        });
        this.player.update(time);
        this.collision.bulletsHitMap(this.player.bullets, time);
        this.enemies.forEach(enemy => {
            this.collision.bulletsHitMap(enemy.bullets);
        });
        this.collision.bulletOutOfScreen(this.player.bullets);
        this.enemies.forEach(enemy => {
            this.collision.bulletsHitTanks(this.player, enemy.bullets);
            this.collision.bulletsHitTanks(enemy, this.player.bullets);
            if (enemy.damage > 2000) {
                enemy.active = false;
                enemy.bullets.forEach(bullet => bullet.active = false);
            }
        });
        this.bullets.forEach(bullet => {
            bullet.update(time);
        });
        if (this.player.damage > 1000) {
            this.finish(Scene.GAME_OVER);
        }
    }

    render(time) {
        this.update(time);

        this.game.screen.drawSprite(this.map);
        this.game.screen.print(800, 800, "DAMAGE: 10000/");
        this.game.screen.print(1000, 800, this.player.damage);
        this.game.screen.drawSprite(this.player.view);
        this.enemies.forEach(enemy => {
            if (enemy.active) {
                this.game.screen.drawSprite(enemy.view);
                enemy.bullets.forEach(bullet => {
                    if (bullet.active) {
                        this.game.screen.drawSprite(bullet.view);
                    }
                });
            }
        });
        this.bullets.forEach(bullet => {
            if (bullet.active) {
                this.game.screen.drawSprite(bullet.view);
            }
        });

        super.render(time);
    }
}
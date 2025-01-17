import Entity from "./entity";
import {imageAssets, randInt, SpriteSheet} from "kontra";
import {Level} from "../level/Level";
import {CANVAS_WIDTH} from "../globals";

export default class NPC extends Entity {
    life: number = 100
    coronaPlus: number = 0.6

    constructor(x: number, y: number, level: Level, radius: number = 0, dx: number = 0.0, dy: number = 0.0) {
        super(x, y, level, radius)

        this.dx = dx;
        this.dy = dy;
        this.dir = this.dx != 0 ? Math.sign(this.dx) : randInt(0, 1) * 2 - 1;
        this.entitySprite.setScale(this.dir, 1);
    }

    loadCharAnimation(t: number) {
        t *= 3
        this.entitySprite.sprite.animations = SpriteSheet({
            image: imageAssets['chars'],
            frameWidth: 7,
            frameHeight: 12,
            animations: {
                idle: {
                    frames: t + 1,
                },
                walk: {
                    frames: [t, t + 1, t + 2, t + 1],
                    frameRate: 5,
                }
            }
        }).animations
    }

    update(){
        super.update()
        this.life -= 1

        if((this.life < 0 && !this.isInScreen()) || (this.x < -5 && this.dx <= 0) || (this.x > CANVAS_WIDTH + 5 && this.dx > 1)){
            this.level.removeEntity(this)
        }
    }

    initAnimation(){
        this.dx == 0 && this.dy == 0 ? this.entitySprite.sprite.playAnimation("idle") : this.entitySprite.sprite.playAnimation("walk")
    }

    advance(){
        this.globalX += this.dx
        this.globalY += this.dy
    }
}
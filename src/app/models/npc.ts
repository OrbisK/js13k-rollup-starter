import Entity from "./entity";
import {SpriteSheet} from "kontra";

export default class NPC extends Entity {
    constructor(globalX: number, globalY: number, xSpeed: number = 0.0, ySpeed: number = 0.0) {
        let assetId: string = "q";
        super({assetId}, globalX, globalY);

        this.dx = xSpeed;
        this.dy = ySpeed

        this.animations = SpriteSheet({
            image: this.asset,
            frameWidth: 7,
            frameHeight: 14,
            animations: {
                idle: {
                    frames: 1,
                    loop: false,
                },
                walk: {
                    frames: [0, 1, 2, 1],
                    frameRate: 6,
                }
            }
        }).animations;
    }

    update() {
        super.update();
        this.move();
    }

    move() {
        if (this.dx == 0 && this.dy == 0) {
            this.playAnimation("idle");
        } else {
            this.playAnimation("walk");
        }

        this.globalX += this.dx;
        this.globalY += this.dy;

        this.x = this.globalX - this.scene.tileEngine.sx;
        this.y = this.globalY - this.scene.tileEngine.sy;

        if (this.globalX < -10 && this.dx < 0) {
            this.globalX = this.scene.levelWidth + 10;
        } else if (this.globalX > this.scene.levelWidth + 10 && this.dx > 0) {
            this.globalX = -10;
        }
    }
}
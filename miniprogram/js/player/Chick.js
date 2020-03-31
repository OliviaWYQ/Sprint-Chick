import {Sprite} from "../base/Sprite.js";
import {DataStore} from "../base/DataStore.js";

export class Chick extends Sprite {

    constructor() {
        const image = Sprite.getImage('birds');
        super(image, 0, 0, image.width, image.height,
            0, 0, image.width, image.height)

        //宽34，高24，上下10，左右9

        this.clippingX = [9,
            9 + 34 + 18,
            9 + 34 + 18 + 34 + 18];

        this.clippingY = [10, 10, 10];
        this.clippingWidth = [34, 34, 34];
        this.clippingHeight = [24, 24, 24];

      this.playerX = DataStore.getInstance().canvas.width / 4;
        this.playersX = [this.playerX, this.playerX, this.playerX];
      this.playerY = DataStore.getInstance().canvas.height / 2;
        this.playersY = [this.playerY,this.playerY,this.playerY];

        this.playerWidth = 34;
        this.playersWidth = [this.playerWidth,this.playerWidth,this.playerWidth];
        this.playerHeight = 24;
        this.playersHeight = [this.playerHeight,this.playerHeight,this.playerHeight];

        this.y = [this.playerY,this.playerY,this.playerY];
        this.index = 0;
        this.count = 0;
        this.time = 0;

    }


    draw(){
        const speed = 0.1;
        this.count = this.count+speed;
        if (this.index >= 2 ){
            this.count = 0;
        }

        this.index = Math.floor(this.count);

        //重力
        const g = 0.98 / 3;

        const offsetUp = 37;

        const offsetY = (g*this.time*(this.time-offsetUp)) / 2;

        for (let i = 0; i <= 2; i++){
            this.playersY[i] = this.y[i]+offsetY;
        }

        this.time++;

        super.draw(
            this.img,
            this.clippingX[this.index],
            this.clippingY[this.index],
            this.clippingWidth[this.index],
            this.clippingHeight[this.index],
            this.playersX[this.index],
            this.playersY[this.index],
            this.playersWidth[this.index],
            this.playersHeight[this.index]

        )


    }
}








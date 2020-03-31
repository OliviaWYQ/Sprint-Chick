import {DataStore} from "../base/DataStore.js";

export class Score {

    constructor(){
        this.ctx = DataStore.getInstance().ctx;
        this.score = 0;
        this.isAdd = true;
    }

    draw(){
        this.ctx.font = '25px Arial';
        this.ctx.fillStyle = 'rgb(162,162,162)';
        this.ctx.fillText(
            this.score,
          DataStore.getInstance().canvas.width /2,
          DataStore.getInstance().canvas.height / 10,
            1000
        );

    }
}

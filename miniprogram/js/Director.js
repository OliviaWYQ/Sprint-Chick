//导演类，控制游戏的逻辑
import {DataStore} from "./base/DataStore.js";
import {PieUp} from "./runtime/PieUp.js";
import {PieDown} from "./runtime/PieDown.js";

export class Director {

    static getInstance() {
        if (!Director.instance) {
            Director.instance = new Director();
        }
        return Director.instance;
    }

    constructor() {
        // console.log('constructor init');
        this.dataStore = DataStore.getInstance();
        this.moveSpeed = 2;
    }

    create() {
        const minTop = DataStore.getInstance().canvas.height / 8;
      const maxTop = DataStore.getInstance().canvas.height / 2;
        const top = minTop + Math.random() * (maxTop - minTop);
        this.dataStore.get('pipes').push(new PieUp(top));
        this.dataStore.get('pipes').push(new PieDown(top));
    }

    clickEvent() {
        for (let i = 0; i <= 2; i++) {
            this.dataStore.get('player').y[i] = this.dataStore.get('player').playersY[i];
        }
        this.dataStore.get('player').time = 0;
    }

    Check() {
        const player = this.dataStore.get('player');
        const land = this.dataStore.get('land');
        const pipes = this.dataStore.get('pipes');
        const score = this.dataStore.get('score');
        if (player.playersY[0] + player.playersHeight[0] >= land.y) {
            console.log('collide with land');
            this.isGameOver = true;
            return;
        }

        const playerBorder = {
            top: player.y[0],
            bottom: player.playersY[0] + player.playersHeight[0],
            left: player.playersX[0],
            right: player.playersX[0] + player.playersWidth[0]
        };

        const length = pipes.length;
        for (let i = 0; i < length; i++) {
            const pipe = pipes[i];
            const pipeBorder = {
                top: pipe.y,
                bottom: pipe.y + pipe.height,
                left: pipe.x,
                right: pipe.x + pipe.width
            };

            if (Director.PipeCollisionCheck(playerBorder, pipeBorder)) {
                console.log('Collide with pipe')
                this.isGameOver = true;
                return;
            }

        }

        if(player.playersX[0] > pipes[0].x + pipes[0].width && score.isAdd == true){

            //震动
            wx.vibrateShort({
                success:function () {
                    console.log('vibrate');
                }
            })
            score.isAdd = false;
            score.score++;
        }

    }

    static PipeCollisionCheck(player, pipe) {
        let isSafe = false;
        if (player.top > pipe.bottom ||
            player.bottom < pipe.top ||
            player.right < pipe.left ||
            player.left > pipe.right) {
            isSafe = true;
        }

        return !isSafe;
    }

    run() {
        this.Check();
        if (!this.isGameOver) {
            this.dataStore.get('background').draw();

            const pies = this.dataStore.get('pipes');
            if (pies[0].x + pies[0].width <= 0 && pies.length === 4) {
                pies.shift();
                pies.shift();
                this.dataStore.get('score').isAdd = true;
            }

            if (pies[0].x <= (DataStore.getInstance().canvas.width - pies[0].width) / 2 && pies.length === 2) {
                this.create();
            }

            this.dataStore.get('pipes').forEach(function (value) {
                value.draw();
            });

            this.dataStore.get('land').draw();
            this.dataStore.get('player').draw();
            this.dataStore.get('score').draw();

            let timer = requestAnimationFrame(() => this.run());
            this.dataStore.put('timer', timer);

        } else {
            console.log("Game Over")
            this.dataStore.get('startButton').draw();
            cancelAnimationFrame((this.dataStore.get('timer')));
            this.dataStore.destroy();

            wx.triggerGC();
        }

    }

}

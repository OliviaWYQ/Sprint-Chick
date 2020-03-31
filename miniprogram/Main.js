//初始化整个游戏的精灵，作为游戏开始的入口
import {ResourceLoader} from "./js/base/ResourceLoader.js";
import {Director} from "./js/Director.js";
import {BackGround} from "./js/runtime/BackGround.js";
import {DataStore} from "./js/base/DataStore.js";
import {Land} from "./js/runtime/Land.js";
import {Chick} from "./js/player/Chick.js";
import {StartButton} from "./js/player/StartButton.js";
import {Score} from "./js/player/Score.js";
import {gameApi} from "./js/gameApi.js";

export class Main {
    constructor() {
        // console.log('I can run');
        this.canvas = wx.createCanvas();
        this.context = this.canvas.getContext('2d');
        this.dataStore = DataStore.getInstance();
        this.director = Director.getInstance();
        const loader = ResourceLoader.create();
        loader.onLoaded(map => this.onResourceFirstLoaded(map));

        // let image = new Image();
        // image.src = './img/background2.png';
        //
        //
        // image.onload = () => {
        //     this.context.drawImage(
        //         image,
        //         0, 0, image.width, image.height,
        //         0, 0, image.width, image.height
        //     );
        // }
    }

    createBackgroundMusic(){
        const bgm = wx.createInnerAudioContext();
        bgm.autoplay = true;
        bgm.loop = true;
        bgm.src = 'audio/bgm.mp3';
    }

    onResourceFirstLoaded(map) {
        // console.log(map);
        this.dataStore.canvas = this.canvas;
        this.dataStore.ctx = this.context;
        this.dataStore.res = map;
        // let background = new BackGround(this.context, map.get('background2'));
        // background.draw();
        this.createBackgroundMusic();
        const api = new gameApi();
        api.getUserInfo();
        api.login();
        this.init();
    }

    init() {
        //重置
        this.director.isGameOver = false;

        this.dataStore
            .put('background', BackGround)
            .put('land', Land)
            .put('pipes', [])
            .put('player', Chick)
            .put('startButton', StartButton)
            .put('score', Score);

        this.registerEvent();
        this.director.create();
        this.director.run();
    }

    registerEvent(){
        // this.canvas.addEventListener('touchstart', e =>{
        //     e.preventDefault();
        //
        //     if(this.director.isGameOver){
        //         console.log('Game Start');
        //         this.init();
        //     } else {
        //         this.director.clickEvent();
        //     }
        // })

        wx.onTouchStart(()=>{
            if(this.director.isGameOver){
                console.log('Game Start');
                this.init();
            } else {
                this.director.clickEvent();
            }
        });


    }

}

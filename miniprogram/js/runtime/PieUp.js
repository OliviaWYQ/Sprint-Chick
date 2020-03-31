import {Pencil} from "./Pencil.js";
import {Sprite} from "../base/Sprite.js";

export class PieUp extends Pencil{

    constructor(top){
        const image = Sprite.getImage('pieUp');
        super(image, top);
    }

    draw(){
        this.y = this.top - this.height;
        super.draw();
    }

}

import { Ball } from "./ball.js";


export class Hole extends Ball{
    constructor(x,y,size,type,ctx,canvas){
        super(x,y,ctx,canvas);
        this.radio=size;
        this.type=type;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radio, 0, Math.PI * 2, false);
        if(this.type=="bad"){
            this.ctx.fillStyle = "#000000";
        }else{
            this.ctx.fillStyle = "#00ff00";
        }
        this.ctx.fill();
        this.ctx.closePath();
    }
    
    getCharacteristic(){
        return {
            "x":this.x,
            "y":this.y,
            "r":this.radio,
            "t":this.type
        }
    }

}
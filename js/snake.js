import {Ball} from "./ball.js";
export class Snake {
    constructor(ctx, canvas) {
        this.ctx = ctx;
        this.canvas = canvas; 
        this.x = 30;
        this.y = 30;
        this.size=4;
        this.balls=[];
        this.dx = this.dy = 1;
        this.radio = 10;
        for(var i=0;i<this.size;i++){
            this.balls.push(new Ball(this.x+(i*this.radio),this.y+(i*this.radio),ctx,canvas))
        }
    }
    drawSnake() {
        for (const ball of this.balls) {
            ball.drawBall();
        }
    }
    moveSnake() {
        for (const ball of this.balls) {
            ball.moveBall();
        }
    }
    crecer(){
        var lastBall=this.balls[0];
        this.balls.reverse();
        this.balls.push(new Ball(lastBall.x+(lastBall.radio*(-lastBall.dx)),lastBall.y+(lastBall.radio*(-lastBall.dy)),this.ctx,this.canvas))
        this.balls.reverse();
    }

    posicion(){
        var x=this.balls[this.balls.length-1].x;
        var y=this.balls[this.balls.length-1].y;
        return {"x":x,"y":y};
    }
    direccion(){
        var dx=this.balls[this.balls.length-1].dx;
        var dy=this.balls[this.balls.length-1].dy;
        return {"dx":dx,"dy":dy};
    }
    
    girarX(){
        var cuerpo=this.balls;
        var cabeza=this.balls[this.balls.length-1];
        cabeza.dx=-cabeza.dx;
        for (let i= cuerpo.length-2 ; i >=0; i--) {
            cuerpo[i].dx=cuerpo[i+1].dx;
        }
    }
    girarY(){
        var cuerpo=this.balls;
        var cabeza=this.balls[this.balls.length-1];
        cabeza.dy=-cabeza.dy;
        for (let i= cuerpo.length-2 ; i >=0; i--) {
            cuerpo[i].dy=cuerpo[i+1].dy;
        }
    }


}
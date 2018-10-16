import { Ball } from "./ball.js";


export class SnakeEvolution {

    constructor(x, y,dx,dy,long, ctx, canvas) {
        this.head = new Ball(x, y, ctx, canvas);
        this.head.dx=dx;
        this.head.dy=dy;
        this.body = long;
        this.name="";
        this.balls = [];
        for (var i = 0; i < this.body; i++) {
            this.balls.push(new Ball(x, y, ctx, canvas))
        }
    }

    drawSnake() {
        this.head.drawBall();
        for (const c of this.balls) {
            c.drawBall();
        }
    }
    moveSnake(x,y) {
        for (let index = this.balls.length - 1; index >= 0; index--) {
            if (index == 0) {
                this.balls[index].x = this.head.x;
                this.balls[index].y = this.head.y;
            } else {
                this.balls[index].x = this.balls[index - 1].x;
                this.balls[index].y = this.balls[index - 1].y;
            }
        }
        this.head.moveBall(x,y)
    }

    posicion() {
        return { "x": this.head.x, "y": this.head.y }
    }

    direccion() {
        return { "dx": this.head.dx, "dy": this.head.dy }
    }

    girarX() {
       
        this.head.dx = -this.head.dx;
    }
    girarY() {
 
        this.head.dy = -this.head.dy;
    }
    crecer() {
        var x = this.balls[this.balls.length - 1].x;
        var y = this.balls[this.balls.length - 1].y;
        for (var i = 0; i < 2; i++)
            this.balls.push(new Ball(x, y, this.head.ctx, this.head.canvas))
    }

    distance([x2,y2]) {
        return Math.sqrt((Math.pow((this.head.x - x2), 2)) + (Math.pow((this.head.y - y2), 2)))
    }

    setBody(body){
        for (let index = 0; index < body.length; index++) {
            this.balls[index].x=body[index].x;
            this.balls[index].y=body[index].y;
        }
    }
}
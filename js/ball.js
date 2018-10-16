export class Ball {
    constructor(x, y, ctx, canvas) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.x = x;
        this.y = y;
        this.dx = this.dy = 1;
        this.radio = 10;
    }
    drawBall() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radio, 0, Math.PI * 2, false);
        this.ctx.fillStyle = "#FF0000";
        this.ctx.fill();
        this.ctx.closePath();
    }
    moveBall(x, y) {
        if (y != Math.abs(this.y)) this.y += this.dy;
        if (x != Math.abs(this.x)) this.x += this.dx;

        if ((this.x > this.canvas.width - this.radio) || (this.x - this.radio <= 0)) this.dx = -this.dx;
        if ((this.y - this.radio <= 0) || (this.y > this.canvas.height - this.radio)) this.dy = -this.dy;
    }

    getPosition() {
        return { "x": this.x, "y": this.y }
    }
}
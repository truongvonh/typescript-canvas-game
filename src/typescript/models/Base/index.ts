export interface ICoordinates {
    x: number;
    y: number
}

export default class BaseModel {
    public x: number;
    public y: number;
    public color: string;
    public radius: number;

    constructor(x, y, color, radius) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = radius
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        ctx.fillStyle = this.color;
        ctx.fill()
    }
}
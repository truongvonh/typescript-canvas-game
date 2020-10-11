import BaseModel, {ICoordinates} from "../Base";

export default class Projectile extends BaseModel {
    velocity: ICoordinates;

    constructor(x, y, color, radius, velocity) {
        super(x, y, color, radius);
        this.velocity = velocity;
    }

    update(ctx: CanvasRenderingContext2D) {
        this.draw(ctx);
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }
}
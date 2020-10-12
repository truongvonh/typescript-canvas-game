import Projectile from '../Projectile';

export default class Particle extends Projectile {
    public alpha: number = 1;

    public update(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.globalAlpha = this.alpha;

        super.update(ctx);

        ctx.restore();
    }

    public draw(ctx: CanvasRenderingContext2D) {
        super.draw(ctx);

        this.alpha -= 0.01;
    }
}

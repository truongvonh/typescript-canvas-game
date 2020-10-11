import Player from "./models/Player";
import Projectile from "./models/Projectile";
import Enemy from "./models/Enimes";

class CanvasGame {
    public ctx: CanvasRenderingContext2D;
    public projectiles: Array<Projectile> = [];
    public canvas: HTMLCanvasElement;
    public mainPlayer: Player;
    public enemies: Array<Enemy> = [];
    public canvasCenterX: number;
    public canvasCenterY: number;

    spawnEnemies() {
        setInterval(() => {
            this.enemies.push(new Enemy(
                1,
                1,
                'green',
                10,
                {
                    x: 1,
                    y: 1
                }
            ))
        }, 1000)
    }

    init() {
        this.canvas = document.querySelector("#canvas-game");

        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = innerWidth;
        this.canvas.height = innerHeight;

        this.canvasCenterX = this.canvas.width / 2;
        this.canvasCenterY = this.canvas.height / 2;

        this.mainPlayer = new Player(this.canvasCenterX, this.canvasCenterY, "blue", 30);
        this.mainPlayer.draw(this.ctx);
    }

    handleWindowClick() {
        window.addEventListener('click', (e) => {
            const {clientX, clientY} = e;

            const angle = Math.atan2(clientY - this.canvasCenterY, clientX - this.canvasCenterX);
            const velocity = {
                x: Math.cos(angle),
                y: Math.sin(angle)
            };

            this.projectiles.push(new Projectile(
                this.canvasCenterX,
                this.canvasCenterY,
                'red',
                5,
                velocity))
        })
    }

    animate = () => {
        requestAnimationFrame(this.animate);

        // todo: After projectile was fire. We will clear canvas and re-draw player
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.mainPlayer.draw(this.ctx);

        // todo: Render projectiles
        this.projectiles.forEach(projectile => projectile.update(this.ctx));

        // todo: Render Enemies
        this.enemies.forEach(enemy => enemy.update(this.ctx))
    };

    constructor() {
        this.init();
        this.handleWindowClick();
        this.animate();
        this.spawnEnemies();
    }
}

new CanvasGame();

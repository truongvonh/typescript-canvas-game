import Player from './models/Player';
import Projectile from './models/Projectile';
import Enemy from './models/Enimes';
import Particle from './models/Particle';
import { GAME_ENUM } from './enum/game';

class CanvasGame {
    public ctx: CanvasRenderingContext2D;
    static particleNumber: number = 8;
    public projectiles: Array<Projectile> = [];
    public particles: Array<Particle> = [];
    public enemies: Array<Enemy> = [];
    public canvas: HTMLCanvasElement;
    public mainPlayer: Player;

    public canvasCenterX: number;
    public canvasCenterY: number;

    public isPlayGame = true;

    removeItemInArray<T>(array: Array<T>, indexRemove: number): Array<T> {
        return array.splice(indexRemove, 1);
    }

    generateEnemies() {
        const radius =
            Math.random() * (GAME_ENUM.MAX_RADIUS - GAME_ENUM.MIN_RADIUS) + GAME_ENUM.MIN_RADIUS;

        let x: number = 0;
        let y: number = 0;

        if (Math.random() < GAME_ENUM.HAFT_PAST) {
            x = Math.random() < GAME_ENUM.HAFT_PAST ? 0 - radius : this.canvas.width + radius;
            y = Math.random() * this.canvas.height;
        } else {
            x = Math.random() * this.canvas.width;
            y = Math.random() < GAME_ENUM.HAFT_PAST ? 0 - radius : this.canvas.height + radius;
        }

        const angle = Math.atan2(this.canvasCenterY - y, this.canvasCenterX - x);
        const velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle),
        };

        const randomColor = `hsl(${Math.random() * 360}, 100%, 50%)`;

        this.enemies.push(new Enemy(x, y, randomColor, radius, velocity));
    }

    spawnEnemies() {
        setInterval(() => {
            this.generateEnemies();
        }, 1000);
    }

    init() {
        this.canvas = document.querySelector('#canvas-game');

        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = innerWidth;
        this.canvas.height = innerHeight;

        this.canvasCenterX = this.canvas.width / 2;
        this.canvasCenterY = this.canvas.height / 2;

        this.mainPlayer = new Player(this.canvasCenterX, this.canvasCenterY, 'blue', 30);
        this.mainPlayer.draw(this.ctx);
    }

    handleWindowClick(): void {
        window.addEventListener('click', (e: MouseEvent) => {
            const { clientX, clientY } = e;

            const angle = Math.atan2(clientY - this.canvasCenterY, clientX - this.canvasCenterX);
            const velocity = {
                x: Math.cos(angle) * 4,
                y: Math.sin(angle) * 4,
            };

            this.projectiles.push(
                new Projectile(this.canvasCenterX, this.canvasCenterY, 'red', 5, velocity),
            );
        });
    }

    removeProjectilesOutScreen(projectile: Projectile, pIndex: number): void {
        const isOutScreen =
            projectile.x - projectile.radius < 0 ||
            projectile.x + projectile.radius > this.canvas.width ||
            projectile.y - projectile.radius < 0 ||
            projectile.y + projectile.radius > this.canvas.height;

        if (isOutScreen) setTimeout(() => this.projectiles.splice(pIndex, 1), 0);
    }

    renderParticles(projectile: Projectile, enemy: Enemy) {
        for (let i = 0; i < CanvasGame.particleNumber; i++) {
            const velocity = {
                x: Math.random() - GAME_ENUM.HAFT_PAST,
                y: Math.random() - GAME_ENUM.HAFT_PAST,
            };
            this.particles.push(new Particle(projectile.x, projectile.y, enemy.color, 3, velocity));
        }
    }

    animate = (): void => {
        if (this.isPlayGame) requestAnimationFrame(this.animate);

        // todo: After projectile was fire. We will clear canvas and re-draw player
        this.ctx.fillStyle = 'rgba(0,0,0,0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.mainPlayer.draw(this.ctx);

        this.particles.forEach((particle, paIndex) => {
            if (particle.alpha < 0) this.removeItemInArray<Particle>(this.particles, paIndex);
            particle.update(this.ctx);
        });

        /* Render projectiles
         * Check projectiles outside screen and remove it
         */
        this.projectiles.forEach((projectile, pIndex) => {
            projectile.update(this.ctx);

            this.removeProjectilesOutScreen(projectile, pIndex);
        });

        this.enemies.forEach((enemy, eIndex) => {
            enemy.update(this.ctx);

            // @ts-ignore
            const distancePlayer = Math.hypot(
                enemy.x - this.mainPlayer.x,
                enemy.y - this.mainPlayer.y,
            );

            const isGameOver = distancePlayer - enemy.radius - this.mainPlayer.radius < 1;

            if (isGameOver) this.isPlayGame = false;

            this.projectiles.forEach((projectile, pIndex) => {
                // @ts-ignore
                const distanceEnemy = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);
                const isContactEnemy = distanceEnemy - projectile.radius - enemy.radius < 1;

                if (isContactEnemy) {
                    this.renderParticles(projectile, enemy);

                    if (enemy.radius - GAME_ENUM.MIN_RADIUS > GAME_ENUM.MIN_RADIUS) {
                        enemy.radius -= GAME_ENUM.MIN_RADIUS;
                        setTimeout(
                            () => this.removeItemInArray<Projectile>(this.projectiles, pIndex),
                            0,
                        );
                    } else {
                        setTimeout(() => {
                            this.removeItemInArray<Enemy>(this.enemies, eIndex);
                            this.removeItemInArray<Projectile>(this.projectiles, pIndex);
                        }, 0);
                    }
                }
            });
        });
    };

    constructor() {
        this.init();
        this.handleWindowClick();
        this.animate();
        this.spawnEnemies();
    }
}

new CanvasGame();

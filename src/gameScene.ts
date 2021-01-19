import "phaser";

export class GameScene extends Phaser.Scene {
    delta: number;
    lastStarTime: number;
    starsCaught: number;
    starsFalle: number;
    sand: Phaser.Physics.Arcade.StaticGroup;
    info: Phaser.GameObjects.Text;
    constructor() {
        super({
            key: "GameScene"
        })
    }

    init(): void {
        this.delta = 1000;
        this.lastStarTime = 0;
        this.starsCaught = 0;
        this.starsFalle = 0;
    }

    preload(): void {
        this.load.setBaseURL("https://raw.githubusercontent.com/mariyadavydova/starfall-phaser3-typescript/master/");
        this.load.image("star", "assets/star.png");
        this.load.image("sand", "assets/sand.jpg");
    }

    create(): void {
        this.sand = this.physics.add.staticGroup({
            key: 'sand',
            frameQuantity: 20,
        })

        Phaser.Actions.PlaceOnLine(this.sand.getChildren(), new Phaser.Geom.Line(20, 580, 820, 580));
        this.sand.refresh();

        this.info = this.add.text(10, 10, '', { font: '24px Arial Bold', color: '#FBFBAC' });
    }

    update(time: number): void {
        const diff: number = time - this.lastStarTime;
        if (diff > this.delta) {
            this.lastStarTime = time;
            if (this.delta > 500) {
                this.delta -= 20;
            }
            this.emitStar();
        }
        this.info.text = `${this.starsCaught} caught - ${this.starsFalle} fallen (max 3)`;
    }

    private onClick(star: Phaser.Physics.Arcade.Image): () => void {
        return () => {
            star.setTint(0x00ff00);
            star.setVelocity(0, 0);
            this.starsCaught += 1;
            this.time.delayedCall(100, (star) => {
                star.destroy();
            }, [star], this)
        }
    }

    private onFall(star: Phaser.Physics.Arcade.Image): () => void {
        return () => {
            star.setTint(0xff0000);
            this.starsFalle += 1;
            this.time.delayedCall(100, (star) => {
                star.destroy();
            }, [star], this);
        }
    }

    private emitStar(): void {
        let star: Phaser.Physics.Arcade.Image;
        const x = Phaser.Math.Between(25, 775);
        const y = 26;
        star = this.physics.add.image(x, y, "star");

        star.setDisplaySize(50, 50);
        star.setVelocity(0, 200);
        star.setInteractive();

        star.on('pointerdown', this.onClick(star), this);

        this.physics.add.collider(star, this.sand, this.onFall(star), null, this);
    }
}
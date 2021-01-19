import 'phaser';
import { GameScene } from './gameScene';

const config = {
    title: "Falling Stars",
    width: 800,
    height: 600,
    parent: "game",
    scene: [GameScene],
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    },
    backgroundColor: "#18216D",
}

export class FallingStars extends Phaser.Game {
    constructor(config: any) {
        super(config);
    }
}

window.onload = () => {
    const game = new FallingStars(config);
}
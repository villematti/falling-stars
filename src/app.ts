import 'phaser';

const config = {
    title: "Falling Stars",
    width: 800,
    height: 600,
    parent: "game",
    backgroundColor: "#18216D"
}

console.log("Does this get loaded?")

export class FallingStars extends Phaser.Game {
    constructor(config: any) {
        super(config);
    }
}

window.onload = () => {
    const game = new FallingStars(config);
}
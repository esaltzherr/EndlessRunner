class Menu extends Phaser.Scene {
    constructor() {
        super('menuscene');
    }

    preload() {
        this.load.image('paper', './assets/paperBackground.png');
    }

    create() {
        // TEMP MENU
        this.background = this.add.sprite(-100, -35, 'paper').setOrigin(0, 0);
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        let textConfig = {
            fontSize: '28px',
            color: 'black',
            align: 'center'
        }

        // TEMPORARY
        this.add.text(game.config.width / 2, game.config.height / 5, "TITLE HERE(ish)", textConfig).setOrigin(0.5, 0.5);
        this.add.text(game.config.width / 2, game.config.height / 2, "Press Enter to Play", textConfig).setOrigin(0.5, 0.5);
        this.add.text(game.config.width / 2, game.config.height / 1.85, "PLAY BUTTON HERE(ish)", textConfig).setOrigin(0.5, 0.5);
        this.add.text(game.config.width / 2, game.config.height / 1.35, "HOW TO PLAY HERE(ish)", textConfig).setOrigin(0.5, 0.5);

        keyENTER.on("down", (key, event) => { this.scene.start('playscene')})
    }
}
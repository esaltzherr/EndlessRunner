class Menu extends Phaser.Scene {
    constructor() {
        super('menuscene');
    }

    preload() {
        this.load.image('menu', './assets/menu_screen.png');
        this.load.audio('startGame', './assets/audio/game_start_sound.wav');
    }

    create() {
        this.background = this.add.sprite(0, 0, 'menu').setOrigin(0, 0);
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        keyENTER.on("down", (key, event) => { 
            this.scene.start('playscene')
            this.sound.play('startGame');
        });
    }
}
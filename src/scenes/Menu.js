class Menu extends Phaser.Scene {
    constructor() {
        super('menuscene');
    }

    preload() {
        this.load.image('menu', './assets/menu_screen.png');
    }

    create() {
        this.background = this.add.sprite(0, 0, 'menu').setOrigin(0, 0);
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        keyENTER.on("down", (key, event) => { this.scene.start('playscene')})
    }
}
class Play extends Phaser.Scene{
    constructor(){
        super("playscene");
    }
    preload(){
        // load images/sprites

        this.load.image('letterA','./assets/letterA.png');
        this.load.image('paper','./assets/paper.png');
        this.load.image('ground_temp', './assets/ground_temp.png');
        this.load.image('player_temp', './assets/player_sprite.gif');
    }

    create(){
        this.backround = this.add.tileSprite(-100, -50, 0, 0, 'paper').setOrigin(0, 0);

        this.letterspawner = new Letterspawner(this, 100, 100, 'letterA', 0).setOrigin(0,0);

        // add keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.ground = new Ground(this, 0, game.config.height * 0.8, 'ground_temp').setOrigin(0, 0);
        this.player = new Player(this, game.config.width / 2, game.config.height * 0.6, 'player_temp', 0, 900, 300).setOrigin(0, 0);
        this.physics.add.collider(this.player, this.ground);
    }

    update(){
        this.letterspawner.update();
        this.player.update();
    }




}
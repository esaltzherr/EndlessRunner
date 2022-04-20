class Play extends Phaser.Scene{
    constructor(){
        super("playscene");
    }
    preload(){
        // load images/sprites

        this.load.image('letterA','./assets/letterA.png');
        this.load.image('paper','./assets/paper.png');
    }


    create(){
        this.backround = this.add.tileSprite(-100, -50, 0, 0, 'paper').setOrigin(0, 0);

        this.letterspawner = new Letterspawner(this, 100, 100, 'letterA', 0).setOrigin(0,0);


    }

    update(){
        this.letterspawner.update();

    }




}
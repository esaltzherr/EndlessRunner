class Play extends Phaser.Scene{
    constructor(){
        super("playscene");
    }
    preload(){
        // load images/sprites
        
        //loads the each letter
        var base = 'letter'
        var total;
        for(i = 0;i< 26; i++){
            total = base + String.fromCharCode(65+i);
            this.load.image(total, './assets/'+total+'.png')
        }

        
        this.load.image('paper','./assets/paper.png');
    }


    create(){
        this.backround = this.add.tileSprite(-100, -100, 0, 0, 'paper').setOrigin(0, 0);
        this.letterspawner = new Letterspawner(this, 900, 0).setOrigin(0,0);




    }

    update(){
        this.letterspawner.update();

    }




}
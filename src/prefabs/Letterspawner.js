class Letterspawner extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.startingtimer = 10;
        this.timer = this.startingtimer;
        this.letters = this.physics.add.group();
    }

    update(){
        
        this.timer -= 1;
        if(this.timer <= 0){
            letter = new Letter(this.scene, this.x, this.y);

        }
    }

}
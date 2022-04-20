class Letterspawner extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.speed = 10;
        this.randomletter();
        
    }
    update(){
        this.x -= this.speed;

    }
    randomletter(){
        this.letter = "a";
        this.texture = 'letterA';

    }
}
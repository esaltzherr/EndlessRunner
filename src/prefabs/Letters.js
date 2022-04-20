class Letters extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);

        

    }

    update(){
        //console.log("This is working?");

    }

}
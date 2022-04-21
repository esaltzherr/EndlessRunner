class Eraser extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture){
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setImmovable(true);
        this.accel = 0.01;
        this.speed = 2;
        this.maxspeed = 10;
        this.setVelocity(this.speed,0);
        this.scale = 0.35;
        //this.flipY = true;

    }
    update(){
        this.speed += this.accel;
        this.maxspeed += 0.05;
        if(this.speed > this.maxspeed){
            this.speed = this.maxspeed;
        }
        this.setVelocity(this.speed, 0);
        //console.log(this.speed);
    }
    
}
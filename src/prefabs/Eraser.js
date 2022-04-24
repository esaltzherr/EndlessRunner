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
        this.scale = 1;
        //this.flipY = true;

        scene.anims.create({
            key: 'erase',
            frames: 'pencil',
            frameRate: 16,
            repeat: -1
        });
        this.anims.play('erase', true);
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
    
    gameOver() {
        // move back as to not constantly trigger gameOver() in Play
        this.x -= 1

        // stop eraser completely
        this.speed = 0;
        this.setVelocity(0, 0);
        this.anims.stop();
    }
}
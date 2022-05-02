class Eraser extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setImmovable(true);
        this.accel = 0.01;
        this.speed = 1;
        this.maxspeed = 10;
        this.setVelocity(this.speed, 0);
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
    update() {
        
       
        this.speed += this.accel;
        if (this.speed > this.maxspeed) {
            this.speed = this.maxspeed;
        }
        if (this.x + this.width  < 10) {
            this.x = 10 - this.width;
            this.speed = 0;
            //console.log("End");
        }
        if(this.scene.player.score > 10){
            this.maxspeed += 5;
        }
        if(this.scene.player.score > 25){
            this.maxspeed += 10
        }
        this.setVelocity(this.speed, 0);
        
    }

    gameOver() {
        // move back as to not constantly trigger gameOver() in Play
        this.x -= 1;

        // stop eraser completely
        this.speed = 0;
        this.setVelocity(0, 0);
        this.anims.play("erase", true);
        //this.anims.stop();
    }
}
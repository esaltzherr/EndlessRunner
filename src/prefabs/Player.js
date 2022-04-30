class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, gravity, jumpHeight) {
        super(scene, x, y, texture, frame);
        scene.physics.add.existing(this);
        scene.add.existing(this);

        // physics settings
        this.setPushable(false);
        this.body.setGravityY(gravity);
        this.jumpHeight = jumpHeight;
        this.justFell = false;

        // Player word and score
        this.word = '';
        this.score = 0;

        // Player animations
        this.anims.create({
            key: 'running',
            frames: this.anims.generateFrameNumbers('player_run', {frames: [0, 1, 2, 3, 4, 5, 6, 7]}),
            repeat: -1,
            frameRate: 15
        });

        this.anims.create({
            key: 'jumping',
            frames: this.anims.generateFrameNumbers('player_jump', {frames: [0, 1, 2, 3, 4]}),
            frameRate: 12,
        });

        this.anims.create({
            key: 'falling',
            frames: this.anims.generateFrameNumbers('player_fall', {frames: [0, 1]}),
            frameRate: 10
        });

        this.anims.create({
            key: 'falling_squash',
            frames: this.anims.generateFrameNumbers('player_fall_squash', {frames: [0]}),
            frameRate: 30,
            repeat: 1
        });
    }

    update() {
        // if jump key pressed and not already jumping, jump
        if(Phaser.Input.Keyboard.JustDown(keySPACE) && this.body.velocity.y == 0) {
            this.jump();
            this.scene.dust.createDust(this.scene.dust.x + 15, this.scene.dust.y - 25, 'player_jump_dust', 15);
        }

        // ensure jumping only happens when touching ground
        if(this.body.velocity.y == 0) {
            // determine whether to play running or falling animation
            if(!this.justFell) { 
                this.anims.play('running', true); 
            }
            else {
                this.anims.play('falling_squash', true);
                this.once('animationcomplete', () => { this.justFell = false; })
            }
        }
        else if(this.body.velocity.y > 0) {
            this.anims.play('falling', true);
        }
    }

    jump() {
        this.body.setVelocityY(this.jumpHeight * -1);
        this.justFell = true;
        this.anims.play('jumping', true);
    }

    gameOver() {
        // erase word (might put this in reset later on)
        this.word = '';
        this.anims.pause();
    }
}
class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, gravity, jumpHeight) {
        super(scene, x, y, texture, frame);
        scene.physics.add.existing(this);
        scene.add.existing(this);

        // physics settings
        this.setPushable(false);
        this.body.setGravityY(gravity);
        this.jumpHeight = jumpHeight;
        this.jumping = false;
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
            frameRate: 12
        });

        this.anims.create({
            key: 'falling',
            frames: this.anims.generateFrameNumbers('player_jump', {frames: [0, 1, 2]}),
            frameRate: 16   // EDIT FRAMES TO MAYBE 10 FPS
        });

        // ANOTHER SPRITE AS HE HITS THE GROUND
    }

    update() {
        // if jump key pressed and not already jumping, jump
        if(Phaser.Input.Keyboard.JustDown(keySPACE) && !this.jumping) {
            this.jump();
        }

        // ensure jumping only happens when touching collider
        if(keySPACE.isUp && this.body.touching.down) { 
            this.jumping = false;

            // determine whether to play running or falling animation
            if(!this.justFell) { 
                this.anims.play('running', true); 
            }
            else {
                /*
                *  MAKE FALLING HAPPEN ON LOOP WHEN FALLING BACK DOWN
                */
                this.fall();
            }
        }
        else {
            this.jumping = true; 
        }
    }

    jump() {
        this.body.setVelocityY(this.jumpHeight * -1);
        this.justFell = true;
        this.anims.play('jumping', true);
    }

    fall() {
        this.anims.play('falling', true)
        this.once('animationcomplete', () => { this.justFell = false; })
    }

    gameOver() {
        // erase word (might put this in reset later on)
        this.word = '';
        this.anims.pause();
    }
}
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

        // String the Player has
        this.word = '';

        this.score = 0;
    }

    update() {
        // if jump key pressed and not already jumping, jump
        if(Phaser.Input.Keyboard.JustDown(keySPACE) && !this.jumping) {
            this.jump()
        }

        // ensure jumping only happens when touching collider
        if(this.body.touching.down) { this.jumping = false; }
        else { this.jumping = true; }
    }

    jump() {
        this.body.setVelocityY(this.jumpHeight * -1);
    }

    gameOver() {
        // erase word (might put this in reset later on)
        this.word = '';
    }
}
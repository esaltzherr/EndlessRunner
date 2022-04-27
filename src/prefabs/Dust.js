class Dust extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.physics.add.existing(this);
        scene.add.existing(this);
        this.scale = 0.75;
        this.alpha = 0;
        this.timer = 30;
    }

    update() {
        this.timer -= 1;
        if(this.timer == 0) {
            if(this.scene.player.body.velocity.y == 0) { this.createDust(); } // TODO
            this.timer = 45;
        }
    }

    createDust() {
        let newDust = this.scene.physics.add.sprite(this.x, this.y, 'player_dust', 0).setOrigin(0.5, 0.5);
        newDust.scale = 0.75;
        newDust.setVelocityX(-60);
        newDust.angle = Math.floor(Math.random() * 360)
        newDust.anims.create({
            key: 'dust',
            frames: this.anims.generateFrameNumbers('player_dust', {frames: [0, 1, 2, 3]}),
            frameRate: 12,
        });
        newDust.anims.play('dust');

        newDust.on('animationcomplete', () => { newDust.destroy(); })
    }
}
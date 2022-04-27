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
            if(this.scene.player.body.velocity.y == 0) { this.createDust(this.x, this.y, 'player_run_dust', 12); }
            this.timer = 20;
        }
    }

    createDust(x, y, textureKey, rate) {
        let newDust = this.scene.physics.add.sprite(x, y, textureKey, 0).setOrigin(0.5, 0.5);
        newDust.scale = 0.75;
        newDust.setVelocityX(-60);
        if(textureKey == 'player_run_dust') { newDust.angle = Math.floor(Math.random() * 360) }
        newDust.anims.create({
            key: 'dust',
            frames: textureKey,
            frameRate: rate,
        });
        newDust.anims.play('dust');
        newDust.on('animationcomplete', () => { newDust.destroy(); });
    }
}
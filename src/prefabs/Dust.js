class Dust extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.physics.add.existing(this);
        scene.add.existing(this);
        this.scale = 0.75;
        this.alpha = 0;
        this.timer = 40;
    }

    update() {
        // every 40 frames, create new run dust
        this.timer -= 1;
        if(this.timer == 0) {
            if(this.scene.player.body.velocity.y == 0) { this.createDust(this.x, this.y, 'player_run_dust', 12); }
            this.timer = 40;
        }
    }

    createDust(x, y, textureKey, rate) {
        // create new dust sprite and move it back
        let newDust = this.scene.physics.add.sprite(x, y, textureKey, 0).setOrigin(0.5, 0.5);
        if(textureKey == 'player_run_dust') { newDust.angle = Math.floor(Math.random() * 360) }
        newDust.scale = 0.75;
        newDust.setVelocityX(-60);

        // create dust animation and destroy upon completion
        newDust.anims.create({
            key: 'dust',
            frames: textureKey,
            frameRate: rate,
        });
        newDust.anims.play('dust');
        newDust.on('animationcomplete', () => { newDust.destroy(); });
    }
}
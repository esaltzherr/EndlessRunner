class Letterspawner extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture){
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        var heightofletters = 32;
        this.highest = 200;
        // 432 is where the ground is
        this.lowest = 432 - heightofletters;
        this.movespeed = -1;
        this.startingtimer = 220;
        this.timer = this.startingtimer;
        this.lettersGroup = scene.physics.add.group();
    }

    update(){
        // Go Up and Down
        if(this.y <= this.highest || this.y >= this.lowest){
            this.movespeed *=-1;
        }
        this.y += this.movespeed;
        // Spawn a new Letter based off of a timer
        this.timer -= 1;
        if(this.timer <= 0){
            this.timer = this.startingtimer;
            var letter = new Letter(this.scene, this.x, this.y).setOrigin(0,0);
            this.lettersGroup.add(letter);
            letter.setVelocity(letter.speed,0);
            letter.init();
        }
    }
}
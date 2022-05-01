randomlocations = [240, 320, 400];
class Letterspawner extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        var heightofletters = 32;
        this.highest = 240;
        this.setY(this.highest);
        // 432 is where the ground is
        this.lowest = 432 - heightofletters;
        //this.movespeed = -14.5;
        this.startingtimer = 150;
        this.timer = this.startingtimer;
        this.lettersGroup = scene.physics.add.group();
        this.hello = 0;
    }

    update() {
        // Go Up and Down
        //if(this.y <= this.highest || this.y >= this.lowest){
        //    this.movespeed *=-1;
        //}
        //this.y += this.movespeed;
        // Spawn a new Letter based off of a timer
        this.timer -= 1;
        if (this.timer <= 0) {
            this.timer = this.startingtimer;
            var letter = new Letter(this.scene, this.x, this.y).setOrigin(0, 0);
            this.lettersGroup.add(letter);
            letter.setVelocity(letter.speed, 0);
            letter.init();
            this.randomMove();
        }
    }
    randomMove() {
        var y = this.getRandomInt(randomlocations.length)
        this.setY(randomlocations[y]);
    }
    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    gameOver() {
        // clear letter group to get rid of any letters left on screen
        this.lettersGroup.clear(1, 1);
    }
}
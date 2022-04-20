class Letter extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y){
        super(scene, x, y);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.speed = 100;
        this.randomletter();
        this.setVelocity(this.speed,0);
        
    }
    update(){
        this.x -= this.speed;

    }
    randomletter(){
        var randomNum = this.getRandomInt(1,2);
        console.log(randomNum);
        if(randomNum == 1){
            this.letter = "a";
            this.setTexture('letterA');
        }
        else if(randomNum == 2){
            this.letter = "b";
            this.setTexture('letterB');
        }
        
    }
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
      }
}
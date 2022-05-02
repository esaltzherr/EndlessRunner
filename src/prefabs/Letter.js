// Creates a list of the Alphabet
var letterList = [];
for(i = 0; i < 26; i++){
    letterList.push(String.fromCharCode(65+i));
}
let total = 0;
// list of chances for each number to be spawned
var chances = [total = 8.087, total += 1.493, total += 2.781, total += 4.253, total += 12.702, total +=2.228, total += 2.015, total += 6.094, total += 6.966,total +=0.153, total += 0.772,total +=4.094,total +=2.587,total += 6.749,total +=7.507, total += 1.929, total +=0.096,total +=5.987, total += 6.234 ,total += 9.056, total += 2.758,total += 0.978, total +=2.360,total +=0.150,total +=1.974,total +=0.074];


class Letter extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y){
        super(scene, x, y);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.speed = -200;
        this.randomletter();
        this.setVelocity(this.speed,0);
    }
    init(){
        // initalize after getting added to group
        this.setVelocity(this.speed,0);
    }
    randomletter(){
        //gives a random # from 0-100.999. The % for a number to shows up all totals to about 100.077
        var randomNum = this.getRandomInt(0,100);
        for(i = 0; i < chances.length; i++){
            if(randomNum < chances[i]){
                this.letter = letterList[i];
                this.setTexture('letter' + letterList[i]);
                this.play('letter' + letterList[i]);
                return;
            }
        }
        if(this.letter == undefined){
            this.randomletter();
        }
    }
    
    // generates a random float within the range min and max, including both up to .
    getRandomInt(min, max, places = 3) {
        let value = (Math.random() * (max - min + 1)) + min;
        return Number.parseFloat(value).toFixed(places);
      }
}
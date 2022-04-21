class AttemptWord extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, player) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setScale(0.5);
        this.player = player;
        this.string = player.word;
        this.scene.add.text(490,500,"Press Enter To Submit Word", {font: "20px Arial", fill: "#000000"});
        this.word = this.scene.add.text(200,500,"-", {font: "40px Arial", fill: "#ff0044"});

        
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyENTER)){
            this.scene.sendback(this.player.word.length);
            this.submitWord();
            
        }
        this.word.setText(this.player.word);
    }
    submitWord(){
        this.player.word = ''
    }
    
}
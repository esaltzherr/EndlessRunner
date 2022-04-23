class AttemptWord extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, player, scoreboard) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.alreadyAttempted = true;
        this.setScale(0.5);
        this.player = player;
        this.string = player.word;
        this.scoreboard = scoreboard
        this.scene.add.text(490, 500, "Press Enter To Submit Word", { font: "20px Arial", fill: "#000000" });
        this.word = this.scene.add.text(200, 500, "-", { font: "40px Arial", fill: "#ff0044" });
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyENTER)) {
            this.submitWord('enter');

        }
        if (Phaser.Input.Keyboard.JustDown(keyBACK)) {
            this.submitWord('back');
        }
        this.word.setText(this.player.word);
    }
    submitWord(keyPressed) {
        if (keyPressed == "enter") {
            console.log('test');
            if (this.checklist(this.player.word)) {
                this.scene.sendback(this.player.word.length * this.player.word.length * 2);
                this.player.score += this.player.word.length;
                this.player.word = '';
                this.scoreboard.text = this.player.score
                console.log('test2');
                // Correct Noise
                // Success Animation?
            }
            else {
                console.log('test3');
                // failure Noise / shake letters
            }
        }
        else if(keyPressed == "back"){
            this.scene.sendback(this.player.word.length);
            this.player.word = ''
        }

    }
    checklist(word) {
        if (this.scene.arrayWords.includes(word)) {
            return true;
        }
        return false;
    }

}
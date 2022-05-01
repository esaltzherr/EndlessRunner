class AttemptWord extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, player, scoreboard) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.alreadyAttempted = true;
        this.setScale(0.5);
        this.alpha = 0;
        this.player = player;
        this.string = player.word;
        this.scoreboard = scoreboard
        //this.scene.add.text(490, 500, "Press Enter To Submit Word", { font: "20px Arial", fill: "#000000" });
        this.word = this.scene.add.text(200, 500, "-", { font: "40px Arial", fill: "#ff0044" });
        this.shakeCam = this.scene.cameras.add(0, 500);
        this.shakeCam.setBounds(0, 500)
        keyENTER.on('down', (key, event) => { this.submitWord('enter'); });
        keyBACK.on('down', (key, event) => { this.submitWord('back'); });
    }

    update() {
        /*
        if (Phaser.Input.Keyboard.JustDown(keyENTER)) {
            this.submitWord('enter');

        }
        if (Phaser.Input.Keyboard.JustDown(keyBACK)) {
            this.submitWord('back');
        }
        */
        this.word.setText(this.player.word);
    }
    submitWord(keyPressed) {
        if (keyPressed == "enter") {
            if (this.checklist(this.player.word)) {
                this.scene.sendback(this.player.word.length * this.player.word.length * 2);
                this.player.score += this.player.word.length;
                this.player.word = '';
                this.scoreboard.text = this.player.score
                // Correct Noise
                // Success Animation?
            }
            else {
                // failure Noise / shake letters
                this.shakeCam.shake(100, {x: 0.05, y: 0})
            }
        }
        else if(keyPressed == "back"){
            console.log("BACK");
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

    shake() {
        console.log('shaking');
        for(let i = -10; i <= 10; ++i) {
            this.word.x += 5 * Math.sin(i);
        }
    }
}

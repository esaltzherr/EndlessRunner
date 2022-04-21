class Play extends Phaser.Scene {
    constructor() {
        super("playscene");
    }
    preload() {
        // load images/sprites

        //loads the each letter, if adding letters change the 2nd perameter with how many currently exist
        var base = 'letter'
        var total;
        for (i = 0; i < 26; i++) {
            total = base + String.fromCharCode(65 + i);
            this.load.image(total, './assets/' + total + '.png')
        }


        this.load.image('paper', './assets/paper.png');
        this.load.image('pencil', './assets/pencil.png');
        this.load.image('ground_temp', './assets/ground_temp.png');
        this.load.image('player_temp', './assets/player_size_ref.png');
        this.load.image('button', './assets/attemptButton.png');
        this.load.text('scrabble', './assets/scrabble.txt');

    }

    create() {
        //load all the words
        this.listOfWords();
        
        this.backround = this.add.tileSprite(-100, -100, 0, 0, 'paper').setOrigin(0, 0);
        this.letterspawner = new Letterspawner(this, 900, 200).setOrigin(0, 0);
        this.letterspawner.lettersGroup;

        this.eraser = new Eraser(this, -200, 200, 'pencil').setOrigin(0, 0);
        this.physics.add.collider(this.eraser, this.letterspawner.lettersGroup, function (eraser, lettersGroup) {
            lettersGroup.destroy();
            // play erase sound effect
            // sound effect
        });

        // add keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        keyBACK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.BACKSPACE);


        this.ground = new Ground(this, 0, game.config.height * 0.8, 'ground_temp').setOrigin(0, 0);
        this.player = new Player(this, game.config.width / 2, game.config.height * 0.6, 'player_temp', 0, 900, 500).setOrigin(0, 0);
        
        this.physics.add.collider(this.player, this.ground);
        
        this.physics.add.overlap(this.player, this.eraser, this.gameOver, null, this);

        this.button = new AttemptWord(this, 750, 450, 'button', this.player).setOrigin(0, 0);

        this.physics.add.collider(this.player, this.letterspawner.lettersGroup, this.addLetter);

    }

    update() {
        this.letterspawner.update();
        this.player.update();
        this.eraser.update();
        this.button.update();
    }
    sendback(length) {
        this.eraser.speed -= length;
    }
    listOfWords() {
        let cache = this.cache.text;
        let scrabbleWords = cache.get('scrabble');
        this.arrayWords = scrabbleWords.split('\r\n');
       
    }
    gameOver(player, eraser){
        this.add.text(100, 100, "Game Over", { font: "20px Arial", fill: "#000000" });
    }
    addLetter(player, lettersGroup){
        player.word += lettersGroup.letter;
            lettersGroup.destroy();
    }
}
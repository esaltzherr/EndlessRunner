class Play extends Phaser.Scene {
    constructor() {
        super("playscene");
    }
    preload() {
        // load images/sprites

        //loads the each letter, if adding letters change the 2nd perameter with how many currently exist
        var name;
        var file;
        for (i = 0; i < 26; i++) {
            name = 'letter' + String.fromCharCode(65 + i);
            file = 'let_' + String.fromCharCode(65 + i).toLowerCase();
            this.load.spritesheet(name, './assets/' + file + '.png', {frameWidth: 32, frameHeight: 32});
        }

        this.load.image('paper', './assets/paperBackground.png');
        //this.load.image('pencil', './assets/pencil.png');
        this.load.spritesheet('pencil', './assets/pencil_2.png', { frameWidth: 285, frameHeight: 300, spacing: 105 })
        this.load.image('ground_temp', './assets/ground_temp.png');
        this.load.spritesheet('player_run', './assets/player_run.png', { frameWidth: 72, frameHeight: 72 });
        this.load.spritesheet('player_jump', './assets/player_jump.png', { frameWidth: 72, frameHeight: 72 });
        this.load.spritesheet('player_fall', './assets/player_fall.png', { frameWidth: 72, frameHeight: 72 });
        this.load.spritesheet('player_fall_squash', './assets/player_fall_squash.png', { frameWidth: 72, frameHeight: 72 });
        this.load.image('button', './assets/attemptButton.png');
        this.load.text('scrabble', './assets/scrabble.txt');
    }

    create() {
        this.gameIsOver = false;

        //load all the words
        this.listOfWords();

        this.background = this.add.tileSprite(-100, -35, 0, 0, 'paper').setOrigin(0, 0);
        this.letterspawner = new Letterspawner(this, 900, 200).setOrigin(0, 0);
        this.letterspawner.lettersGroup;

        //this.eraser = new Eraser(this, -200, 200, 'pencil').setOrigin(0, 0);  // old pencil
        this.eraser = new Eraser(this, -200, 150, 'pencil').setOrigin(0, 0);
        this.physics.add.collider(this.eraser, this.letterspawner.lettersGroup, function (eraser, lettersGroup) {
            lettersGroup.destroy();
            // play erase sound effect
            // sound effect
        });

        // add keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);        // jump
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);        // confirm word
        keyBACK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.BACKSPACE);     // erase word
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);                // reset
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);            // back to menu

        // add ground and player
        this.ground = new Ground(this, 0, game.config.height * 0.8, 'ground_temp').setOrigin(0, 0);
        this.player = new Player(this, game.config.width / 2, game.config.height * 0.6, 'player_run', 0, 900, 500).setOrigin(0, 0);

        // add colliders
        this.physics.add.collider(this.player, this.ground);
        this.physics.add.overlap(this.player, this.eraser, this.gameOver, null, this);
        this.physics.add.collider(this.player, this.letterspawner.lettersGroup, this.addLetter);

        // scoreboard (maybe a texture later?)
        let scoreConfig = {
            fontFamily: "Courier",
            fontSize: "28px",
            backgroundColor: "#F3B141",
            color: "#843605",
            align: "right",
            padding: {
                top: 5,
                bottom: 5
            },
            fixedWidth: 100
        };
        this.scoreboard = this.add.text(game.config.width - 150, 100, this.player.score, scoreConfig);

        this.button = new AttemptWord(this, 750, 450, 'button', this.player, this.scoreboard).setOrigin(0, 0);

        for (i = 0; i < 26; i++) {
            this.anims.create({
                key: 'letter' + String.fromCharCode(65 + i),
                frames: this.anims.generateFrameNumbers('letter' + String.fromCharCode(65 + i), { frames: [0, 1] }),
                frameRate: 8,
                repeat: -1,
            });
        }
    }

    update() {
        if (!this.gameIsOver) {
            this.letterspawner.update();
            this.player.update();
            this.eraser.update();
            this.button.update();
            this.background.tilePositionX += 2;
        }
    }

    sendback(length) {
        this.eraser.speed -= length;
    }

    listOfWords() {
        // ISSUE ON GITHUB PAGES: DOESN'T SEPARATE BY LINE
        let cache = this.cache.text;
        let scrabbleWords = cache.get('scrabble');
        this.arrayWords = scrabbleWords.split('\r\n');
    }

    gameOver(player, eraser) {
        // pause screen
        this.gameIsOver = true;
        this.letterspawner.gameOver();
        this.player.gameOver();
        this.eraser.gameOver();
        this.add.text(100, 100, "Game Over (Press R to reset | ESC for main menu)", { font: "20px Arial", fill: "#000000" });
        keyR.on('down', (key, event) => { this.scene.restart(); });
        keyESC.on('down', (key, event) => { this.scene.start('menuscene'); });
    }

    addLetter(player, lettersGroup) {
        player.word += lettersGroup.letter;
        lettersGroup.destroy();
    }
}
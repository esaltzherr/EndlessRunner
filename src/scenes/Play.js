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
        this.load.spritesheet('pencil', './assets/pencil_3.png', { frameWidth: 572, frameHeight: 600, spacing: 212 })
        this.load.image('ground_temp', './assets/ground_temp.png');

        this.load.atlas('playerAtlas', '/assets/PlayerAtlas.png', '/assets/PlayerAtlas.json');

        this.load.spritesheet('player_run', './assets/player_run.png', { frameWidth: 72, frameHeight: 72 });
        this.load.spritesheet('player_jump', './assets/player_jump.png', { frameWidth: 72, frameHeight: 72 });
        this.load.spritesheet('player_fall', './assets/player_fall.png', { frameWidth: 72, frameHeight: 72 });
        this.load.spritesheet('player_fall_squash', './assets/player_fall_squash.png', { frameWidth: 72, frameHeight: 72 });
        this.load.spritesheet('player_run_dust', './assets/player_run_dust.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('player_jump_dust', './assets/jump_dust.png', {frameWidth: 64, frameHeight: 64});
        this.load.image('button', './assets/attemptButton.png');
        this.load.image('score', './assets/score_box.png');
        this.load.text('scrabble', './assets/scrabble.txt');
    }

    create() {

        this.gameIsOver = false;

        //load all the words
        this.listOfWords();

        this.background = this.add.tileSprite(-100, -35, 0, 0, 'paper').setOrigin(0, 0);
        this.letterspawner = new Letterspawner(this, 1000, 200).setOrigin(0, 0);
        this.letterspawner.lettersGroup;

        //this.eraser = new Eraser(this, -200, 200, 'pencil').setOrigin(0, 0);  // old pencil
        this.eraser = new Eraser(this, -500, -100, 'pencil').setOrigin(0, 0);
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
        this.player = new Player(this, game.config.width / 2, game.config.height * 0.6, 'player', 0, 1500, 660).setOrigin(0,0); //900, 500 // 1200, 580
        this.dust = new Dust(this, this.player.x + 15, this.player.y + 72 + 32, 'player_run_dust').setOrigin(0, 0);
        this.endHitBox = this.add.sprite(game.config.width / 2 + 30, game.config.height * 0.6).setOrigin(0,0);
        this.physics.add.existing(this.endHitBox);      

        // add colliders
        this.physics.add.collider(this.player, this.ground);
        this.physics.add.overlap(this.endHitBox, this.eraser, this.gameOver, null, this);
        this.physics.add.collider(this.player, this.letterspawner.lettersGroup, this.addLetter);

        // scoreboard and attempt word
        let scoreConfig = {
            fontFamily: "Courier",
            fontSize: "40px",
            color: "#000000",
            stroke: "#000000",
            strokeThickness: 1,
            align: "right",
            padding: {
                top: 8,
                bottom: 2,
            },
            fixedWidth: 187
        };
        this.scoreboard = this.add.text(game.config.width - 200, 90, this.player.score, scoreConfig);
        this.scorebox = this.add.sprite(this.scoreboard.x + 95, this.scoreboard.y + 25, 'score').setScale(1.5);
        this.button = new AttemptWord(this, 750, 450, 'button', this.player, this.scoreboard).setOrigin(0, 0);

        // create letter anims
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
            this.dust.update();
            this.eraser.update();
            this.button.update();
            this.background.tilePositionX += 2.5;
        }
    }

    sendback(length) {
        this.eraser.speed -= length;
    }

    listOfWords() {
        // ISSUE ON GITHUB PAGES: DOESN'T SEPARATE BY LINE
        let cache = this.cache.text;
        let scrabbleWords = cache.get('scrabble');
        this.arrayWords = scrabbleWords.split("\r\n");
        if(this.arrayWords.length <= 1){
            this.arrayWords = scrabbleWords.split("\n");
        }
    }
/*
    listOfWords() {
        // ISSUE ON GITHUB PAGES: DOESN'T SEPARATE BY LINE
        let cache = this.cache.text;
        let scrabbleWords = cache.get('scrabble');
        this.arrayWords = scrabbleWords.split("\n");
        //console.log(scrabbleWords.split("\n")); // it didnt update to the pages so re committing to see if it does
        console.log(this.arrayWords);
    }
*/
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
class Play extends Phaser.Scene {
    constructor() {
        super("playscene");
    }
    preload() {
        //loads the each letter, if adding letters change the 2nd perameter with how many currently exist
        var name;
        var file;
        for (i = 0; i < 26; i++) {
            name = 'letter' + String.fromCharCode(65 + i);
            file = 'let_' + String.fromCharCode(65 + i).toLowerCase();
            this.load.spritesheet(name, './assets/letters/' + file + '.png', {frameWidth: 32, frameHeight: 32});
        }

        // load doodles
        this.doodleNames = ['cube', 'face', 'hearts', 'lightning1', 'lightning2', 'lightning3',
                            'peace', 'peaker', 'skull', 'spiral'];
        for(i = 0; i < this.doodleNames.length; i++) {
            this.load.image(this.doodleNames[i], './assets/doodles/doodle_' + this.doodleNames[i] + '.png');
        }

        // load other images
        this.load.image('paper', './assets/paperBackgroundRed.png');
        this.load.spritesheet('pencil', './assets/pencil_3.png', { frameWidth: 572, frameHeight: 600, spacing: 212 })
        this.load.image('ground_temp', './assets/ground_temp.png');
        this.load.atlas('playerAtlas', './assets/PlayerAtlas.png', './assets/PlayerAtlas.json');
        this.load.spritesheet('player_run_dust', './assets/player_run_dust.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('player_jump_dust', './assets/jump_dust.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('sparkle', './assets/sparkle.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('score', './assets/score_board_spr.png', {frameWidth: 192, frameHeight: 48} );
        this.load.text('scrabble', './assets/scrabble.txt');

        // load sounds
        this.load.audio('collect', './assets/audio/letter_collect.wav');
        this.load.audio('clearWord', './assets/audio/clear_word_sound.wav');
        this.load.audio('confirmWord', './assets/audio/confirm_word_sound.wav');
        this.load.audio('notWord', './assets/audio/not_a_word_sound.wav');
        this.load.audio('jumpSound', './assets/audio/jump_sound.wav');
        this.load.audio('song1', './assets/audio/song1.mp3');
    }

    create() {
        this.gameIsOver = false;
        this.sound.play('song1', { loop: true } );

        //load all the words
        this.listOfWords();

        this.background = this.add.tileSprite(-100, -35, 0, 0, 'paper').setOrigin(0, 0);
        this.letterspawner = new Letterspawner(this, 1000, 200).setOrigin(0, 0);
        this.letterspawner.lettersGroup;

        this.eraser = new Eraser(this, -500, -100, 'pencil').setOrigin(0, 0);
        this.physics.add.collider(this.eraser, this.letterspawner.lettersGroup, function (eraser, lettersGroup) {
            lettersGroup.destroy();
        });

        // create group and timer for doodles
        this.doodleGroup = this.physics.add.group();
        this.doodleTimer = 0;

        // setup doodleDestroyer
        this.doodleDestroyer = this.physics.add.sprite(-100, 0).setOrigin(0, 0);
        this.doodleDestroyer.setScale(1, this.game.config.height);
        this.doodleDestroyer.setImmovable(true);

        // add keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);        // jump
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);        // confirm word
        keyBACK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.BACKSPACE);     // erase word
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);                // reset
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);            // back to menu

        // add ground and player
        this.ground = new Ground(this, 0, game.config.height * 0.8, 'ground_temp').setOrigin(0, 0);
        this.player = new Player(this, game.config.width / 2, game.config.height * 0.6, 'player', 0, 1500, 660).setOrigin(0,0);
        this.dust = new Dust(this, this.player.x + 15, this.player.y + 72 + 32, 'player_run_dust').setOrigin(0, 0);
        this.endHitBox = this.add.sprite(game.config.width / 2 + 30, game.config.height * 0.6).setOrigin(0,0);
        this.physics.add.existing(this.endHitBox);      

        // add colliders
        this.physics.add.collider(this.player, this.ground);
        this.physics.add.overlap(this.endHitBox, this.eraser, this.gameOver, null, this);
        this.physics.add.collider(this.player, this.letterspawner.lettersGroup, this.addLetter, null, this);
        this.physics.add.collider(this.doodleDestroyer, this.doodleGroup, function (destoyer, doodleGroup) { 
            doodleGroup.destroy(); 
        });

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
        this.scorebox = this.add.sprite(this.scoreboard.x + 95, this.scoreboard.y + 25, 'score');
        this.button = new AttemptWord(this, 750, 450, null, this.player, this.scoreboard).setOrigin(0, 0);

        // create letter anims
        for (i = 0; i < 26; i++) {
            this.anims.create({
                key: 'letter' + String.fromCharCode(65 + i),
                frames: this.anims.generateFrameNumbers('letter' + String.fromCharCode(65 + i), { frames: [0, 1] }),
                frameRate: 8,
                repeat: -1,
            });
        }

        this.anims.create({
            key: 'letterCollect',
            frames: 'sparkle',
            frameRate: 18,
        });

        this.anims.create({
            key: 'scoreboard',
            frames: 'score',
            frameRate: 8
        });
    }

    update() {
        if (!this.gameIsOver) {
            this.letterspawner.update();
            this.player.update();
            this.dust.update();
            this.eraser.update();
            this.button.update();
            this.scorebox.anims.play('scoreboard', true);
            this.background.tilePositionX += 2.5;

            // randomly spawn doodles every 60 frames
            this.doodleTimer++;
            if(this.doodleTimer == 60) {
                if(Math.floor(Math.random() * 4) == 1) { this.spawnDoodles(); }
                this.doodleTimer = 0;
            }
        }
    }

    sendback(length) {
        this.eraser.speed -= length;
        if(this.eraser.speed < -10) { this.eraser.speed = - 10; }
    }

    listOfWords() {
        let cache = this.cache.text;
        let scrabbleWords = cache.get('scrabble');
        this.arrayWords = scrabbleWords.split("\r\n");
        if(this.arrayWords.length <= 1){
            this.arrayWords = scrabbleWords.split("\n");
        }
    }

    gameOver(player, eraser) {
        // pause screen
        this.gameIsOver = true;
        this.letterspawner.gameOver();
        this.player.gameOver();
        this.add.text(100, 100, "Game Over (Press R to reset | ESC for main menu)", { font: "20px Arial", fill: "#000000" });
        keyESC.on('down', (key, event) => { this.scene.start('menuscene'); });
        keyR.on('down', (key, event) => { 
            this.sound.removeAll()
            this.scene.restart(); 
        });
    }

    addLetter(player, lettersGroup) {
        this.collectAnim(lettersGroup);
        this.sound.play('collect');
        player.word += lettersGroup.letter;
        lettersGroup.destroy();
    }

    collectAnim(lettersGroup) {
        let p = this.add.sprite(lettersGroup.x, lettersGroup.y, 'sparkle').setOrigin(0.5, 0.5);
        p.scale = 2;
        p.anims.play('letterCollect');
        p.on('animationcomplete', () => { p.destroy(); });
    }

    spawnDoodles() {
        let random = Math.floor(Math.random() * this.doodleNames.length);
        let randY = Math.floor(Math.random() * this.game.config.height);
        let doodle = this.physics.add.sprite(this.game.config.width + 100, randY,
                                             this.doodleNames[random]).setOrigin(0.5, 0.5);
        this.doodleGroup.add(doodle);
        doodle.alpha = 0.25;                                             
        doodle.setVelocityX(-200);
    }
}
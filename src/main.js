// Wordlist from Collins Scrabble Words (2019). 279,496 words. Words only.

// Creative Tilt: 

let config = {
    type: Phaser.AUTO,
    width: 960,
    height: 540,
    physics: {
      default: "arcade",
      arcade: {
        debug: false
      }
    },
    scene: [ Menu, Play ]
  }
  
  let game = new Phaser.Game(config);
  
  // reserve keyboard vars
  let keyR, keyLEFT, keyRIGHT, keySPACE, keyENTER, keyBACK, keyESC;

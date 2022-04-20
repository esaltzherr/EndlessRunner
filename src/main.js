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
    scene: [ Play ]
  }
  
  let game = new Phaser.Game(config);
  
  // reserve keyboard vars
  let keyF, keyR, keyLEFT, keyRIGHT, keySPACE;

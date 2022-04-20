let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
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
  let keyF, keyR, keyLEFT, keyRIGHT;

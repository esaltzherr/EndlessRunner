// Wordlist from Collins Scrabble Words (2019). 279,496 words. Words only.

// TITLE: PENCIL PUSHER
// Code by: Elroy Saltzherr, Mason Kubiak Art by: Ethan Goldreyer

// Creative Tilt: 
// 1.) One thing our group is very proud about is how well we modularized everything using OOP.
//     We tried to make everything as separate as possible to make it easy to make changes and
//     make the development process as smooth as possible. Another technique we used was loading
//     in spritesheets that have similar names using a for loop, rather than loading them one by
//     one.
// 2.) From an aesthetic perspective, we committed to uniting our mechanics and art within the 
//     context of a classroom notebook. Because our game revolves around forming - or "writing" - 
//     words from a series of random letters, we intentionally lent animations a wobbly "scribbled" 
//     look, and used real paper and pencils to record sounds befitting our hand-drawn style.

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


// shared object between scenes
let g_game = {
  sounds: {},
  score: 0
};

/*
  init game when testing locally, not used when running from norby world
*/
function initGame() {

  const config = {
    parent: 'gameDiv',
    width: 16 * 16 * g_game.DEFS.SCALE,
    height: 16 * 9 * g_game.DEFS.SCALE,
    scale: {
      mode: Phaser.Scale.FIT
    },
    autoCenter: true,
    backgroundColor: 0xeeeeee,
    scene: [BootScene, PlayScene, UIScene],
    dom: {
      createContainer: false
    },
    pixelArt: true,
    /*render: {
      antialias: false
    }*/
  };

  new Phaser.Game(config);

}

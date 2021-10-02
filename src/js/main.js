
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
    width: 32 * 16,
    height: 32 * 9,
    scale: {
      mode: Phaser.Scale.FIT
    },
    autoCenter: true,
    scene: [BootScene, PlayScene, UIScene],
    dom: {
      createContainer: false
    },
    render: {
      antialias: true
    }
  };

  new Phaser.Game(config);

}

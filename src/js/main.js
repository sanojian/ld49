
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
    width: 16 * 16,
    height: 16 * 9,
    scale: {
      mode: Phaser.Scale.FIT
    },
    autoCenter: true,
    backgroundColor: 0xeeeeee,
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

/*
  This is the UI scene that sits on top of the game scene
*/

class UIScene extends Phaser.Scene {

  constructor() {
    super("UIScene");
  }

  create() {


    var style = {
      fontFamily: 'Conv_ladybug px',
      fontSize: '9px',
      color: '#333333'
    };

    var graphics = this.add.graphics({
			x: this.sys.game.scale.gameSize.width/2,
			y: 11 * g_game.DEFS.SCALE
		});

    for (let i = 11; i <= 22; i++) {
      let element = g_game.DEFS.ELEMENTS[i];

      this.add.text(this.sys.game.scale.gameSize.width/2 - 8, 12*(i-9), element.name, style).setOrigin(0.9, 0);
      graphics.lineStyle(1, 0x333333);
      graphics.lineBetween(0, 12*(i-12), 216, 12*(i-12));

      graphics.lineBetween(6 + 16*(i-10), -20, 6 + 16*(i-10), 14 + 12*(20-10));

      graphics.fillStyle(element.color);
      graphics.fillRect(3, 12*(i-11) - 8, 7, 7);

      graphics.fillRect(10 + 16*(i-10), -20, 7, 7);
    }

    for (let key in g_game.DEFS.REACTIONS) {

      let index1 = parseInt(key.substr(0, 2), 10);
      let index2 = parseInt(key.substr(3, 2), 10);

      let first = g_game.DEFS.ELEMENTS[index1];
      let second = g_game.DEFS.ELEMENTS[index2];
      let result = g_game.DEFS.ELEMENTS[g_game.DEFS.REACTIONS[key]];

      graphics.fillStyle(result.color);
      graphics.fillRect(10 + 16*(index2-10), 12*(index1-11) - 8, 7, 7);
      graphics.fillRect(10 + 16*(index1-10), 12*(index2-11) - 8, 7, 7);

    }

    style.fontSize = '40px';

    this.add.text(54 * g_game.DEFS.SCALE, 20 * g_game.DEFS.SCALE, 'Chain \n  Reactor', style).setOrigin(0.5, 0.5);

    this.dialog = this.add.image(0, 0, 'dialog').setOrigin(0, 0).setScale(g_game.DEFS.SCALE).setInteractive();

    this.gameOverImage = this.add.image(160 * g_game.DEFS.SCALE, 70 * g_game.DEFS.SCALE, 'game_over').setScale(g_game.DEFS.SCALE).setVisible(false);

    this.retryButton = this.add.image(160 * g_game.DEFS.SCALE, 110 * g_game.DEFS.SCALE, 'retry').setScale(g_game.DEFS.SCALE).setVisible(false);
    this.retryButton.setInteractive({ useHandCursor: true });
    this.retryButton.on('pointerdown', () => {
      location.reload();
    });

    style.fontSize = '20px';
    let startText = this.add.text(160 * g_game.DEFS.SCALE, 60 * g_game.DEFS.SCALE, 'make power but\ndon\'t destroy your reactor!', style).setOrigin(0.5);
    let startButton = this.add.image(160 * g_game.DEFS.SCALE, 100 * g_game.DEFS.SCALE, 'start').setScale(g_game.DEFS.SCALE);
    startButton.setInteractive({ useHandCursor: true });
    startButton.on('pointerdown', () => {
      this.dialog.setVisible(false);
      startButton.setVisible(false);
      startText.setVisible(false);
    }, this);

    this.music1 = this.sound.add('music1');
    this.music2 = this.sound.add('music2');

    let currentSong = 'music1';
    let songPlayCount = 0;

    this.music1.on('complete', () => {
      songPlayCount++;
      if (songPlayCount >= 3) {
        songPlayCount = 0;
        this.music2.play();
      }
      else {
        this.music1.play();
      }
    }, this);

    this.music2.on('complete', () => {
      songPlayCount++;
      if (songPlayCount >= 3) {
        songPlayCount = 0;
        this.music1.play();
      }
      else {
        this.music2.play();
      }
    }, this);


    this.music1.play();
  }

  showGameOver() {
    this.dialog.setVisible(true);
    this.gameOverImage.setVisible(true);
    this.retryButton.setVisible(true);
  }
}

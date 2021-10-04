/*
  This scene is for loading graphics and sound
*/

class BootScene extends Phaser.Scene {

    constructor() {
        super("BootScene");
    }

    preload() {


      this.load.image('chem1_source', '/dist/assets/gfx/chem1.png');
      this.load.image('chem2_source', '/dist/assets/gfx/chem2.png');
      this.load.image('chem3_source', '/dist/assets/gfx/chem3.png');
      this.load.image('chem4_source', '/dist/assets/gfx/chem4.png');
      this.load.image('valve', '/dist/assets/gfx/valve.png');
      this.load.image('vat_reactor', '/dist/assets/gfx/vat_reactor.png');
      this.load.image('toxic', '/dist/assets/gfx/toxic_symbol.png');
      this.load.image('block', '/dist/assets/gfx/block.png');

      this.load.audio('music1', '/dist/assets/audio/Chemical_track1.mp3');
      this.load.audio('music2', '/dist/assets/audio/Chemical_track2.mp3');

    }

    create() {


        this.time.delayedCall(200, function () {

          this.scene.start('PlayScene');
          this.scene.start('UIScene');
        }, null, this);
    }

}

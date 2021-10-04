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
      this.load.image('thermo', '/dist/assets/gfx/thermo.png');
      this.load.image('thermo_contents', '/dist/assets/gfx/thermo_contents.png');

      this.load.image('game_over', '/dist/assets/gfx/game_over.png');
      this.load.image('power', '/dist/assets/gfx/power.png');
      this.load.image('dialog', '/dist/assets/gfx/dialog.png');
      this.load.image('start', '/dist/assets/gfx/start.png');
      this.load.image('retry', '/dist/assets/gfx/retry.png');

      this.load.image('vat_reactor_meltdown0', '/dist/assets/gfx/vat_reactor_meltdown0.png');
      this.load.image('vat_reactor_meltdown1', '/dist/assets/gfx/vat_reactor_meltdown1.png');
      this.load.image('vat_reactor_meltdown2', '/dist/assets/gfx/vat_reactor_meltdown2.png');
      this.load.image('vat_reactor_meltdown3', '/dist/assets/gfx/vat_reactor_meltdown3.png');

      this.load.image('vat_reactor_shutdown0', '/dist/assets/gfx/vat_reactor_shutdown_0.png');
      this.load.image('vat_reactor_shutdown1', '/dist/assets/gfx/vat_reactor_shutdown_1.png');
      this.load.image('vat_reactor_shutdown2', '/dist/assets/gfx/vat_reactor_shutdown_2.png');
      this.load.image('vat_reactor_shutdown3', '/dist/assets/gfx/vat_reactor_shutdown_3.png');


      this.load.audio('music1', '/dist/assets/audio/Chemical_track1.mp3');
      this.load.audio('music2', '/dist/assets/audio/Chemical_track2.mp3');
      this.load.audio('burn', '/dist/assets/audio/Explosion9.mp3');
      this.load.audio('hiss', '/dist/assets/audio/hiss.mp3');
      this.load.audio('nada', '/dist/assets/audio/nada.mp3');
      this.load.audio('pour', '/dist/assets/audio/pour.mp3');
      this.load.audio('freeze', '/dist/assets/audio/freeze.mp3');
      this.load.audio('meltdown', '/dist/assets/audio/meltdown.mp3');


    }

    create() {


        this.time.delayedCall(200, function () {

          this.scene.start('PlayScene');
          this.scene.start('UIScene');
        }, null, this);
    }

}

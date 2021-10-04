/*
  This scene is for loading graphics and sound
*/

class BootScene extends Phaser.Scene {

    constructor() {
        super("BootScene");
    }

    preload() {


      this.load.image('chem1_source', './assets/gfx/chem1.png');
      this.load.image('chem2_source', './assets/gfx/chem2.png');
      this.load.image('chem3_source', './assets/gfx/chem3.png');
      this.load.image('chem4_source', './assets/gfx/chem4.png');
      this.load.image('valve', './assets/gfx/valve.png');
      this.load.image('vat_reactor', './assets/gfx/vat_reactor.png');
      this.load.image('toxic', './assets/gfx/toxic_symbol.png');
      this.load.image('block', './assets/gfx/block.png');
      this.load.image('thermo', './assets/gfx/thermo.png');
      this.load.image('thermo_contents', './assets/gfx/thermo_contents.png');

      this.load.image('game_over', './assets/gfx/game_over.png');
      this.load.image('power', './assets/gfx/power.png');
      this.load.image('dialog', './assets/gfx/dialog.png');
      this.load.image('start', './assets/gfx/start.png');
      this.load.image('retry', './assets/gfx/retry.png');

      this.load.image('vat_reactor_meltdown0', './assets/gfx/vat_reactor_meltdown0.png');
      this.load.image('vat_reactor_meltdown1', './assets/gfx/vat_reactor_meltdown1.png');
      this.load.image('vat_reactor_meltdown2', './assets/gfx/vat_reactor_meltdown2.png');
      this.load.image('vat_reactor_meltdown3', './assets/gfx/vat_reactor_meltdown3.png');

      this.load.image('vat_reactor_shutdown0', './assets/gfx/vat_reactor_shutdown_0.png');
      this.load.image('vat_reactor_shutdown1', './assets/gfx/vat_reactor_shutdown_1.png');
      this.load.image('vat_reactor_shutdown2', './assets/gfx/vat_reactor_shutdown_2.png');
      this.load.image('vat_reactor_shutdown3', './assets/gfx/vat_reactor_shutdown_3.png');


      this.load.audio('music1', './assets/audio/Chemical_track1.mp3');
      this.load.audio('music2', './assets/audio/Chemical_track2.mp3');
      this.load.audio('burn', './assets/audio/Explosion9.mp3');
      this.load.audio('hiss', './assets/audio/hiss.mp3');
      this.load.audio('nada', './assets/audio/nada.mp3');
      this.load.audio('pour', './assets/audio/pour.mp3');
      this.load.audio('freeze', './assets/audio/freeze.mp3');
      this.load.audio('meltdown', './assets/audio/meltdown.mp3');


    }

    create() {


        this.time.delayedCall(200, function () {

          this.scene.start('PlayScene');
          this.scene.start('UIScene');
        }, null, this);
    }

}

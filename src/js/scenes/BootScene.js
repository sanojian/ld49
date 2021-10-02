/*
  This scene is for loading graphics and sound
*/

class BootScene extends Phaser.Scene {

    constructor() {
        super("BootScene");
    }

    preload() {

        this.load.audio('music1', '/dist/assets/audio/Chemical_track1.mp3');

    }

    create() {


        this.time.delayedCall(200, function () {

          this.scene.start('PlayScene');
          this.scene.start('UIScene');
        }, null, this);
    }

}

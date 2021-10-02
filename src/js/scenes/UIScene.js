/*
  This is the UI scene that sits on top of the game scene
*/

class UIScene extends Phaser.Scene {

  constructor() {
    super("UIScene");
  }

  create() {

    this.music1 = this.sound.add('music1');


    //this.music1.play({loop: true});
  }
}

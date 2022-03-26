class Scene1 extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }

  preload(){
    this.load.image("testBackground", "resources/assets/WIPBackground.png");
    this.load.image("testCharacter", "resources/assets/WIPCharacter.png");
  }

  create() {
    this.add.text(20,20,"Loading Game...");
    this.scene.start("playGame");
  }
}
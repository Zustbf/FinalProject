class preloadGame extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }

  preload(){
    this.load.image("testBackground", "assets/Background.png");
  }

  create() {
    this.add.text(20,20,"Loading Game...");
    this.scene.start("playGame");
  }
}
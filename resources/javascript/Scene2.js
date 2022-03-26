class Scene2 extends Phaser.Scene {
  constructor() {
    super("playGame");
  }

  create() {
    this.background = this.add.image(0,0,"testBackground");
    this.background.setOrigin(0,0);

    this.character = this.add.image(config.width/2, config.height/2, "testCharacter");

    this.add.text(20, 20, "Test", {font: "25px Arial", fill: "red"});
  }
}
class introScene extends Phaser.Scene {
  constructor() {
    super("intro");
  }
  preload() {

    this.load.image('introBack', 'assets/intro.png');

  }
  create() {
    this.background = this.add.image(0,0,'introBack');
    this.background.setOrigin(0,0);
    this.arrow = this.input.keyboard.createCursorKeys();
  }
  update() {
    
    if (this.arrow.up.isDown) {
      this.scene.start("tutorial");

    } 
  }
  
}




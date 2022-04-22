class endScene extends Phaser.Scene {
  constructor() {
    super("end");
  }
  preload() {


  }
  create() {
    this.background = this.add.image(0,0,'BackgroundEnd');
    this.background.setOrigin(0,0);
    //score

    let style = { font: '20px Arial', fill: '#000' };

    // Display the score in the top left corner
    this.scoreText = this.add.text(10, 10, 'score: ' + score, style);
    this.arrow = this.input.keyboard.createCursorKeys();
  }
  update() {
    
    if (this.arrow.up.isDown) {
      this.scene.start("intro");

    } 
  }
  
}




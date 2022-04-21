class preloadGame extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }

  preload(){
    this.load.image("testBackground", "assets/Background.png");
    this.load.image('coin', 'assets/coin.png');
    this.load.image('platform', 'assets/platform.png');
    this.load.image('wall', 'assets/wall.png');
    this.load.image('Background', 'assets/background_tutorial.png');
    this.load.image('redBarrier', 'assets/red_barrier.png');
    this.load.image('blueBarrier', 'assets/blue_barrier.png');
    this.load.audio('coinping', 'assets/coin.mp3');
    this.load.audio('jump', 'assets/jump.mp3');
  this.load.spritesheet('bloo', 'assets/bloo.png',{
    frameWidth: 16,
    frameHeight: 16
  });
  this.load.spritesheet('redd', 'assets/redd.png',{
    frameWidth: 16,
    frameHeight: 16
  });
  this.load.image('Background1', 'assets/background_final.png');
  }

  create() {
    this.add.text(20,20,"Loading Game...");
    this.scene.start("intro");
  }
}
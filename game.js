class mainScene {
  
  preload() {
    this.load.image('player', 'assets/ghost.png');
    this.load.image('coin', 'assets/coin.png');
    this.load.image('platform', 'assets/platform.png');
    this.load.image('testBackground', 'assets/background.png');
    this.load.audio('coinping', 'assets/coin.mp3');
    this.load.audio('jump', 'assets/jump.mp3');
    this.load.spritesheet('ball', 'assets/ball.png',{
    frameWidth: 16,
    frameHeight: 16
  });
  }
  create() {
    this.background = this.add.image(0,0,'testBackground');
    this.background.setOrigin(0,0);
    this.player = this.physics.add.sprite(100, 100, 'ball');
    this.coin = this.physics.add.sprite(32, 528, 'coin');
    this.player.body.collideWorldBounds = true;
    this.player.body.gravity.y = 150;
    //animation for ball
    this.anims.create({
      key: 'ballanim',
      frames: this.anims.generateFrameNumbers('ball'),
      frameRate: 10,
      repeat: -1
    });
    this.player.play("ballanim");
    //sounds

    this.jumpSound = this.sound.add('jump');
    this.coinSound = this.sound.add('coinping')
    //this.jumpConfig = {
      
    //}

    // platforms
    //this.platforms = this.physics.add.sprite(100,300, 'platform');
    
    
    this.score = 0;

    let style = { font: '20px Arial', fill: '#fff' };

    // Display the score in the top left corner
    this.scoreText = this.add.text(20, 20, 'score: ' + this.score, style);
    this.arrow = this.input.keyboard.createCursorKeys();
  }
  update() {
    //game.physics.arcade.collide(player, platforms);
    // If the player is overlapping with the coin
    if (this.physics.overlap(this.player, this.coin)) {
      this.hit();
      this.coinSound.play();
    }
    
    // Handle horizontal movements
    if (this.arrow.right.isDown) {
      // If the right arrow is pressed, move to the right
      this.player.x += 3;
    } else if (this.arrow.left.isDown) {
    // If the left arrow is pressed, move to the left
      this.player.x -= 3;
    } 

    //vertical movements
    if (this.arrow.down.isDown) {
      this.player.y += 3;
    } else if (this.arrow.up.isDown) {
      if (this.player.body.onFloor() || this.player.body.touching.down) {
        //this.player.y -= 30;
        this.player.setVelocity(0, -180);
        this.jumpSound.play();
      }
      //this.jumpSound.play();
      //setTimeout(() => {this.jumpSound.stop(); }, 100)
    } 
  }
  hit() {
    // Change the position x and y of the coin randomly, while making sure the coin can still be grabbed. This is just for the test level, as the coins will be placed in specific locations in the levels
    this.coin.x = Phaser.Math.Between(100, 900);
    this.coin.y = Phaser.Math.Between(430, 520);
  
    // Increment the score by 10
    this.score += 10;
  
    // Display the updated score on the screen
    this.scoreText.setText('score: ' + this.score);

    this.tweens.add({
      targets: this.player, 
      duration: 200, 
      scaleX: 1.5, 
      scaleY: 1.5, 
      yoyo: true,  
    });
  }
}



new Phaser.Game({
  width: 950, 
  height: 550, 
  backgroundColor: '#3498db', 
  scene: mainScene, 
  physics: { default: 'arcade' }, 
  parent: 'game', 
});
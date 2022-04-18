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
  this.load.spritesheet('bloo', 'assets/bloo.png',{
    frameWidth: 16,
    frameHeight: 16
  });
  this.load.spritesheet('redd', 'assets/redd.png',{
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
    this.bloo = this.physics.add.sprite(50, 100, 'bloo');
    this.redd = this.physics.add.sprite(100, 100, 'redd');
    //animation for ball
    this.anims.create({
      key: 'ballanim',
      frames: this.anims.generateFrameNumbers('ball'),
      frameRate: 10,
      repeat: -1
    });
    this.player.play("ballanim");
    this.player.setBounce(0.1);
    //animation for 2 characters
    this.anims.create({
      key: 'blooanim',
      frames: this.anims.generateFrameNumbers('bloo'),
      frameRate: 10,
      repeat: -1
    });
    this.bloo.play("blooanim");
    this.bloo.setBounce(0.1);

    this.anims.create({
      key: 'reddanim',
      frames: this.anims.generateFrameNumbers('redd'),
      frameRate: 10,
      repeat: -1
    });
    this.redd.play("reddanim");
    this.bloo.setBounce(0.1);

    //sounds

    this.jumpSound = this.sound.add('jump');
    this.coinSound = this.sound.add('coinping');
    //this.jumpConfig = {
      
    //}

    // platforms

    this.platforms = this.physics.add.staticGroup();
    //this.platforms.immovable = true;
    //this.platforms.allowGravity = false;

    this.platforms.create(250,400,'platform');
    this.platforms.create(100,500,'platform');
    
    /* Testing Platform
    this.platform1 = this.physics.add.staticImage(250,500,'platform');
    this.platform1.immovable = true;
    this.platform1.allowGravity = false;
    */


    this.score = 0;

    let style = { font: '20px Arial', fill: '#fff' };

    // Display the score in the top left corner
    this.scoreText = this.add.text(20, 20, 'score: ' + this.score, style);
    this.arrow = this.input.keyboard.createCursorKeys();
  }
  update() {
    // Collider so that the platforms are solid ground for the player
    this.physics.add.collider(this.player, this.platforms);
    this.player.body.velocity.x = 0;
    /*
    if (this.player.body.velocity.x > 50) {
      this.player.body.velocity.x -= 3;
    } else if (this.player.body.velocity.x < -50) {
      this.player.body.velocity.x += 3;
    }*/

    // If the player is overlapping with the coin
    if (this.physics.overlap(this.player, this.coin)) {
      this.hit();
      this.coinSound.play();
      if (this.arrow.up.isDown) {
        this.player.setVelocity(0, -180);
        this.jumpSound.play();
      }
    }
    
    // Handle horizontal movements
    if (this.arrow.right.isDown) {
      // If the right arrow is pressed, move to the right
      this.player.body.velocity.x += 100;
    } else if (this.arrow.left.isDown) {
    // If the left arrow is pressed, move to the left
      this.player.body.velocity.x -= 100;
    } 

    //vertical movements
    if (this.arrow.down.isDown) {
      this.player.body.velocity.y += 3;
    } else if (this.arrow.up.isDown) {
      if (this.player.body.onFloor() || this.player.body.touching.down) {
        //this.player.y -= 30;
        this.player.body.velocity.y = -180;
        this.jumpSound.play();
      }
      //this.jumpSound.play();
      //setTimeout(() => {this.jumpSound.stop(); }, 100)
    } 
  }
  hit() {
    // Change the position x and y of the coin randomly, while making sure the coin can still be grabbed. This is just for the test level, as the coins will be placed in specific locations in the levels
    this.coin.x = Phaser.Math.Between(300, 900);
    this.coin.y = Phaser.Math.Between(430, 520);
    
    if (this.arrow.up.isDown){
      // Increment the score by 5
    this.score += 5;
    } else {
    // Increment the score by 10
    this.score += 10;
    }
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




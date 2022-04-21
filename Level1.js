class Level1 extends Phaser.Scene {
  constructor() {
    super("Level1");
  }
  preload() {
  this.load.image('Background1', 'assets/background_final.png');

  }
  create() {
    this.background = this.add.image(0,0,'Background1');
    this.background.setOrigin(0,0);
    this.coin = this.physics.add.sprite(645, 357, 'coin');
    this.bloo = this.physics.add.sprite(50, 500, 'bloo');
    this.bloo.body.collideWorldBounds = true;
    this.bloo.body.gravity.y = 150;
    this.redd = this.physics.add.sprite(769, 407, 'redd');
    this.redd.body.collideWorldBounds = true;
    this.redd.body.gravity.y = 150;
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

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

    // walls

    this.walls = this.physics.add.staticGroup();
    this.walls.setOrigin(0,0);
    this.walls.create(115,486,'wall');
    this.walls.create(115,358,'wall');
    this.walls.create(115,230,'wall');
    this.walls.create(810,310,'wall');
    this.walls.create(810,438,'wall');
    this.walls.create(574,398,'wall');
    this.walls.create(731,398,'wall');

    // platforms

    this.platforms = this.physics.add.staticGroup();
    this.platforms.setOrigin(0,0);
    this.platforms.create(116,452,'platform');
    this.platforms.create(116,344,'platform');
    this.platforms.create(116,246,'platform');
    this.platforms.create(244,246,'platform');
    this.platforms.create(372,246,'platform');
    this.platforms.create(500,246,'platform');
    this.platforms.create(628,246,'platform');
    this.platforms.create(756,246,'platform');
    this.platforms.create(372,452,'platform');
    this.platforms.create(500,452,'platform');
    this.platforms.create(628,452,'platform');
    this.platforms.create(756,452,'platform');
    this.platforms.create(244,344,'platform');
    this.platforms.create(500,344,'platform');

    // barriers
    //this.blueBarriers = this.physics.add.staticGroup();
  
    //this.blueBarriers.create(244,452,'blueBarrier');

    this.redBarriers = this.physics.add.staticGroup();

    this.redBarriers.create(810,526,'redBarrier');
    //score
    this.score === this.game.config.globalScore;

    let style = { font: '20px Arial', fill: '#000' };

    // Display the score in the top left corner
    this.scoreText = this.add.text(10, 10, 'score: ' + this.score, style);
    this.arrow = this.input.keyboard.createCursorKeys();

    this.test = -1000;
  }
  update() {
    this.test += 1;
    if (this.test > 90 && this.score > 0) {
      this.score -= 1;
      this.test -= 90;
      this.scoreText.setText('score: ' + this.score);
    }
    // Collider so that the platforms and walls are solid ground for the player characters
    this.physics.add.collider(this.bloo, this.platforms);
    this.physics.add.collider(this.bloo, this.walls);
    this.bloo.body.velocity.x = 0;
    this.physics.add.collider(this.redd, this.platforms);
    this.physics.add.collider(this.redd, this.walls);
    this.redd.body.velocity.x = 0;

    // Collider for barriers
    this.physics.add.collider(this.redd, this.blueBarriers);
    this.physics.add.collider(this.bloo, this.redBarriers);

    // If the red player is overlapping with the coin
    if (this.physics.overlap(this.redd, this.coin)) {
      this.hit();
      this.coinSound.play();
      if (this.arrow.up.isDown) {
        this.redd.setVelocity(0, -180);
        this.jumpSound.play();
      }
    }
    
    // Handle horizontal movements
    if (this.arrow.right.isDown) {
      // If the right arrow is pressed, move to the right
      this.redd.body.velocity.x += 100;
    } else if (this.arrow.left.isDown) {
    // If the left arrow is pressed, move to the left
      this.redd.body.velocity.x -= 100;
    } 
    if (this.keyD.isDown) {
      // If the D key is pressed, move to the right
      this.bloo.body.velocity.x += 100;
    } else if (this.keyA.isDown) {
    // If the A key is pressed, move to the left
      this.bloo.body.velocity.x -= 100;
    }


    //vertical movements
    if (this.arrow.down.isDown) {
      this.redd.body.velocity.y += 3;
    } else if (this.arrow.up.isDown) {
      if (this.redd.body.onFloor() || this.redd.body.touching.down) {
        this.redd.body.velocity.y = -190;
        this.jumpSound.play();
      }
    }
    if (this.keyS.isDown) {
      this.bloo.body.velocity.y += 3;
    } else if (this.keyW.isDown) {
      if (this.bloo.body.onFloor() || this.bloo.body.touching.down) {
        this.bloo.body.velocity.y = -190;
        this.jumpSound.play();
      }
    }
    // move to next scene (level 1)
    if (this.physics.overlap(this.redd, this.bloo)) {
      this.scene.start("Level2");
    }
  }
  hit() {
    // Change the position x and y of the coin randomly, while making sure the coin can still be grabbed. This is just for the test level, as the coins will be placed in specific locations in the levels
    //this.coin.x = Phaser.Math.Between(300, 900);
    //this.coin.y = Phaser.Math.Between(430, 520);
    this.coin.destroy();
    
    if (this.arrow.up.isDown){
      // Increment the score by 5
    this.score += 50;
    } else {
    // Increment the score by 10
    this.score += 100;
    }
    // Display the updated score on the screen
    this.scoreText.setText('score: ' + this.score);

    this.tweens.add({
      targets: this.redd, 
      duration: 200, 
      scaleX: 1.5, 
      scaleY: 1.5, 
      yoyo: true,  
    });
  }
}




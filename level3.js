class Level3 extends Phaser.Scene {
  constructor() {
    super("Level3");
  }
  preload() {

  }
  create() {
    this.background = this.add.image(0,0,'Background1');
    this.background.setOrigin(0,0);
    this.coin = this.physics.add.sprite(16, 312, 'coin');
    this.bloo = this.physics.add.sprite(898, 507, 'bloo');
    this.bloo.body.collideWorldBounds = true;
    this.bloo.body.gravity.y = 150;
    this.redd = this.physics.add.sprite(5, 66, 'redd');
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
    this.walls.create(320,486,'wall');
    this.walls.create(320,390,'wall');


    // platforms

    this.platforms = this.physics.add.staticGroup();
    this.platforms.setOrigin(0,0);
    this.platforms.create(64,138,'platform');
    this.platforms.create(192,138,'platform');
    this.platforms.create(320,138,'platform');
    this.platforms.create(448,138,'platform');
    this.platforms.create(576,138,'platform');
    this.platforms.create(704,138,'platform');
    this.platforms.create(832,138,'platform');
    this.platforms.create(886,228,'platform');
    this.platforms.create(758,228,'platform');
    this.platforms.create(630,228,'platform');
    this.platforms.create(502,228,'platform');
    this.platforms.create(246,228,'platform');
    this.platforms.create(64,228,'platform');
    this.platforms.create(64,336,'platform');
    this.platforms.create(374,336,'platform');
    this.platforms.create(502,336,'platform');
    this.platforms.create(630,336,'platform');
    this.platforms.create(758,336,'platform');
    this.platforms.create(886,450,'platform');
    this.platforms.create(758,450,'platform');
    this.platforms.create(630,450,'platform');
    this.platforms.create(502,450,'platform');
    this.platforms.create(246,426,'platform');
    this.platforms.create(64,500,'platform');

    // barriers
    this.blueBarriers = this.physics.add.staticGroup();
  
    this.blueBarriers.create(886,336,'blueBarrier');

    this.redBarriers = this.physics.add.staticGroup();

    this.redBarriers.create(118,282,'redBarrier');
    this.redBarriers.create(556,282,'redBarrier');
    //score

    let style = { font: '20px Arial', fill: '#000' };

    // Display the score in the top left corner
    this.scoreText = this.add.text(10, 10, 'score: ' + score, style);
    this.arrow = this.input.keyboard.createCursorKeys();

    this.test = -1000;
  }
  update() {
    this.test += 1;
    if (this.test > 90 && score > 0) {
      score -= 1;
      this.test -= 90;
      this.scoreText.setText('score: ' + score);
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
      this.scene.start("end");
    }
  }
  hit() {
    // Change the position x and y of the coin randomly, while making sure the coin can still be grabbed. This is just for the test level, as the coins will be placed in specific locations in the levels
    //this.coin.x = Phaser.Math.Between(300, 900);
    //this.coin.y = Phaser.Math.Between(430, 520);
    this.coin.destroy();
    
    if (this.arrow.up.isDown){
      // Increment the score by 5
    score += 50;
    } else {
    // Increment the score by 10
    score += 100;
    }
    // Display the updated score on the screen
    this.scoreText.setText('score: ' + score);

    this.tweens.add({
      targets: this.redd, 
      duration: 200, 
      scaleX: 1.5, 
      scaleY: 1.5, 
      yoyo: true,  
    });
  }
}




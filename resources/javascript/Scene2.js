class Scene2 extends Phaser.Scene {
  constructor() {
    super("playGame");
  }

  create() {
    this.background = this.add.image(0,0,"testBackground");
    this.background.setOrigin(0,0);

    this.character = this.add.image(config.width/2, config.height/2, "testCharacter");

    this.add.text(20, 20, "Test", {font: "25px Arial", fill: "red"});

    //cursors = this.input.keyboard.createCursorKeys();
  }

  //this resets the character's position to the top of the screen
  resetCharPos(character) {
    character.y = 0;
  }

  //this will pull the character downwards toward the bottom of the screen
  testGrav(character, speed) {
    character.y += speed;
    if (character.y > config.height) {
      this.resetCharPos(character);
    }
  }

  update() {
    /* *User Input still a Work in progress, commented out so that Phaser window Displays*
    if (cursors.left.isDown) {
    character.setVelocityX(-160);

    } else if (cursors.right.isDown) {
      character.setVelocityX(160);

    } else {
      character.setVelocityX(0);

    }

    if (cursors.up.isDown && character.body.touching.down) {
      character.setVelocityY(-330);
    }*/

    this.testGrav(this.character, 1);
  }
}
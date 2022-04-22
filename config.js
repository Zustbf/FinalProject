var score;
new Phaser.Game({
  width: 950, 
  height: 550, 
  backgroundColor: '#3498db', 
  scene: [preloadGame, mainScene, introScene, tutorial, Level1, Level2, Level3, endScene], 
  physics: { default: 'arcade',
    //arcade: {debug: true} 
  }, 
  parent: 'game', 
  pixelArt: true
});
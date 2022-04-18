new Phaser.Game({
  width: 950, 
  height: 550, 
  backgroundColor: '#3498db', 
  scene: [preloadGame, mainScene], 
  physics: { default: 'arcade',
    arcade: {debug: true} 
  }, 
  parent: 'game', 
  pixelArt: true
});
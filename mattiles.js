//import Phaser from "phaser";
import GameScene from "./GameScene.js";
import PreloadScene from "./PreloadScene.js";
import BootScene from "./BootScene.js";
import LevelSelectScene from "./LevelSelectScene.js";
const config = {
  type: Phaser.AUTO,
  scale: {
    parent: "game-container",
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1280,
    height: 720
  },
  backgroundColor: "#FFF",
  parent: "game-container",
  scene: [BootScene, PreloadScene, LevelSelectScene, GameScene],
  audio: {
    disableWebAudio: true
  }
};

const game = new Phaser.Game(config);

//naming the scenes
var bootScene = new BootScene();
var gameScene = new GameScene();
//var titleScene = new TitleScene();
var preloadScene = new PreloadScene();

// load scenes
game.scene.add("bootScene", bootScene);
game.scene.add("preloadScene", preloadScene);
//game.scene.add('titleScene', titleScene);
game.scene.add("game", gameScene);

// start title
game.scene.start("preloadScene");

//TODO function isLevelComplete()

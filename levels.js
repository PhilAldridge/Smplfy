class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
  }

  preload() {
    this.load.image("logo", "./assets/images/logo.png");
    this.load.image("bg", "./assets/images/parkbg.png");
    this.load.spritesheet("titlebutton", "./assets/images/ui-titlebutton.png", {
      frameWidth: 372,
      frameHeight: 137
    });
    this.load.spritesheet("progressbar", "./assets/images/ui-progressbar.png", {
      frameWidth: 523,
      frameHeight: 76
    });
    this.load.on("complete", this.complete, { scene: this.scene });
  }

  complete() {
    this.scene.start("PreloadScene");
  }
}

export default BootScene;

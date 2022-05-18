import { deleteFromMultiplication, deleteFromAddition, createBasicTile } from "./mattiles.js";
import {
  primeFactorise,
  dragEndCheck,
  splitNegatives,
  levelCompleteCheck
} from "./useractions.js";
import { rerenderTiles } from "./tilepositioning.js";
import { setUpLevel } from "./levels.js";
import { setCookie } from "./cookieHelper.js";

class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  create(data) {
    this.anims.create({
      key: "bear1",
      frames: "bear",
      frameRate: 15,
      repeat: -1
    });
    this.anims.create({
      key: "cat1",
      frames: "cat",
      frameRate: 11,
      repeat: -1
    });
    this.anims.create({ key: "fox1", frames: "fox", frameRate: 7, repeat: -1 });
    this.anims.create({
      key: "rabbit1",
      frames: "rabbit",
      frameRate: 7,
      repeat: -1
    });
    var levelsCompleted = this.registry.get("levelsCompleted");
    var nextLevel = false;
    var level = 0;
    var subLevel = 0;
    if (data.level !== undefined) {
      level = data.level;
      subLevel = data.subLevel;
    }

    const { width, height } = this.sys.game.config;
    const completedDelay = 500;
    this.width = width;
    this.height = height;
    var scaleFactor = 1;
    this.simplebleep = this.sound.add("simplebleep");
    this.longbleep = this.sound.add("longbleep");
    this.levelcompletesound = this.sound.add("levelcomplete");

    if (this.sound.get("music") === null) {
      this.music = this.sound.add("music", { loop: true, volume: 0.6 });
      this.music.play();
    }
    this.add.image(width / 2, height / 2, "bg");

    var fullscreenButton = this.add
      .image(width - 16, 16, "fullscreen", 0)
      .setOrigin(1, 0)
      .setInteractive()
      .setScale(0.6);

    fullscreenButton.on(
      "pointerup",
      function () {
        if (this.scale.isFullscreen) {
          fullscreenButton.setFrame(0);

          this.scale.stopFullscreen();
        } else {
          fullscreenButton.setFrame(1);

          this.scale.startFullscreen();
        }
      },
      this
    );

    var menuButton = this.add
      .image(50, 40, "ui-smallicons", 4)
      .setDisplaySize(90, 98);
    menuButton.setInteractive();
    menuButton.on("pointerdown", () => {
      this.music.destroy();
      this.scene.start("LevelSelectScene", { level: level });
    });

    var resetButton = this.add
      .image(145, 40, "ui-smallicons", 1)
      .setDisplaySize(90, 98);
    resetButton.setInteractive();
    resetButton.on("pointerdown", () => {
      this.scene.start("GameScene", { level: level, subLevel: subLevel });
    });

    this.soundButton = this.add
      .image(240, 40, "ui-smallicons", 6)
      .setDisplaySize(90, 98);
    this.soundButton.setInteractive();
    this.soundButton.on("pointerdown", () => {
      this.sound.mute = !this.sound.mute;
      if (this.sound.mute) {
        this.soundButton.setFrame(5);
      } else {
        this.soundButton.setFrame(6);
      }
    });

    this.input.on("pointerover", function () {});

    this.input.on("pointerout", function () {});

    this.input.on("drag", function (pointer, gameObject, dragX, dragY) {
      //need to adjust dragXY to fit scaling of the mat
      gameObject.x =
        gameObject.data.values.prevx +
        (dragX - gameObject.data.values.prevx) / Math.min(scaleFactor, 1);
      gameObject.y =
        gameObject.data.values.prevy +
        (dragY - gameObject.data.values.prevy) / Math.min(scaleFactor, 1);

      //if draggable it will have the drag bounds in its data
      if (gameObject.data !== null) {
        if (gameObject.x < gameObject.data.values.minx) {
          gameObject.x = gameObject.data.values.minx;
        } else if (gameObject.x > gameObject.data.values.maxx) {
          gameObject.x = gameObject.data.values.maxx;
        }
        if (gameObject.y < gameObject.data.values.miny) {
          gameObject.y = gameObject.data.values.miny;
        } else if (gameObject.y > gameObject.data.values.maxy) {
          gameObject.y = gameObject.data.values.maxy;
        }
      }
    });

    this.input.on("dragstart", function (pointer, gameObject) {
      //save initial position and index within its container
      gameObject.data.set({
        prevIndex: gameObject.data.values.parent.getIndex(gameObject),
        prevx: gameObject.x,
        prevy: gameObject.y
      });

      scaleFactor = Math.min((width * 0.95) / mat.width, 1);

      //bring to top of container
      gameObject.data.values.parent.bringToTop(gameObject);
    });

    this.input.on("dragend", function (pointer, gameObject) {
      //TODO big function checkForActions

      if (dragEndCheck(gameObject, this.scene, mat)) {
        rerenderTiles(mat, this.scene);
        if (levelCompleteCheck(mat, target)) {
          levelsCompleted[level].subLevelsCompleted[subLevel] = 1;
          this.scene.registry.set("levelsCompleted", levelsCompleted);
          const levelReached = level + subLevel / 100;

          if (levelReached > this.scene.registry.get("levelsReached")) {
            this.scene.registry.set("levelsReached", levelReached);
            setCookie("levelsReached", levelReached, 365);
           $.post('updatelvl.php',{levelReached:levelReached, id:id});
          }
          if (
            subLevel >=
            levelsCompleted[level].subLevelsCompleted.length - 1
          ) {
            nextLevel = true;
          }
          setTimeout(() => {
            this.scene.levelComplete(level, subLevel, nextLevel);
          }, completedDelay);
        }
        return;
      } else {
        //put back in original index of container
        gameObject.data.values.parent.moveTo(
          gameObject,
          gameObject.data.values.prevIndex
        );

        //return to initial condition
        gameObject.x = gameObject.data.values.prevx;
        gameObject.y = gameObject.data.values.prevy;
      }
    });

    //TODO
    //on click, if 0 in addition or multiplication or 1 in multiplication, remove
    let lastTime = 0;
    this.input.on("pointerdown", (pointer, gameObject) => {
      let clickDelay = this.time.now - lastTime;
      lastTime = this.time.now;

      if (clickDelay < 350) {
        if (
          gameObject[0] !== undefined &&
          gameObject[0].data !== null &&
          gameObject[0].data !== undefined
        ) {
          const value = parseInt(gameObject[0].data.values.value, 10);
          if (
            value === 1 &&
            gameObject[0].data.values.parent.data.values.type === "multiply"
          ) {
            deleteFromMultiplication(gameObject[0], this, mat);
            this.simplebleep.play();
          } else if (value === 0) {
            if (
              gameObject[0].data.values.parent.data.values.type === "addition"
            ) {
              deleteFromAddition(gameObject[0], this, mat);
              this.simplebleep.play();
            } else if (
              gameObject[0].data.values.parent.data.values.type === "multiply"
            ) {
              gameObject[0].data.values.parent.data.values.parent.replace(
                gameObject[0].data.values.parent,
                createBasicTile(
                  this,
                  gameObject[0].data.values.parent.data.values.parent,
                  "0"
                ),
                true
              );
              this.simplebleep.play();
              rerenderTiles(mat, this);
            }
          } else if (Number.isInteger(value) && value > 3) {
            primeFactorise(gameObject[0], mat, this);
            this.simplebleep.play();
          } else if (gameObject[0].data.values.negative && value !== -1) {
            splitNegatives(gameObject[0], mat, this);
            this.simplebleep.play();
          }
        }
        rerenderTiles(mat, this);
        if (levelCompleteCheck(mat, target)) {
          levelsCompleted[level].subLevelsCompleted[subLevel] = 1;
          if (
            subLevel >=
            levelsCompleted[level].subLevelsCompleted.length - 1
          ) {
            nextLevel = true;
          }
          this.registry.set("levelsCompleted", levelsCompleted);
          const levelReached = level + subLevel / 100;

          if (levelReached > this.registry.get("levelsReached")) {
            this.registry.set("levelsReached", levelReached);
            setCookie("levelsReached", levelReached, 365);
            $.post('updatelvl.php',{levelReached:levelReached, id:id});
          }
          setTimeout(() => {
            this.levelComplete(level, subLevel, nextLevel);
          }, completedDelay);
        }
      }
    });

    var mat = this.add.container();
    mat.x = width / 2;
    mat.y = height / 2;
    var target = this.add.container();
    target.x = 1020;
    target.y = 620;

    const targetText = this.add
      .text(0, 0, "Target: ", {
        fontFamily: "Gabriola",
        fontSize: 64
      })
      .setOrigin(1, 0);

    setUpLevel(mat, target, this, level, subLevel);
    const targetScale = Math.min(1, 500 / target.width, 120 / target.height);
    target.setScale(targetScale);
    targetText.setPosition(1000 - (target.width * targetScale) / 2, 620);
  }

  levelComplete(level, sublevel, nextLevel) {
    this.levelcompletesound.play();
    if (nextLevel) {
      level++;
      sublevel = -1;
    }
    var completeContainer = this.add.container();
    const grey = this.add.graphics();
    grey.fillStyle(0x000000, 0.7);
    grey.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
    completeContainer.setPosition(this.width / 2, this.height / 2);
    var menuButton = this.add.image(-100, 40, "ui-smallicons", 4);
    menuButton.setInteractive();
    menuButton.on("pointerdown", () => {
      this.music.destroy();
      this.scene.start("LevelSelectScene", { level: level });
    });

    var nextButton = this.add.image(100, 30, "ui-leftright", 1);
    nextButton.setInteractive();
    nextButton.on("pointerdown", () => {
      this.scene.start("GameScene", { level: level, subLevel: sublevel + 1 });
    });

    completeContainer.add([
      grey,
      this.add.image(0, 0, "backboard"),
      this.add
        .text(0, -100, "Congratulations!\n  Level Complete", {
          fontFamily: "Gabriola",
          fontSize: 72,
          color: this.registry.get("buttonTextColor")
        })
        .setOrigin(0.5, 0.5),
      this.add
        .text(-100, 130, "Main\nmenu", {
          fontFamily: "Gabriola",
          fontSize: 40,
          color: this.registry.get("buttonTextColor")
        })
        .setOrigin(0.5, 0.5),
      this.add
        .text(100, 130, "Next\nlevel", {
          fontFamily: "Gabriola",
          fontSize: 40,
          color: this.registry.get("buttonTextColor")
        })
        .setOrigin(0.5, 0.5),
      menuButton,
      nextButton,
      this.add.sprite(-400, -270).setScale(1.3).play("bear1"),
      this.add.sprite(400, -270).setScale(1.3).play("fox1"),
      this.add.sprite(-400, 270).setScale(1.3).play("rabbit1"),
      this.add.sprite(400, 270).setScale(1.3).play("cat1")
    ]);
  }
}

export default GameScene;

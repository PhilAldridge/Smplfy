import {
  createMultiplyContainer,
  createAdditionTile,
  disableInteractive
} from "./mattiles.js";
import { rerenderTiles } from "./tilepositioning.js";

export function setUpLevel(mat, target, scene, level, sublevel) {
  mat.removeAll(true);
  mat.setDataEnabled();
  mat.add(scene.add.graphics());
  mat.name = "mat";

  target.removeAll(true);
  target.setDataEnabled();
  target.add(scene.add.graphics());
  target.name = "target";
  makeLevel[level][sublevel](mat, target, scene);

  rerenderTiles(mat, scene);
  rerenderTiles(target, scene);
  rerenderTiles(target, scene);

  disableInteractive(target);
}

const makeLevel = [
  [
    //0a - adding 0
    (mat, target, scene) => {
      var temp = createAdditionTile(["3", "0"], mat, scene);
      mat.add(temp);
      temp = createAdditionTile(["3"], target, scene);
      target.add(temp);
      var exampleContainer = exampleBox(scene, "Adding 0", "Double tap the 0");
      const firstTerm = scene.add.image(-120, 0, "numberspos", 3);
      const secondTerm = scene.add.image(120, 0, "numberspos", 0);
      const hand = scene.add.image(300, 100, "hand");
      const plus = scene.add.image(0, 0, "plus");
      scene.tweens.timeline({
        ease: "power2",
        duration: 1500,
        loop: -1,
        tweens: [
          {
            targets: hand,
            x: 120,
            y: 0,
            offset: 1000
          },
          {
            targets: [secondTerm, plus],
            x: 2000,
            offset: 3000,
            duration: 0
          },
          {
            targets: firstTerm,
            x: 0,
            offset: 3000
          },
          {
            targets: secondTerm,
            x: 120,
            offset: 5500,
            duration: 0
          },
          {
            targets: plus,
            x: 0,
            offset: 5500,
            duration: 0
          },
          {
            targets: firstTerm,
            x: -120,
            offset: 5500,
            duration: 0
          },
          {
            targets: hand,
            x: 300,
            y: 100,
            offset: 5500,
            duration: 0
          }
        ]
      });
      exampleContainer.add([firstTerm, secondTerm, plus, hand]);
    },
    (mat, target, scene) => {
      var temp = createAdditionTile(["0", "x0", "4"], mat, scene);
      mat.add(temp);
      temp = createAdditionTile(["x0", "4"], target, scene);
      target.add(temp);
    },
    (mat, target, scene) => {
      var temp = createAdditionTile(["0", "0", "4"], mat, scene);
      mat.add(temp);
      temp = createAdditionTile(["4"], target, scene);
      target.add(temp);
    },
    (mat, target, scene) => {
      var temp = createAdditionTile(["0", "x1", "0", "0"], mat, scene);
      mat.add(temp);
      temp = createAdditionTile(["x1"], target, scene);
      target.add(temp);
    },
    (mat, target, scene) => {
      var temp = createAdditionTile(["0", "6", "0", "x2"], mat, scene);
      mat.add(temp);
      temp = createAdditionTile(["6", "x2"], target, scene);
      target.add(temp);
    }
  ],
  //1 - Zero pairs
  [
    (mat, target, scene) => {
      var temp = createAdditionTile(["x0", "-x0"], mat, scene);
      mat.add(temp);
      temp = createAdditionTile(["0"], target, scene);
      target.add(temp);

      var exampleContainer = exampleBox(
        scene,
        "Zero Pairs",
        "Drag a tile on to its negative"
      );
      const firstTerm = scene.add.image(-120, 0, "letterspos", 0);
      const secondTerm = scene.add.image(120, 0, "lettersneg", 0);
      const thirdTerm = scene.add.image(2000, 0, "numberspos", 0);
      const hand = scene.add.image(300, 100, "hand");
      const plus = scene.add.image(0, 0, "plus");
      scene.tweens.timeline({
        ease: "power2",
        duration: 1500,
        loop: -1,
        tweens: [
          {
            targets: hand,
            x: 120,
            y: 0,
            offset: 1000
          },
          {
            targets: [secondTerm, hand],
            x: -120,
            offset: 3000,
            duration: 700
          },
          {
            targets: [firstTerm, secondTerm, plus],
            x: 2000,
            offset: 4000,
            duration: 0
          },
          {
            targets: thirdTerm,
            x: -120,
            offset: 4000,
            duration: 0
          },
          {
            targets: plus,
            x: 0,
            offset: 5000,
            duration: 0
          },
          {
            targets: firstTerm,
            x: -120,
            offset: 5000,
            duration: 0
          },
          {
            targets: secondTerm,
            x: 120,
            offset: 5000,
            duration: 0
          },
          {
            targets: hand,
            x: 300,
            y: 100,
            offset: 5000,
            duration: 0
          },
          {
            targets: thirdTerm,
            x: 2000,
            offset: 5000,
            duration: 0
          }
        ]
      });
      exampleContainer.add([firstTerm, secondTerm, thirdTerm, plus, hand]);
    },
    (mat, target, scene) => {
      var temp = createAdditionTile(["-x1", "3", "x1"], mat, scene);
      mat.add(temp);
      temp = createAdditionTile(["3"], target, scene);
      target.add(temp);
    },
    (mat, target, scene) => {
      var temp = createAdditionTile(["x0", "3", "x1", "-3", "-x0"], mat, scene);
      mat.add(temp);
      temp = createAdditionTile(["x1"], target, scene);
      target.add(temp);
    },
    (mat, target, scene) => {
      var temp = createAdditionTile(["-10", "x0", "10", "5"], mat, scene);
      mat.add(temp);
      temp = createAdditionTile(["x0", "5"], target, scene);
      target.add(temp);
    },
    (mat, target, scene) => {
      var temp = createAdditionTile(
        ["-4", "x0", "0", "-x1", "-x0"],
        mat,
        scene
      );
      mat.add(temp);
      temp = createAdditionTile(["-4", "-x1"], target, scene);
      target.add(temp);
    }
  ],
  //2 Commutative Addition
  [
    (mat, target, scene) => {
      var temp = createAdditionTile(["x0", "3"], mat, scene);
      mat.add(temp);
      temp = createAdditionTile(["3", "x0"], target, scene);
      target.add(temp);

      var exampleContainer = exampleBox(
        scene,
        "Commuting",
        "Drag a tile on to an unlike term"
      );
      const firstTerm = scene.add.image(-120, 0, "letterspos", 0);
      const secondTerm = scene.add.image(120, 0, "numberspos", 3);
      const hand = scene.add.image(300, 100, "hand");
      const plus = scene.add.image(0, 0, "plus");
      scene.tweens.timeline({
        ease: "power2",
        duration: 1500,
        loop: -1,
        tweens: [
          {
            targets: hand,
            x: 120,
            y: 0,
            offset: 1000
          },
          {
            targets: [secondTerm, hand],
            x: -120,
            offset: 3000,
            duration: 700
          },
          {
            targets: firstTerm,
            x: 120,
            offset: 4000,
            duration: 700
          },
          {
            targets: firstTerm,
            x: -120,
            offset: 5000,
            duration: 0
          },
          {
            targets: secondTerm,
            x: 120,
            offset: 5000,
            duration: 0
          },
          {
            targets: hand,
            x: 300,
            y: 100,
            offset: 5000,
            duration: 0
          }
        ]
      });
      exampleContainer.add([firstTerm, secondTerm, plus, hand]);
    },
    (mat, target, scene) => {
      var temp = createAdditionTile(["x0", "3", "x1"], mat, scene);
      mat.add(temp);
      temp = createAdditionTile(["3", "x1", "x0"], target, scene);
      target.add(temp);
    },
    (mat, target, scene) => {
      var temp = createAdditionTile(["x0", "x1", "3", "-x0"], mat, scene);
      mat.add(temp);
      temp = createAdditionTile(["3", "x1"], target, scene);
      target.add(temp);
    },
    (mat, target, scene) => {
      var temp = createAdditionTile(["11", "5", "-11", "-x0"], mat, scene);
      mat.add(temp);
      temp = createAdditionTile(["-x0", "5"], target, scene);
      target.add(temp);
    },
    (mat, target, scene) => {
      var temp = createAdditionTile(["x3", "x2", "-x3", "9", "x3"], mat, scene);
      mat.add(temp);
      temp = createAdditionTile(["9", "x2", "x3"], target, scene);
      target.add(temp);
    }
  ],

  //3 - Adding numbers
  [
    (mat, target, scene) => {
      var temp = createAdditionTile(["3", "5"], mat, scene);
      mat.add(temp);
      temp = createAdditionTile(["8"], target, scene);
      target.add(temp);

      var exampleContainer = exampleBox(
        scene,
        "Adding numbers",
        "Drag a number on to another number"
      );
      const firstTerm = scene.add.image(-120, 0, "numberspos", 3);
      const secondTerm = scene.add.image(120, 0, "numberspos", 5);
      const thirdTerm = scene.add.image(2000, 0, "numberspos", 8);
      const hand = scene.add.image(300, 100, "hand");
      const plus = scene.add.image(0, 0, "plus");
      scene.tweens.timeline({
        ease: "power2",
        duration: 1500,
        loop: -1,
        tweens: [
          {
            targets: hand,
            x: 120,
            y: 0,
            offset: 1000
          },
          {
            targets: [secondTerm, hand],
            x: -120,
            offset: 3000,
            duration: 700
          },
          {
            targets: [firstTerm, secondTerm, plus],
            x: 2000,
            offset: 4000,
            duration: 0
          },
          {
            targets: thirdTerm,
            x: -120,
            offset: 4000,
            duration: 0
          },
          {
            targets: plus,
            x: 0,
            offset: 5000,
            duration: 0
          },
          {
            targets: firstTerm,
            x: -120,
            offset: 5000,
            duration: 0
          },
          {
            targets: secondTerm,
            x: 120,
            offset: 5000,
            duration: 0
          },
          {
            targets: hand,
            x: 300,
            y: 100,
            offset: 5000,
            duration: 0
          },
          {
            targets: thirdTerm,
            x: 2000,
            offset: 5000,
            duration: 0
          }
        ]
      });
      exampleContainer.add([firstTerm, secondTerm, thirdTerm, plus, hand]);
    },
    (mat, target, scene) => {
      var temp = createAdditionTile(["3", "2", "-3", "9", "3"], mat, scene);
      mat.add(temp);
      temp = createAdditionTile(["14"], target, scene);
      target.add(temp);
    },
    (mat, target, scene) => {
      var temp = createAdditionTile(["x3", "11", "-x3", "x0", "4"], mat, scene);
      mat.add(temp);
      temp = createAdditionTile(["x0", "15"], target, scene);
      target.add(temp);
    },
    (mat, target, scene) => {
      var temp = createAdditionTile(["-4", "x3", "-x3", "2", "x3"], mat, scene);
      mat.add(temp);
      temp = createAdditionTile(["x3", "-2"], target, scene);
      target.add(temp);
    },
    (mat, target, scene) => {
      var temp = createAdditionTile(["-9", "3", "11", "-5"], mat, scene);
      mat.add(temp);
      temp = createAdditionTile(["0"], target, scene);
      target.add(temp);
    }
  ],

  //4 - Multiplying numbers
  [
    (mat, target, scene) => {
      var temp = createMultiplyContainer(["5", "3"], mat, scene);
      mat.add(temp);
      temp = createAdditionTile(["15"], target, scene);
      target.add(temp);

      var exampleContainer = exampleBox(
        scene,
        "Multiplying numbers",
        "Drag a number on to another number"
      );
      const firstTerm = scene.add.image(-75, 0, "numberspos", 3);
      const secondTerm = scene.add.image(75, 0, "numberspos", 5);
      const thirdTerm = scene.add.image(2000, 0, "numberspos", 15);
      const hand = scene.add.image(300, 100, "hand");
      var dot = scene.add.graphics();
      dot.fillStyle(0x000000, 1);
      dot.fillCircle(0, 0, 7);
      scene.tweens.timeline({
        ease: "power2",
        duration: 1500,
        loop: -1,
        tweens: [
          {
            targets: hand,
            x: 75,
            y: 0,
            offset: 1000
          },
          {
            targets: [secondTerm, hand],
            x: -75,
            offset: 3000,
            duration: 700
          },
          {
            targets: [firstTerm, secondTerm, dot],
            x: 2000,
            offset: 4000,
            duration: 0
          },
          {
            targets: thirdTerm,
            x: -75,
            offset: 4000,
            duration: 0
          },
          {
            targets: dot,
            x: 0,
            offset: 5000,
            duration: 0
          },
          {
            targets: firstTerm,
            x: -75,
            offset: 5000,
            duration: 0
          },
          {
            targets: secondTerm,
            x: 75,
            offset: 5000,
            duration: 0
          },
          {
            targets: hand,
            x: 300,
            y: 100,
            offset: 5000,
            duration: 0
          },
          {
            targets: thirdTerm,
            x: 2000,
            offset: 5000,
            duration: 0
          }
        ]
      });
      exampleContainer.add([firstTerm, secondTerm, thirdTerm, dot, hand]);
    },
    (mat, target, scene) => {
      var temp = createMultiplyContainer(["2", "3", "2"], mat, scene);
      mat.add(temp);
      temp = createAdditionTile(["12"], target, scene);
      target.add(temp);
    },
    (mat, target, scene) => {
      var temp = createMultiplyContainer(["2", "-5", "1"], mat, scene);
      mat.add(temp);
      temp = createAdditionTile(["-10"], target, scene);
      target.add(temp);
    },
    (mat, target, scene) => {
      var temp = createAdditionTile(
        [createMultiplyContainer(["2", "-5", "1"], mat, scene), "x0", "4"],
        mat,
        scene
      );
      mat.add(temp);
      temp = createAdditionTile(["x0", "-6"], target, scene);
      target.add(temp);
    },
    (mat, target, scene) => {
      var temp = createAdditionTile(
        [
          createMultiplyContainer(["2", "-5", "1"], mat, scene),
          createMultiplyContainer(["5", "3"], mat, scene)
        ],
        mat,
        scene
      );
      mat.add(temp);
      temp = createAdditionTile(["5"], target, scene);
      target.add(temp);
    },
    (mat, target, scene) => {
      var temp = createMultiplyContainer(
        [createAdditionTile(["3", "2"], mat, scene), "3"],
        mat,
        scene
      );
      mat.add(temp);
      temp = createAdditionTile(["15"], target, scene);
      target.add(temp);
    },
    (mat, target, scene) => {
      var temp = createMultiplyContainer(
        ["x0", createAdditionTile(["2", "-3", "-15"], mat, scene)],
        mat,
        scene
      );
      mat.add(temp);
      temp = createMultiplyContainer(["x0", "-16"], target, scene);
      target.add(temp);
    }
  ],

  //5 - Multiplicative identity and zero
  [
    (mat, target, scene) => {
      var temp = createAdditionTile(
        [
          createMultiplyContainer(["x0", "0"], mat, scene),
          createMultiplyContainer(["x1", "1"], mat, scene)
        ],
        mat,
        scene
      );
      mat.add(temp);
      temp = createAdditionTile(["x1"], target, scene);
      target.add(temp);

      var exampleContainer = exampleBox(
        scene,
        "Multiplying by 1 and 0",
        "Double-tap the 1\nDouble-tap the 0"
      );

      const firstTerm = scene.add.image(-265, 0, "numberspos", 0);
      const secondTerm = scene.add.image(-115, 0, "letterspos", 0);
      const thirdTerm = scene.add.image(115, 0, "numberspos", 1);
      const fourthTerm = scene.add.image(265, 0, "letterspos", 1);
      const plus = scene.add.image(0, 0, "plus");
      const hand = scene.add.image(300, 100, "hand");
      var dot1 = scene.add.graphics();
      dot1.fillStyle(0x000000, 1).fillCircle(0, 0, 7).setPosition(-190, 0);
      var dot2 = scene.add.graphics();
      dot2.fillStyle(0x000000, 1).fillCircle(0, 0, 7).setPosition(190, 0);
      exampleContainer.add([
        firstTerm,
        secondTerm,
        thirdTerm,
        fourthTerm,
        dot1,
        dot2,
        plus,
        hand
      ]);

      scene.tweens.timeline({
        ease: "power2",
        duration: 1500,
        loop: -1,
        tweens: [
          {
            targets: hand,
            x: 115,
            y: 0,
            offset: 1000
          },
          {
            targets: fourthTerm,
            x: 190,
            offset: 2500
          },
          {
            targets: [thirdTerm, dot2],
            x: 2000,
            offset: 2500,
            duration: 0
          },
          {
            targets: hand,
            x: -265,
            offset: 4000
          },
          {
            targets: [firstTerm, secondTerm, dot1, plus],
            x: 2000,
            duration: 0,
            offset: 5500
          },
          {
            targets: fourthTerm,
            x: 0,
            offset: 5500
          },
          {
            targets: firstTerm,
            x: -265,
            duration: 0,
            offset: 7500
          },
          {
            targets: secondTerm,
            x: -115,
            duration: 0,
            offset: 7500
          },
          {
            targets: dot1,
            x: -190,
            duration: 0,
            offset: 7500
          },
          {
            targets: plus,
            x: 0,
            duration: 0,
            offset: 7500
          },
          {
            targets: thirdTerm,
            x: 115,
            duration: 0,
            offset: 7500
          },
          {
            targets: fourthTerm,
            x: 265,
            duration: 0,
            offset: 7500
          },
          {
            targets: dot2,
            x: 190,
            duration: 0,
            offset: 7500
          },
          {
            targets: hand,
            x: 300,
            y: 100,
            duration: 0,
            offset: 7500
          }
        ]
      });
    },
    (mat, target, scene) => {
      var temp = createMultiplyContainer(
        ["x0", createAdditionTile(["3", "-2"], mat, scene)],
        mat,
        scene
      );
      mat.add(temp);
      temp = createAdditionTile(["x0"], target, scene);
      target.add(temp);
    },
    (mat, target, scene) => {
      var temp = createAdditionTile(
        [
          "x0",
          createMultiplyContainer(
            ["x0", createAdditionTile(["x3", "-x3"], mat, scene)],
            mat,
            scene
          )
        ],
        mat,
        scene
      );
      mat.add(temp);
      temp = createAdditionTile(["x0"], target, scene);
      target.add(temp);
    },
    (mat, target, scene) => {
      var temp = createAdditionTile(
        [
          createMultiplyContainer(["-x4", "1"], mat, scene),
          "x4",
          createMultiplyContainer(["3", "x0"], mat, scene)
        ],
        mat,
        scene
      );
      mat.add(temp);
      temp = createMultiplyContainer(["x0", "3"], target, scene);
      target.add(temp);
    },
    (mat, target, scene) => {
      var temp = createAdditionTile(
        [
          createMultiplyContainer(["-x4", "1", "0", "7", "3"], mat, scene),
          "x4",
          createMultiplyContainer(
            [createAdditionTile(["2", "5", "-6"], mat, scene), "x0"],
            mat,
            scene
          )
        ],
        mat,
        scene
      );
      mat.add(temp);
      temp = createAdditionTile(["x4", "x0"], target, scene);
      target.add(temp);
    }
  ],

  //6 - splitting a negative number
  [
    (mat, target, scene) => {
      var temp = createAdditionTile(["-x0"], mat, scene);
      mat.add(temp);
      temp = createMultiplyContainer(["x0", "-1"], target, scene);
      target.add(temp);

      var exampleContainer = exampleBox(
        scene,
        "Splitting a negative",
        "Double-click a negative number"
      );
      const firstTerm = scene.add.image(0, 0, "lettersneg", 1);
      const secondTerm = scene.add.image(2000, 0, "numbersneg", 1);
      const thirdTerm = scene.add.image(2000, 0, "letterspos", 1);
      const hand = scene.add.image(300, 100, "hand");
      var dot = scene.add.graphics();
      dot.fillStyle(0x000000, 1);
      dot.fillCircle(2000, 0, 7);
      scene.tweens.timeline({
        ease: "power2",
        duration: 1500,
        loop: -1,
        tweens: [
          {
            targets: hand,
            x: 0,
            y: 0,
            offset: 1000
          },
          {
            targets: firstTerm,
            x: 2000,
            offset: 3000,
            duration: 0
          },
          {
            targets: [secondTerm,thirdTerm],
            x: 0,
            offset: 3000,
            duration: 0
          },
          {
            targets: secondTerm,
            x: -75,
            offset: 3001
          },
          {
            targets: thirdTerm,
            x: 75,
            offset: 3001
          },
          {
            targets: firstTerm,
            x: 0,
            offset: 5000,
            duration: 0
          },
          {
            targets: hand,
            x: 300,
            y: 100,
            offset: 5000,
            duration: 0
          },
          {
            targets: [secondTerm, dot, thirdTerm],
            x: 2000,
            offset: 5000,
            duration: 0
          }
        ]
      });
      exampleContainer.add([firstTerm, secondTerm, thirdTerm, dot, hand]);
    },
    (mat, target, scene) => {
      var temp = createMultiplyContainer(["-x4", "-7"], mat, scene);
      mat.add(temp);
      temp = createMultiplyContainer(["x4", "7"], target, scene);
      target.add(temp);
    },
    (mat, target, scene) => {
      var temp = createMultiplyContainer(
        ["-3", "-5", "-x3", "-x0"],
        mat,
        scene
      );
      mat.add(temp);
      temp = createMultiplyContainer(["x0", "15", "x3"], target, scene);
      target.add(temp);
    },
    (mat, target, scene) => {
      var temp = createAdditionTile(
        [createMultiplyContainer(["-x1", "-1"], mat, scene), "-x1"],
        mat,
        scene
      );
      mat.add(temp);
      temp = createAdditionTile(["0"], target, scene);
      target.add(temp);
    },
    (mat, target, scene) => {
      var temp = createAdditionTile(
        [
          createMultiplyContainer(["x0", "-1"], mat, scene),
          createMultiplyContainer(["-x0", "-1"], mat, scene),
          createMultiplyContainer(["-x0", "-5", "-x0"], mat, scene)
        ],
        mat,
        scene
      );
      mat.add(temp);
      temp = createMultiplyContainer(["x0", "-5", "x0"], target, scene);
      target.add(temp);
    }
  ],

  //7 - commuting mutliplications
  [
    (mat, target, scene) => {
      var temp = createMultiplyContainer(["x0", "x2"], mat, scene);
      mat.add(temp);
      temp = createMultiplyContainer(["x2", "x0"], target, scene);
      target.add(temp);

      var exampleContainer = exampleBox(
        scene,
        "Commuting Multiplication",
        "Drag a tile on to another"
      );
      const firstTerm = scene.add.image(-75, 0, "letterspos", 2);
      const secondTerm = scene.add.image(75, 0, "letterspos", 0);
      const hand = scene.add.image(300, 100, "hand");
      var dot = scene.add.graphics();
      dot.fillStyle(0x000000, 1);
      dot.fillCircle(0, 0, 7);
      scene.tweens.timeline({
        ease: "power2",
        duration: 1500,
        loop: -1,
        tweens: [
          {
            targets: hand,
            x: 75,
            y: 0,
            offset: 1000
          },
          {
            targets: [secondTerm, hand],
            x: -75,
            offset: 3000
          },
          {
            targets: firstTerm,
            x: 75,
            offset: 4500
          },
          {
            targets: secondTerm,
            x: 75,
            offset: 6000,
            duration: 0
          },
          {
            targets: firstTerm,
            x: -75,
            offset: 6000,
            duration: 0
          },
          {
            targets: hand,
            x: 300,
            y: 100,
            offset: 6000,
            duration: 0
          }
        ]
      });
      exampleContainer.add([firstTerm, secondTerm, dot, hand]);
    },
    (mat, target, scene) => {
      var temp = createMultiplyContainer(
        ["x0", "-x4", "x3", "3"],
        mat,
        scene
      );
      mat.add(temp);
      temp = createMultiplyContainer(["x3", "-3", "x4","x0"], target, scene);
      target.add(temp);
    },
  ]
  //8 - expanding brackets

  //9 - factorising common terms

  //10 - expanding brackets with other brackets

  //FRACTIONS!!
];

function exampleBox(scene, text, subtext) {
  var exampleContainer = scene.add.container();
  const grey = scene.add.graphics();
  grey.fillStyle(0x000000, 0.7);
  grey.fillRect(-scene.width / 2, -scene.height / 2, scene.width, scene.height);
  exampleContainer.setPosition(scene.width / 2, scene.height / 2);
  var gotItButton = scene.add.container();
  var buttonbg = scene.add.sprite(0, 0, "titlebutton", 0);
  gotItButton.add([
    buttonbg,
    scene.add
      .text(0, 0, "Got it", {
        fontFamily: "Gabriola",
        fontSize: 64,
        color: scene.registry.get("buttonTextColor")
      })
      .setOrigin(0.5, 0.6)
  ]);
  gotItButton.setSize(buttonbg.width, buttonbg.height).setPosition(280, 240);
  gotItButton.setInteractive();
  gotItButton.on("pointerdown", () => {
    buttonbg.setFrame(1);
  });
  gotItButton.on("pointerup", () => {
    exampleContainer.destroy();
    buttonbg.setFrame(1);
  });
  const magic = scene.sound.add("magic", { volume: 0.6 });
  magic.play();

  exampleContainer.add([
    grey,
    scene.add.image(0, 0, "backboard").setScale(1.5),
    scene.add
      .text(0, -250, "New Rule: " + text, {
        fontFamily: "Gabriola",
        fontSize: 72,
        color: scene.registry.get("buttonTextColor")
      })
      .setOrigin(0.5, 0.5),
    scene.add
      .text(0, -210, subtext, {
        fontFamily: "Gabriola",
        fontSize: 64,
        color: "#ffdc99"
      })
      .setOrigin(0.5, 0),
    gotItButton
  ]);

  return exampleContainer;
}

export function getLevels(levels = makeLevel) {
  console.log(levels);
}

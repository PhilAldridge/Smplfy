import { rerenderTiles } from "./tilepositioning.js";

const tileSize = 150;

//single tile creation
export function createBasicTile(scene, parent, image) {
  //xpos, ypos, spritesheet, which number in spriteSheet
  var negative = false;
  if (image.substr(0, 1) === "-") {
    negative = true;
  }

  if (Number.isInteger(parseInt(image, 10))) {
    if (!negative) {
      var tile = scene.add.sprite(0, 0, "numberspos", parseInt(image, 10));
    } else {
      var tile = scene.add.sprite(0, 0, "numbersneg", -1 * parseInt(image, 10));
    }
  } else {
    if (!negative) {
      var tile = scene.add.sprite(
        0,
        0,
        "letterspos",
        parseInt(image.substr(1, 1))
      );
    } else {
      var tile = scene.add.sprite(
        0,
        0,
        "lettersneg",
        parseInt(image.substr(2, 1))
      );
    }
  }

  tile.width = tileSize;
  tile.height = tileSize;
  tile.setInteractive();
  tile.setDataEnabled();
  scene.input.setDraggable(tile);
  tile.data.set({
    parent: parent,
    type: "simple",
    value: image,
    negative: negative
  });
  return tile;
}

export function createMultiplyContainer(elements, parent, scene) {
  //var dot = "";
  var nextTile = "";
  const multContainer = scene.add.container();

  elements.forEach((element) => {
    //create tile if its not already there
    if (typeof element === "string") {
      nextTile = createBasicTile(scene, multContainer, element);
    } else {
      nextTile = element;
    }

    multContainer.add(nextTile);
    nextTile.data.set({ parent: multContainer });
    multContainer.moveDown(nextTile);
  });

  //create background rectangle for the container and add to the container at the back
  const blankTile = scene.add.graphics();
  multContainer.addAt(blankTile, 0);

  //set final details of container before returning it

  multContainer.setDataEnabled();
  multContainer.data.set({ parent: parent, type: "multiply" });
  rerenderTiles(multContainer, scene);

  return multContainer;
}

export function createAdditionTile(elements, parent, scene) {
  const addContainer = scene.add.container();

  var nextTile = "";

  if (parent.data !== null && parent.data.values.type === "multiply") {
    addContainer.add(scene.add.sprite(0, 0, "lbracket"));
  }
  elements.forEach((element) => {
    //create tiles if not already there
    if (typeof element === "string") {
      nextTile = createBasicTile(scene, addContainer, element);
    } else {
      nextTile = element;
    }
    addContainer.add(nextTile);
    nextTile.data.set({ parent: addContainer });
  });

  if (parent.data !== null && parent.data.values.type === "multiply") {
    addContainer.add(scene.add.sprite(0, 0, "rbracket"));
  }

  const blankTile = scene.add.graphics();
  addContainer.addAt(blankTile, 0);

  addContainer.setDataEnabled();
  addContainer.data.set({ parent: parent, type: "addition" });

  //rerenderTiles(addContainer, scene);

  return addContainer;
}

//put this in multiplications
export function createFractionTile() {}

//delete from multiplication
export function deleteFromMultiplication(element, scene, mat) {
  const parent = element.data.values.parent;
  parent.remove(element, true);
  if (parent.list.length <= 3) {
    //if one of only two elements in multiplication, replace multiplication in its parent with the other element.
    const parent2 = parent.data.values.parent;
    const newTile = parent.getAt(1);
    newTile.data.set({ parent: parent2 });
    const index = parent2.getIndex(parent);
    parent.remove(newTile, false);
    parent2.addAt(newTile, index);
    parent.destroy();
  }
  rerenderTiles(mat, scene);
  return;
}

//delete from addition
export function deleteFromAddition(element, scene, mat) {
  element.destroy(0);
  rerenderTiles(mat, scene);
}

export function cloneContainer(container, scene, newParent) {
  if (container.data.values.type === "simple") {
    return createBasicTile(scene, newParent, container.data.values.value);
  } else {
    var clone = scene.add.container();
    clone.add(scene.add.graphics());
    clone.setDataEnabled();
    clone.data.set({ parent: newParent, type: container.data.values.type });

    container.each((element) => {
      if (element.data !== null) {
        if (element.data.values.type === "simple") {
          clone.add(createBasicTile(scene, clone, element.data.values.value));
        } else {
          clone.add(cloneContainer(element, scene, clone));
        }
      }
    });
    clone.setSize(1, 1);
    clone.setInteractive();
    scene.input.setDraggable(clone);
    return clone;
  }
}

export function disableInteractive(expression, exception = null) {
  if (
    expression.data === null ||
    expression.data === undefined ||
    expression.data.values.value === exception
  ) {
    return;
  } else {
    expression.disableInteractive();
    if (expression.data.values.type === "simple") {
      return;
    } else {
      expression.each((element) => {
        disableInteractive(element, exception);
      });
    }
  }
}

//delete fraction

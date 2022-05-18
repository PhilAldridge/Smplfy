<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Phaser 3 Template</title>
    <script src="./phaser.min.js"></script>

    <style>
      html,
      body,
      #game-container {
        margin: 0;
        padding: 0;
      }

      #game-container {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      #game-container > canvas {
        border-radius: 5px;
      }
    </style>
    <style media="screen" type="text/css">
      @font-face {
        font-family: Gabriola;
        src: local("Gabriola"),
          url("./assets/fonts/gabriola.woff") format("woff");
        font-weight: normal;
        font-weight: normal;
      }
    </style>
  </head>

  <body>
    <div
      style="
        font-family: Gabriola;
        position: absolute;
        left: -1000px;
        visibility: hidden;
      "
    >
      .
    </div>
    <div id="game-container"></div>

    <script type="module" src="./index.js"></script>
  </body>
</html>

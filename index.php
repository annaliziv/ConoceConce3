<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Proyecto</title>
    <link rel="stylesheet" href="styles.css">
    <meta name='viewport' content='initial-scale=1,maximum-scale=1,user-scalable=no' />
    <script src='https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.1/mapbox-gl.js'></script>
    <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.1/mapbox-gl.css' rel='stylesheet' />
    <script type="text/javascript" src="jquery.js"></script>
  	<script type="text/javascript" src="funciones.js"></script>
  	<script src="https://rawgit.com/schmich/instascan-builds/master/instascan.min.js"></script>

  </head>
  <body>
    <div id="contenedor">
      <header id="cabezera">
      </header>
      <div id="cuerpo">
        <div id="cuerpo-video">
          <button id="botoncamara" type="button" name="button">Encuentra tu destino</button>
          <button id="volveratras" type="button" name="button">Volver atras</button>
          <video id="webcam"></video>
          <div id='map' style='width: 400px; height: 300px;'></div>
          <script>
          initmap();

          </script>
        </div>
      </div>
    </div>
  </body>
</html>

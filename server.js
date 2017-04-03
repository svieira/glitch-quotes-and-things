const formMiddleware = require('body-parser');
const Color = require('color');
const express = require('express');
const Jimp = require('jimp');

const app = express();
app.use(
  formMiddleware.json(),
  formMiddleware.urlencoded({ extended: true })
);

function randomRgbComponent() {
  return Math.floor(Math.random() * 255);
}

function randomColor() {
  return Color({
    r: randomRgbComponent(),
    g: randomRgbComponent(),
    b: randomRgbComponent()
  });
}

function getColor(color) {
  if (!color) return randomColor();
  try {
    return Color(color);
  } catch (e) {
    console.log('Unable to create a color for', color, 'due to', e);
    return randomColor();
  }
}

function colorHandler(request, response) {
  var color = request.body && request.body.text;
  console.log('Got a post request with', color);
  color = getColor(color);
  var svg = `
<svg xmlns="http://www.w3.org/2000/svg"
     width="64" height="64" viewBox="0 0 100 100">
    <rect x="0" y="0" height="100" width="100"
          style="stroke:#ff0000; fill: ${color.hex().toLowerCase()};"/>
</svg>
`.trim();
  var uriSvg = 'data:image/svg+xml;base64,' + new Buffer(svg).toString('base64');
  new Jimp(64, 64, color.rgbNumber(), (err, image) => {
    if (err) console.warn(err);
    image.getBase64(Jimp.MIME_PNG, (err, img) => {    
      if (err) console.warn(err);
      console.log('responding with', color.hex(), color.rgb().string(), color.rgbNumber().toString(16));
      console.log(img);
      response.json({
        response_type: 'in_channel',
        text: `![The color ${color.hex()}](${img}) ![As an SVG](${uriSvg})`
      });
    });
  });
}

app.get('/color', colorHandler);
app.post('/color', colorHandler);

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

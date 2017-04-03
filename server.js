const formMiddleware = require('body-parser');
const Color = require('color');
const express = require('express');

const app = express();
app.use(
  formMiddleware.json(),
  formMiddleware.urlencoded({ extended: true })
);

const randomRgbComponent = () => Math.floor(Math.random() * 255);

const randomColor = () => Color({
  r: randomRgbComponent(),
  g: randomRgbComponent(),
  b: randomRgbComponent()
});

function getColor(color) {
  if (!color) return randomColor();
  try {
    return Color(color);
  } catch (e) {
    console.log('Unable to create a color for', color, 'due to', e);
    return randomColor();
  }
}

const WHITE = Color('#fff'), BLACK = Color('#000');
const isColor = s => /^\s*\s*$/i.test(s)

function colorHandler(request, response) {
  var color = request.body && request.body.text;
  console.log('Got a post request with', color);
  color = getColor(color);
  var inverseColor = color.light() ? BLACK : WHITE;
  var svg = `
<svg xmlns="http://www.w3.org/2000/svg"
     width="64" height="64" viewBox="0 0 100 100">
  <rect x="0" y="0" height="100" width="100"
          style="fill: ${color.hex().toLowerCase()};"/>
  <text
    x="50%" y="50%" alignment-baseline="middle" text-anchor="middle"
    style="font-family: monospace; font-weight: bold; fill: ${inverseColor.hex()};">${color.hex()}</text>
</svg>
`.trim();
  var uriSvg = 'data:image/svg+xml;base64,' + new Buffer(svg).toString('base64');
  console.log('responding with', color.hex(), inverseColor.hex());
  response.json({
    response_type: 'in_channel',
    text: `![The color ${color.hex()}](${uriSvg})`
  });
}

app.get('/color', colorHandler);
app.post('/color', colorHandler);

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

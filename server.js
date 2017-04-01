const formMiddleware = require('body-parser');
const Color = require('color');
const express = require('express');
const Jimp = require('jimp');

const app = express();
app.use(
  formMiddleware.json(),
  formMiddleware.urlencoded({ extended: true })
);

function randomColor() {
  return Color('#C33');
}

app.post("/color", function (request, response) {
  console.log('Got a post request');
  var color = Color(request.body.text) || randomColor();
  new Jimp(128, 128, color.rgbNumber(), (err, image) => {
    if (err) console.warn(err);
    image.getBase64(Jimp.MIME_PNG, (err, img) => {    
      if (err) console.warn(err);
      console.log('responding with', img)
      response.json({
        text: `![The color ${color.string()}](${img})`
      });
    });
  });
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

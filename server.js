const express = require('express');
const formMiddleware = require('body-parser')
const Jimp = require('jimp');

const app = express();
app.use(
  formMiddleware.json(),
  formMiddleware.urlencoded({ extended: true })
);


// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/color", function (request, response) {
  var color = Color.parse(request.body.text) || randomColor();
  new Jimp(128, 128, color.toRgb(), (err, image) => {
    image.getBase64(Jimp.MIME_PNG, (err, img) => {
      response.json({
        text: `![The color ${color}](${img})`
      });
    });
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

const formMiddleware = require('body-parser');
const colorHandler = require('./handlers/color');
const express = require('express');

const app = express();
app.use(
  formMiddleware.json(),
  formMiddleware.urlencoded({ extended: true })
);

app.get('/color', colorHandler);
app.post('/color', colorHandler);

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

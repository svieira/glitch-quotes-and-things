const formMiddleware = require('body-parser');
const express = require('express');
const path = require('path');

const app = express();
app.use(
  formMiddleware.json(),
  formMiddleware.urlencoded({ extended: true }),
  express.static(path.join(__dirname, 'public'))
);

const lazyHandler = path => {
  let handler;
  return (...args) => {
    if (!handler) handler = require(path);    
    return handler(...args);
  }
};

const colorHandler = lazyHandler('./handlers/color');
const expressionHandler = lazyHandler('./handlers/expressions');
const appearInHandler = lazyHandler('./handlers/appear-in');
const fortuneHandler = lazyHandler('./handlers/fortunes');

app.get('/color', colorHandler);
app.post('/color', colorHandler);
app.post('/expression', expressionHandler);
app.post('/appear-in', appearInHandler);
app.post('/fortune', fortuneHandler);

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on PORT ' + listener.address().port);
});

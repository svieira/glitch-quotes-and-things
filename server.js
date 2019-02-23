const formMiddleware = require('body-parser');
const express = require('express');

const app = express();
app.use(
  formMiddleware.json(),
  formMiddleware.urlencoded({ extended: true })
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

app.get('/', (request, response) => {
  response.send(`
<!doctype html>
<html>
<head>
<title>Random Bots</title>
</head>
<body>
<h1>Test the bots here</h1>
<label for="endpoint">Robot</label>
<select id="endpoint">
<option></option>
<option value="color">Color Swatches</color>
<option value="expressions">Expression Evaluator</color>
<option value="appear-in">appear.in linker</color>
<option value="fortunes">Fortune-like program</color>
</select>
<label for="contents">Message</label>
<textarea id="contents" placeholder="What your robot sees ..."></textarea>
<button id="send">Send</button>
<pre><code id="response"></code></pre>
<script>
send.addEventListener("click", e => {
  e.preventDefault();
  const urlPostfix
})
</script>
</body>
</html>
`.trim());
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

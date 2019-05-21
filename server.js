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
<style>
html, body {
  min-width: 100vw;
  min-height: 100vh;
  margin: 0;
  padding: 0;
}
h1 {
  color: green;
}
.message {
  display: flex;
}
#avatar {
  max-width: 1rem;
  height: 100%;
  margin: 0.5rem;
}
</style>
</head>
<body>
<h1>Test the bots here</h1>
<label for="endpoint">Robot</label>
<select id="endpoint">
<option value="">Choose an option ...</option>
<option value="color">Color Swatches</color>
<option value="expression">Expression Evaluator</color>
<option value="appear-in">appear.in linker</color>
<option value="fortune">Fortunes and Pithy Sayings</color>
</select>
<label for="contents">Message</label>
<textarea id="contents" placeholder="What your robot sees ..."></textarea>
<button id="send">Send</button>
<div class="message">
<img id="avatar">
<span id="username"></span>
<div id="renderedResponse">
</div>
</div>
<pre><code id="debugResponse"></code></pre>
<script>
send.addEventListener("click", async (e) => {
  e.preventDefault();
  const urlPostfix = endpoint.value;
  if (!urlPostfix) return;
  try {
    const data = await fetch('/' + urlPostfix, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: contents.value })
    }).then(r => r.json());
    debugResponse.textContent = JSON.stringify(data, null, 2);
    renderedResponse.innerHTML = new commonmark.HtmlRenderer({sourcepos: true}).render(
      new commonmark.Parser({smart: true}).parse(data.text)
    );
    avatar.src = data.icon_url;
    avatar.hidden = !data.icon_url;
    username.innerText = data.username || urlPostfix;
    username.hidden = !(data.username || urlPostfix);
  } catch (e) {
    debugResponse.textContent = e.message + '\\n' + e.stack;
  }
})
</script>
<script src="https://unpkg.com/commonmark@0.29.0/dist/commonmark.min.js" async></script>
</body>
</html>
`.trim());
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on PORT ' + listener.address().port);
});

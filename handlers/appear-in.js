const randomName = require('./random-name');

module.exports = function appearInHandler(request, response) {
  const message = (request.body && request.body.text || '').trim();
  const isSingleWord = /^[\w\d_.-]+$/i.test(message);
  const roomName = (isSingleWord && message || randomName());
  const text = isSingleWord 
    ? `[Please join me in appear.in/${roomName}](https://appear.in/${roomName})`
    : `${message}\n[appear.in/${roomName}](https://appear.in/${roomName})`

  response.json({
    response_type: 'in_channel',
    text,
    icon_url: "https://cdn.glitch.com/8568201b-555b-4c6e-8e58-9e525d75d1d7%2Fappear-in.png?1499265763419"
  });
}
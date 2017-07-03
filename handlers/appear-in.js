const WORDS = `
rabbit
hat
cat
bird
tame
ship
sail
trim
float
boat
chariot
horse
flute
prune
apple
grape
tuna
salmon
`.trim().split('\n');
const WORD_LENGTH = WORDS.length;

function randomName(size = 4) {
  let result = [];
  while (result.length < size) {
    Math.random() *
  }
}

module.exports = function appearInHandler(request, response) {
  var roomName = (request.body && request.body.roomName || randomName());

  const text = `[appear.in/${roomName}](https://appear.in/${roomName})`;
  response.json({
    response_type: 'in_channel',
    text
  });
}
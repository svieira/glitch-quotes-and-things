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
`.trim().split('\n');
const WORD_LENGTH = WORDS.length;

function randomName() {
  
}

module.exports = function appearInHandler(request, response) {
  var roomName = (request.body && request.body.roomName || randomName());

  const text = `[appear.in/${roomName}](https://appear.in/${roomName})`;
  response.json({
    response_type: 'in_channel',
    text
  });
}
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
    const index = Math.floor(Math.random() * WORD_LENGTH)
    if (index === WORD_LENGTH || result.includes(WORDS[index])) continue;
    result.push(WORDS[index]);
  }
  return result.join('-');
}

module.exports = function appearInHandler(request, response) {
  var roomName = (request.body && request.body.text || randomName());

  const text = `[appear.in/${roomName}](https://appear.in/${roomName})`;
  response.json({
    response_type: 'in_channel',
    text
  });
}
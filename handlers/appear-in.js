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
pretzel
king
queen
jack
ace
shovel
trowel
moth
sand
shell
corn
llama
alpaca
sheep
goat
goldfish
canary
kind
truthful
red
green
blue
silver
gold
ruby
diamond
finch
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

  const text = `[Please join me in appear.in/${roomName}](https://appear.in/${roomName})`;
  response.json({
    response_type: 'in_channel',
    text,
    icon_url: "https://cdn.glitch.com/8568201b-555b-4c6e-8e58-9e525d75d1d7%2Fappear-in.png?1499265763419"
  });
}
const NOUNS = `
rabbit
hat
cat
bird
ship
sail
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
silver
gold
ruby
diamond
finch
python
bucket
coffee
tea
tree
brook
`.trim().split('\n');
const ADJECTIVES = `
kind
truthful
running
floating
singing
happy
merry
golden
silvered
ancient
young
tame
fierce
trim
red
green
blue
silver
gold
umber
ocher
sweet
ruby
diamond
`.trim().split('\n');

function randomName(size = 4) {
  let result = [];
  let adjective = true;
  while (result.length < size) {
    const WORDS = adjective ? ADJECTIVES : NOUNS;
    const WORD_LENGTH = WORDS.length;
    const index = Math.floor(Math.random() * WORD_LENGTH)
    if (index === WORD_LENGTH || result.includes(WORDS[index])) continue;
    result.push(WORDS[index]);
    adjective = !adjective;
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
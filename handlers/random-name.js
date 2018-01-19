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

module.exports = function randomName(size = 4, { nouns = NOUNS, adjectives = ADJECTIVES } = {}) {
  let result = new Set();
  let adjective = true;
  while (result.length < size) {
    const words = adjective ? adjectives : nouns;
    const wordsLength = words.length;
    const index = Math.floor(Math.random() * wordsLength)
    if (index === wordsLength || result.includes(words[index])) continue;
    result.push(words[index]);
    adjective = !adjective;
  }
  return result.join('-');
};
const { ICONS, FORTUNES } = require('./fortunes-data');

const hashTags = /#([\w\d_-]+)/g;

function toRegex(searchString) {
  searchString = searchString.toLowerCase();
  let results = new Set();
  let m;
  while (m = hashTags.exec(searchString)) {
    m[1] !== 'fortune' && results.add(m[1]);
  }
  results = RegExp('(' + Array.from(results).join('|') + ')', 'ig');
  return {
    test(f) {
      return results.test(f);
    }
  };
}

function fortuneText(text) {
  if (!text.trim()) return choice(FORTUNES);
  const test = toRegex(text && text.trim() || '');
  return choice(FORTUNES.filter(f => test.test(f))) || choice(FORTUNES);
}

function choice(list) {
  return list[Math.floor(Math.random() * list.length)];
}

module.exports = function fortuneHandler(request, response) {
  
  const text = fortuneText(request.body.text);
  const icon_url = choice(ICONS);
  return response.json({
    username: 'Fortune Teller',
    response_type: 'in_channel',
    text,
    icon_url
  });
}
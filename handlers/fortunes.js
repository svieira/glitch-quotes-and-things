const { ICONS, FORTUNES } = require('./fortunes-data');

function toRegex(searchString) {
  searchString = searchString.toLowerCase();
  return {
    test(f) {
      return f.toLowerCase().indexOf(searchString) > -1;
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
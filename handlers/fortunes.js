const { ICONS, FORTUNES } = require('./fortunes-data');
const withHelp = require('./with-help');

const HELP = `
## \`/fortune #SEARCH #TERMS\`

May also be invoked with a leading @fortune or #fortune in public rooms.  If the search term(s) are not matched a random fortune is chosen.

When invoked from the slash command will @mention the user who invoked the command

### Examples

> #fortune favors the #prepared
> @fortune what are the #odds we make it?

### Options
* \`-h\`, \`--help\` - Show this screen
`.trim();
const username = 'Fortune Teller';

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

module.exports = withHelp({username, text: HELP}, function fortuneHandler(request, response) {
  const command = request.body.command;
  const prefix = command ? `@${request.body.user_name}\n` : '';
  const text = prefix + fortuneText(request.body.text);
  const icon_url = choice(ICONS);
  return response.json({
    username,
    response_type: 'in_channel',
    text,
    icon_url
  });
});
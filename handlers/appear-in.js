const randomName = require('./random-name');
const withHelp = require('./with-help');

const HELP = `
## \`/appear NAME_OR_MESSAGE\`

If a single word is provided, sends a polite message asking people to join that room (with full appear.in URL).
If a longer message is provided, the bot echos that message with a random room name appended.

### Examples

> /appear my-fave-room
> > Please join me in appear.in/my-fave-room

> /appear Let's talk in person about this
> > Let's talk in person about this
> > appear.in/some-nice-random-name

### Options
* \`-h\`, \`--help\` - Show this screen
`.trim();

// meet.jit.si/{ROOM-NAME}

module.exports = withHelp({text: HELP}, function appearInHandler(request, response) {
  const message = (request.body && request.body.text || '').trim();
  const isSingleWord = /^[\w\d_.-]*$/i.test(message);
  const roomName = (isSingleWord && message || randomName());
  const text = isSingleWord 
    ? `[Please join @${request.body.user_name} in appear.in/${roomName}](https://appear.in/${roomName})`
    : `${message}\n[appear.in/${roomName}](https://appear.in/${roomName})`

  response.json({
    response_type: 'in_channel',
    text,
    icon_url: "https://cdn.glitch.com/8568201b-555b-4c6e-8e58-9e525d75d1d7%2Fappear-in.png?1499265763419"
  });
});

const isHelp = s => /^\s*(-\s*h|-\s*-\s*help|\?)\s*$/i.test(s);
const DEFAULT_ICON = 'https://cdn.glitch.com/8568201b-555b-4c6e-8e58-9e525d75d1d7%2Fhelp.svg?1499441139164';
const DEFAULT_TEXT = 'No help provided yet :-(';

function helpDecorator({username, text = DEFAULT_TEXT, icon_url = DEFAULT_ICON, response_type = 'ephemeral'} = {}, handler) {
  return function helpHandler(...args) {
    const [request, response] = args;
    if (isHelp(request.body.text)) {
      username = username || `Help for ${request.body.command}`;
      response.json({
        response_type,
        username: 'AEL v17.1',
        text: HELP,
        icon_url: 'https://cdn.glitch.com/8568201b-555b-4c6e-8e58-9e525d75d1d7%2Fsail.png?1494364646623'
      });
    }
    handler.apply(this, args)
  };
}

function helpResponse(request, response) {
  if (isHelp(request.body.text)) {
    return response.json({
      response_type: 'ephemeral',
      username: 'AEL v17.1',
      text: HELP,
      icon_url: 'https://cdn.glitch.com/8568201b-555b-4c6e-8e58-9e525d75d1d7%2Fsail.png?1494364646623'
    });
  }
}
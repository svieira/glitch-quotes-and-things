
const isHelp = s => /^\s*(-\s*h|-\s*-\s*help|\?)\s*$/i.test(s);
const DEFAULT_ICON = 'https://cdn.glitch.com/8568201b-555b-4c6e-8e58-9e525d75d1d7%2Fhelp.svg?1499441139164';
const DEFAULT_TEXT = 'No help provided yet :-(';

module.exports = function helpDecorator({username, text = DEFAULT_TEXT, icon_url = DEFAULT_ICON, response_type = 'ephemeral'} = {}, handler) {
  return function helpHandler(...args) {
    const [request, response] = args;
    if (isHelp(request.body.text)) {
      username = username || `Help for ${request.body.command}`;
      response.json({
        response_type,
        username,
        text,
        icon_url
      });
    }
    handler.apply(this, args)
  };
};

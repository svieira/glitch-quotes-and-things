const fetch = require('node-fetch');

const HELP = `
## \`/sail EXPRESSION\`

### Options
* \`-h\`, \`--help\` - Show this screen
* \`-q\`, \`--quiet\` - Return the results as an ephemeral messsage only you can see
`.trim();

const codeBlock = (code, language='') => '```${language}\n' + code + '\n```'

const template = ({expression, result, type}) => {
  return `
${codeBlock(expression, 'groovy')}
${'`--->`'}
${codeBlock(result)}
###### ${type}
`.trim();
}
const quietFlag = /-?-(quiet|q|s|silent|me)/ig;
const isQuiet = s => quietFlag.test(s)
const isHelp = s => /^\s*(-\s*h|-\s*-\s*help|\?)\s*$/i.test(s)

module.exports = function expressionHandler(request, response) {
  if (isHelp(request.body.text)) {
    return response.json({
      response_type: 'ephemeral',
      username: 'AEL v17.1',
      text: HELP,
      icon_url: 'https://cdn.glitch.com/8568201b-555b-4c6e-8e58-9e525d75d1d7%2Fsail.png?1494364646623'
    });
  }
  const quiet = isQuiet(request.body.text);
  const expression = (quiet ? request.body.text.replace(quietFlag, '') : request.body.text).trim();
  const username = request.body.user_name ? ` (${request.body.user_name})` : ''
  const response_type = quiet ? 'ephemeral' : 'in_channel';
  fetch('https://cy175v8jxb.execute-api.us-east-1.amazonaws.com/evaluatorPrototype/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    // treat the body as a JSON string
    body: JSON.stringify(expression)
  }).then(res => res.json()).then(body => {
    response.json({
      response_type,
      text: template({expression, type: body.type, result: body.value})
    })
  }).catch(err => {
    response.json({
      response_type,
      username: 'AEL v17.1' + username,
      text: template({expression, type: 'Error', result: err}),
      icon_url: 'https://cdn.glitch.com/8568201b-555b-4c6e-8e58-9e525d75d1d7%2Fsail.png?1494364646623'
    });
  })
};
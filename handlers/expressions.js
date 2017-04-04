const fetch = require('node-fetch');

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

module.exports = function expressionHandler(request, response) {
  const quiet = isQuiet(request.body.text);
  const expression = (quiet ? request.body.text.replace(quietFlag, '') : request.body.text).trim();
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
      text: template({expression, type: 'Error', result: err})
    });
  })
};
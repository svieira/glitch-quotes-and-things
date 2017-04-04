const fetch = require('node-fetch');

const codeBlock = (code, language='') => '```${language}\n' + code + '\n```'

const template = ({expression, result, type}) => {
  return `
${codeBlock(result)}
#### of ${type}
${codeBlock(expression)}
`.trim();
}

module.exports = function expressionHandler(request, response) {
  const expression = request.body.text;
  console.log('Received', expression)
  fetch('https://cy175v8jxb.execute-api.us-east-1.amazonaws.com/evaluatorPrototype/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    body: '"' + expression.replace(/"/g, '\\"') + '"'
  }).then(res => res.json()).then(body => {
    response.json({
      response_type: 'in_channel',
      text: codeBlock(expression) + '\n\n' + body.type + ':\n' + body.value
    })
  }).catch(err => {
    response.json({
      response_type: 'in_channel',
      text: 'Error:\n' + err.toString()
    });
  })
};
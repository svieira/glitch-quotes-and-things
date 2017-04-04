const fetch = require('node-fetch');

module.exports = function expressionHandler(request, response) {
  const expression = request.body.text;
  console.log('Received', expression)
  fetch('https://cy175v8jxb.execute-api.us-east-1.amazonaws.com/evaluatorPrototype/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    body: expression.replace(/"/g, '\\"')
  }).then(res => res.text()).then(body => {
    response.json({
      response_type: 'in_channel',
      text: body || body.type + ':\n' + body.value
    })
  }).catch(err => {
    response.json({
      response_type: 'in_channel',
      text: 'Error:\n' + err.toString()
    });
  })
};
const fetch = require('node-fetch');

module.exports = function expressionHandler(request, response) {
  const expression = request.body.text;
  fetch('https://cy175v8jxb.execute-api.us-east-1.amazonaws.com/evaluatorPrototype/', {
    method: 'POST',
    body: expression
  }).then(res => res.json()).then(body => {
    response.json({
      response_type: 'in_channel',
      body
    })
  }).catch(err => {
    response.json({
      response_type: 'in_channel',
      text: err.toString()
    });
  })
};
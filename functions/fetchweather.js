const axios = require('axios');
require('dotenv').config();

exports.handler = function (event, context, callback) {
  const { API_BASE_URL, API_KEY_NAME, API_KEY_VALUE } = process.env;

  const query = event.queryStringParameters

  const params = new URLSearchParams({
    [API_KEY_NAME]: API_KEY_VALUE,
    units: "metric",
    ...query
  });

  const URL = `${API_BASE_URL}?${params}`;

  // 调用API
  const fetchwether = async () => {
    axios.get(URL)
      .then(res => send(res.data))
      .catch(err => send(err));
  }
  // 发送响应
  const send = body => {
    callback(null, {
      statusCode: 200,
      // 本地调试开启CORS
      // headers: {
      //   'Access-Control-Allow-Origin': '*',
      //   'Access-Control-ALlow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
      // },
      body: JSON.stringify(body)
    })
  };

  // 确保请求方法是GET
  if (event.httpMethod === 'GET') {
    fetchwether();
  }
}
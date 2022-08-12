var dht = require('./libs/server');

/**
 * Chord network.
 */
var onmessage = function (payload) {
  console.info(payload);
  // switch (payload.type) {
  //   case 'lookup':
  //     break;
  //   case 'get':
  //     break;
  //   case 'put':
  //     break;
  //   default:
  // }
};

var bootstrap = [
  {
    address: '192.168.1.253',
    port: 8000,
  },
];

/**
 * Create a virtual node (seed node).
 */
dht.start({
  onmessage: onmessage,
  join: bootstrap[0],
});

const express = require('express');
const app = express();

let blogDetails = [{ id: 'test', content: '123 blob' }];

app.get('/', (req, res) => {
  // res.send('<h1>Hello World!</h1>');
  res.sendFile(`${__dirname}/_app.js`);
});

app.get('/api/get', (req, res) => {
  var key = req.query.key,
    node = dht.lookup(key),
    result = dht.message(node, { type: 'get', key: key });
  res.json(result);
});

// https://node-adshxm--8000.local.webcontainer.io/api/put?key=test&value=123
app.get('/api/put', (req, res) => {
  var key = req.query.key,
    value = req.query.value;

  dht.sendChordMessage(bootstrap[0], {
    type: 5,
    message: {
      id: 'b283326930a8b2baded20bb1cf5b6358',
    },
  });
  //   node = dht.lookup(key),
  //   data = {
  //     type: 5,
  //     message: {
  //       id: 'b283326930a8b2baded20bb1cf5b6358',
  //       action: 'put',
  //       key: key,
  //       value: value,
  //     },
  //   };
  // dht.message(bootstrap[0], data);
  setTimeout(function () {
    res.json({ success: true });
  }, 300);
});

const API_PORT = 8000;
app.listen(API_PORT, () => {
  console.info(`api running on port ${API_PORT}`);
});

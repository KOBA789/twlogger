var keys = require('./my_keys');

var oauth = require('oauth-revenge'),
    Lazy = require('lazy'),
    cradle = require('cradle'),
    db = new(cradle.Connection)(keys.couchdb, {
      auth: { username: keys.username, password: keys.password }
    }).database('twitter_stream');

var signer = oauth.createHmac(keys, keys),
    client = oauth.createClient(signer),
    endpoint = 'https://userstream.twitter.com/2/user.json';

function connect () {
  client.GET(endpoint, function (stream) {
    stream.setEncoding('utf8');

    Lazy(stream)
      .lines
      .tail()
      .map(String)
      .filter(function (x) {
        return typeof x === 'string' && x.trim().length > 0;
      })
      .map(JSON.parse)
      .map(function (data) {
        db.save(data);
      });

    stream.on('end', function () {
      setTimeout(function () {
        connect();
      }, 5000);
    });
  });
}

connect();
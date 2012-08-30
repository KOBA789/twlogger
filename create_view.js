var keys = require('./my_keys');

var cradle = require('cradle'),
    db = new(cradle.Connection)(keys.couchdb, {
      auth: { username: keys.username, password: keys.password }
    }).database('twitter_stream');

db.save('_design/favorites', {
  all: {
    map: function (doc) {
      if (doc.event === 'favorite' || doc.event === 'unfavorite') {
        var obj = {};
        obj[doc.source.screen_name] = [new Date(doc.created_at) - 0, {favorite: true, unfavorite: false}[doc.event]];
        emit([doc.target_object.id_str, doc.target_object.text], obj);
      }
    },
    reduce: function (key, values, rr) {
      return [].concat(values).reduce(function (prev, curr) {
        for (var key in curr) {
          if (!(key in prev) || prev[key][0] < curr[key][0]) {
            prev[key] = curr[key];
          }
        }
        return prev;
      }, {});
    }
  }
});
var express = require('express');
var bodyParser = require('body-parser');

var Levenshtein = require('levenshtein');
var crawler = require('./crawler');

var groupBy = require('group-by');


var server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

server.get('/title/:title', function (req, res) {
  var title = req.params.title;
  crawler.getDataFor(title).then(function (subtitles) {
      subtitles = subtitles.map(function (sub) {
        // use Levenshtein algorithm to match strings
        var comparison = new Levenshtein(sub.title, title);
        sub.matchRate = comparison.distance;
        return sub;
      });

      var response = groupBy(subtitles, 'language');
      res.json(response);
  });
});


server.listen(3000);

var express = require('express');
var bodyParser = require('body-parser');

var Levenshtein = require('levenshtein');
var crawler = require('./crawler');

var groupBy = require('group-by');


var server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

// DEBUG only
server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


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

server.get('/download/:url', function (req, res) {
  var url = req.params.url;
  crawler.downloadSubtitle(url).then(function (downloadUrl) {
      res.json({ url: downloadUrl });
  });
});


server.listen(3030);

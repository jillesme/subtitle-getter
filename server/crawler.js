var request = require('request');
var cheerio = require('cheerio');
var Promise = require('promise');

var config = require('./config');

function getDataFor (title) {
  return new Promise(function (resolve, reject) {
    request(config.get_url + title, function (err, data) {
      if (err) reject(err);
      var $ = cheerio.load(data.body, { normalizeWhitespace: true });
      var resultsTable = $('table tbody');
      var arr = [];
      resultsTable.children().each(function () {
        var data = {};
        var row = $(this);

        var subtitleInfo = row.find('.a1 a');
        data.url = subtitleInfo.attr('href');
        // array[], 0 = language, 1 = release name
        var content = subtitleInfo.find('span');
        data.language = $(content[0]).text().trim();
        // we need to match this
        data.title = $(content[1]).text().trim();

        data.author = row.find('.a5 a').text().trim();
        data.comment = row.find('.a6').text().trim();

        // The way hearing aid is done is by class. The 3d span
        // either has a class 'a41' for hearing aid or 'a40' for not
        data.hi = $(row.find('td')[2]).attr('class') === 'a41';

        arr.push(data);
      });
      resolve(arr);
    });
  });
}

function downloadSubtitle (query) {
  return new Promise(function (resolve, reject) {
    request(config.download_url + query, function (err, data) {
      console.log(err);
      if (err) reject(err);
      var $ = cheerio.load(data.body, { normalizeWhitespace: true });
      resolve($('#downloadButton').attr('href'));
    });
  });
}

module.exports = {
  getDataFor: getDataFor,
  downloadSubtitle: downloadSubtitle
};

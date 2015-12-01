import superagent from 'superagent';

let SubitleServerActionCreators = require('../actions/SubtitleServerActionCreators.js');

module.exports = {
  fetchSubtitles: function (title) {
    superagent.get('http://localhost:3030/title/' + title)
    .end((err, response) => {
      SubitleServerActionCreators.receive({ error: err, subtitles: response && response.body });
    });
  }
};

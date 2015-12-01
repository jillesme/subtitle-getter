import * as request from 'superagent';
import SubitleServerActionCreators from '../actions/SubtitleServerActionCreators.js';

module.exports = {
  fetchSubtitles: function (title) {
    request.get('http://localhost:3030/title/' + title)
    .end((err, response) => {
      SubitleServerActionCreators.receive({ error: err, subtitles: response && response.body });
    });
  }
};

import * as request from 'superagent';
import { API_URL } from '../constants/SubtitleConstants';
import SubitleServerActionCreators from '../actions/SubtitleServerActionCreators.js';

module.exports = {
  fetchSubtitles: function (title) {
    request.get(API_URL + title)
    .end((err, response) => {
      SubitleServerActionCreators.receive({ error: err, subtitles: response && response.body });
    });
  }
};

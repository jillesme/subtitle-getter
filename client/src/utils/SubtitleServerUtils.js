import * as request from 'superagent';
import { API } from '../constants/SubtitleConstants';
import SubitleServerActionCreators from '../actions/SubtitleServerActionCreators.js';

module.exports = {
  fetchSubtitles: function (title) {
    request.get(API.URL + API.TITLE + title)
    .end((err, response) => {
      SubitleServerActionCreators.receiveSubtitles({ error: err, subtitles: response && response.body });
    });
  },

  fetchDownloadUrl: function (query) {
    request.get(API.URL + API.DOWNLOAD + query)
    .end((err, response) => {
      SubitleServerActionCreators.receiveDownloadUrl({ url: response && response.body.url });
    });
  }
};

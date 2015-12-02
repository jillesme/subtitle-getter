import * as request from 'superagent';
import { API } from '../constants/SubtitleConstants';
import ArrayUtils from '../utils/ArrayUtils.js'
import SubitleServerActionCreators from '../actions/SubtitleServerActionCreators.js';

module.exports = {
  fetchSubtitles: function (title) {
    request.get(API.URL + API.TITLE + title)
    .end((err, response) => {
      let result = response && response.body || {};
      result = ArrayUtils.sortObject(result, 'matchRate');
      SubitleServerActionCreators.receiveSubtitles({ error: err, subtitles: result });
    });
  },

  fetchDownloadUrl: function (query) {
    request.get(API.URL + API.DOWNLOAD + query)
    .end((err, response) => {
      SubitleServerActionCreators.receiveDownloadUrl({ url: response && response.body.url });
    });
  }
};

import superagent from 'superagent';

import Dispatcher from '../dispatcher/Dispatcher.js';
import { ActionTypes } from '../constants/SubtitleConstants';
import SubtitleServerUtils from '../utils/SubtitleServerUtils';


module.exports = {

  get: function (title) {
    Dispatcher.dispatch({
      actionType: ActionTypes.SUBTITLES_FETCH
    });
    SubtitleServerUtils.fetchSubtitles(title);
  },

  download: function (query) {
    Dispatcher.dispatch({
      actionType: ActionTypes.SUBTITLES_FETCH_DOWNLOAD
    });
    SubtitleServerUtils.fetchDownloadUrl(query);
  },

  reset: function () {
    Dispatcher.dispatch({
      actionType: ActionTypes.SUBTITLES_RESET
    });
  }

};

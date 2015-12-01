import Dispatcher from '../dispatcher/Dispatcher.js';
import { ActionTypes } from '../constants/SubtitleConstants';

module.exports = {

  receiveSubtitles: function (response) {
    Dispatcher.dispatch({
      actionType: ActionTypes.SUBTITLES_RECEIVE,
      content: response
    });
  },

  receiveDownloadUrl: function (response) {
    Dispatcher.dispatch({
      actionType: ActionTypes.SUBTITLES_RECEIVE_DOWNLOAD,
      content: response
    });
  }

};

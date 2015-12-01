import Dispatcher from '../dispatcher/Dispatcher.js';
import { ActionTypes } from '../constants/SubtitleConstants';

module.exports = {

  receive: function (response) {
    Dispatcher.dispatch({
      actionType: ActionTypes.SUBTITLES_RECEIVE,
      content: response
    });
  }

};

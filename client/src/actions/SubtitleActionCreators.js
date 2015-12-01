import superagent from 'superagent';

const Dispatcher = require('../dispatcher/Dispatcher.js');
const ActionTypes = require('../constants/SubtitleConstants').ActionTypes;
var SubtitleServerUtils = require('../utils/SubtitleServerUtils');


module.exports = {

  get: function (title) {
    Dispatcher.dispatch({
      actionType: ActionTypes.SUBTITLES_FETCH
    });
    SubtitleServerUtils.fetchSubtitles(title);
  },

  reset: function () {
    Dispatcher.dispatch({
      actionType: ActionTypes.SUBTITLES_RESET
    });
  }

};

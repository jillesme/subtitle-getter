const Dispatcher = require('../dispatcher/Dispatcher.js');
const ActionTypes = require('../constants/SubtitleConstants').ActionTypes;

module.exports = {

  receive: function (response) {
    Dispatcher.dispatch({
      actionType: ActionTypes.SUBTITLES_RECEIVE,
      content: response
    });
  }

};

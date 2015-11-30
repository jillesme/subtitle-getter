import superagent from 'superagent';

const Dispatcher = require('../dispatcher/Dispatcher.js');
const ActionTypes = require('../constants/SubtitleConstants').ActionTypes;

let SubtitleActions = {

  get: function (subtitle) {

    superagent.get('http://localhost:3030/title/' + subtitle)
    .end((err, response) => {
      Dispatcher.dispatch({
        actionType: ActionTypes.SUBTITLES_GET,
        content: { err: err, subtitles: response && response.body }
      });
    });

  },

  reset: function () {
    Dispatcher.dispatch({
      actionType: ActionTypes.SUBTITLES_RESET
    });
  }

};

module.exports = SubtitleActions;

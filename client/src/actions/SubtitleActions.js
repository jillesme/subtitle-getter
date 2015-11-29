import superagent from 'superagent';

let Dispatcher = require('../dispatcher/Dispatcher.js');

let SubtitleActions = {

  get: function (subtitle) {

    let toDispatch = {
      actionType: 'get',
      content: null
    };

    superagent.get('http://localhost:3030/title/' + subtitle)
    .end((err, response) => {
      if (err) {
        toDispatch.content = { error: err };
      } else {
        toDispatch.content = { subtitles: response.body };
      }

      Dispatcher.dispatch(toDispatch);
    });

  },

  reset: function () {
    Dispatcher.dispatch({
      actionType: 'reset'
    });
  }

};

module.exports = SubtitleActions;

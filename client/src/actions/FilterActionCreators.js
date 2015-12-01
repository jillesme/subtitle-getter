let Dispatcher = require('../dispatcher/Dispatcher.js');
const ActionTypes = require('../constants/SubtitleConstants').ActionTypes;

module.exports = {

  add: function (filter) {
    Dispatcher.dispatch({
      actionType: ActionTypes.FILTER_ADD,
      filter: filter
    });
  },

  remove: function (filter) {
    Dispatcher.dispatch({
      actionType: ActionTypes.FILTER_REMOVE,
      filter: filter
    });
  },

  toggle: function (filter) {
    Dispatcher.dispatch({
      actionType: ActionTypes.FILTER_TOGGLE,
      filter: filter
    });
  }

};

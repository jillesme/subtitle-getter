import Dispatcher from '../dispatcher/Dispatcher.js';
import { ActionTypes } from '../constants/SubtitleConstants';

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
  },

  getFiltersFromStorage: function () {
    Dispatcher.dispatch({
      actionType: ActionTypes.FILTER_FETCH_DB
    });
  }

};

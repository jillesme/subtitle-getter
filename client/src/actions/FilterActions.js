let Dispatcher = require('../dispatcher/Dispatcher.js');

let FilterActions = {

  add: function (filter) {
    Dispatcher.dispatch({
      actionType: 'add',
      filter: filter
    });
  },

  remove: function (filter) {
    Dispatcher.dispatch({
      actionType: 'remove',
      filter: filter
    });
  },

  toggle: function (filter) {
    Dispatcher.dispatch({
      actionType: 'toggle',
      filter: filter
    });
  }

};

module.exports = FilterActions;

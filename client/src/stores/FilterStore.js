let Dispatcher = require('../dispatcher/Dispatcher');
let EventEmitter = require('events').EventEmitter;
let assign = require('object-assign');

const CHANGE_EVENT = 'change';

let _filters = [];

function remove (filter, index) {
  if (!index) index = _filters.indexOf(filter);
  _filters.splice(index, 1);
}

function add (filter) {
  _filters.push(filter);
}

function toggle (filter) {
  let index = _filters.indexOf(filter);
  if (index === -1) {
    add(filter);
  } else {
    remove(filter, index);
  }
}

let FilterStore = assign({}, EventEmitter.prototype, {

  getFilters: function() {
    console.log(_filters);
    return _filters;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

Dispatcher.register(function (action) {

  switch(action.actionType) {

    case 'add':
      add(action.filter);
      FilterStore.emitChange();
      break;

    case 'remove':
      remove(action.filter);
      FilterStore.emitChange();
      break;

    case 'toggle':
      toggle(action.filter);
      FilterStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = FilterStore;

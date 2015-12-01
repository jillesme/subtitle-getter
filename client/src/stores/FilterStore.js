import Dispatcher from '../dispatcher/Dispatcher';
import { EventEmitter } from 'events';
import assign from 'object-assign';
import { ActionTypes, AVAILABLE_FILTER_LANGUAGES } from '../constants/SubtitleConstants';

const CHANGE_EVENT = 'change';

let _state = {
  activeFilters: []
};

function remove (filter, index) {
  if (!index) index = _state.activeFilters.indexOf(filter);
  _state.activeFilters.splice(index, 1);
}

function add (filter) {
  _state.activeFilters.push(filter);
}

function toggle (filter) {
  let index = _state.activeFilters.indexOf(filter);
  if (index === -1) {
    add(filter);
  } else {
    remove(filter, index);
  }
}

let FilterStore = assign({}, EventEmitter.prototype, {

  getState: function() {
    return _state;
  },

  getAvailableFilters: function () {
    return AVAILABLE_FILTER_LANGUAGES;
  },

  hasFilter: function (filter) {
    return _state.activeFilters.indexOf(filter) > -1;
  },

  isFiltering: function () {
    return _state.activeFilters.length > 0;
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

    case ActionTypes.FILTER_ADD:
      add(action.filter);
      FilterStore.emitChange();
      break;

    case ActionTypes.FITLER_REMOVE:
      remove(action.filter);
      FilterStore.emitChange();
      break;

    case ActionTypes.FILTER_TOGGLE:
      toggle(action.filter);
      FilterStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = FilterStore;

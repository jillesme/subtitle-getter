import Dispatcher from '../dispatcher/Dispatcher';
import { EventEmitter } from 'events';
import assign from 'object-assign';
import { ActionTypes } from '../constants/SubtitleConstants';

const CHANGE_EVENT = 'change';

let _state = {
  subtitles: [],
  loading: false,
  error: null
};

function fetch () {
  _state.loading = true;
}

function receive (content) {
  _state.loading = false;
  _state.subtitles = content.subtitles;
}

function reset () {
  _state.subtitles = [];
  _state.error = '';
}

let SubtitleStore = assign({}, EventEmitter.prototype, {

  getState: function () {
    return _state;
  },

  getSubtitles: function() {
    return _subtitles;
  },

  isLoading: function () {
    return _loading;
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

    case ActionTypes.SUBTITLES_FETCH:
      fetch();
      SubtitleStore.emitChange();
      break;

    case ActionTypes.SUBTITLES_RECEIVE:
      receive(action.content);
      SubtitleStore.emitChange();
      break;

    case ActionTypes.SUBTITLES_RESET:
      reset();
      SubtitleStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = SubtitleStore;

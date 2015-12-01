let Dispatcher = require('../dispatcher/Dispatcher');
let EventEmitter = require('events').EventEmitter;
let assign = require('object-assign');
const ActionTypes = require('../constants/SubtitleConstants').ActionTypes;

const CHANGE_EVENT = 'change';

let _subtitles = [];
let _loading = false;
let _error = '';

function fetch () {
  _loading = true;
}

function receive (content) {
  _loading = false;
  _subtitles = content.subtitles;
}

function reset () {
  _subtitles = [];
  _error = '';
}

let SubtitleStore = assign({}, EventEmitter.prototype, {

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

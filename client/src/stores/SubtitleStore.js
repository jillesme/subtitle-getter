let Dispatcher = require('../dispatcher/Dispatcher');
let EventEmitter = require('events').EventEmitter;
let assign = require('object-assign');
const ActionTypes = require('../constants/SubtitleConstants').ActionTypes;

const CHANGE_EVENT = 'change';

let _subtitles = [];
let _error = '';

function get (content) {
  if (content.err) {
    _error = content.error;
  } else {
    _subtitles = content.subtitles;
  }
}

function reset () {
  _subtitles = [];
  _error = '';
}

let SubtitleStore = assign({}, EventEmitter.prototype, {

  getSubtitles: function() {
    if (_error) return _error;
    return _subtitles;
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

    case ActionTypes.SUBTITLES_GET:
      get(action.content);
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

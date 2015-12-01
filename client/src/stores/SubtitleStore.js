import Dispatcher from '../dispatcher/Dispatcher';
import { EventEmitter } from 'events';
import assign from 'object-assign';
import { REMOTE, ActionTypes } from '../constants/SubtitleConstants';
import DOMUtils from '../utils/DOMUtils';

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

function download () {
  _state.loading = true;
}

function receiveUrl (content) {
  _state.loading = false;
  let url = REMOTE + content.url;
  DOMUtils.download(url);
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

    case ActionTypes.SUBTITLES_FETCH_DOWNLOAD:
      download();
      SubtitleStore.emitChange();
      break;

    case ActionTypes.SUBTITLES_RECEIVE_DOWNLOAD:
      receiveUrl(action.content);
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

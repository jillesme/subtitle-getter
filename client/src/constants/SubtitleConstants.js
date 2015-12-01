module.exports = {

  API_URL: 'http://localhost:3030/title/',

  ActionTypes: {
    FILTER_ADD: 'FILTER_ADD',
    FILTER_REMOVE: 'FILTER_REMOVE',
    FILTER_TOGGLE: 'FILTER_TOGGLE',

    SUBTITLES_FETCH: 'SUBTITLES_FETCH',
    SUBTITLES_RECEIVE: 'SUBTITLES_RECEIVE',
    SUBTITLES_RESET: 'SUBTITLES_RESET'
  },

  AVAILABLE_FILTER_LANGUAGES: [
  'Arabic',
  'Brazillian Portuguese',
  'Danish',
  'Dutch',
  'English',
  'Farsi/Persian',
  'Finnish',
  'French',
  'Hebrew',
  'Indonesian',
  'Italian',
  'Norwegian',
  'Romanian',
  'Spanish',
  'Swedish',
  'Vietnamese'
  ]

};

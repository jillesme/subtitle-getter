import React, { Component } from 'react';
import SubtitlesContent from './SubtitlesContent';

let SubtitleStore = require('./stores/SubtitleStore');
let FilterStore = require('./stores/FilterStore');

export default class SubtitleOverview extends Component {
  constructor (props) {
    super(props);
    this.state = {
      error: '',
      languages: {}
    };
    this.subtitlesUpdated = this.subtitlesUpdated.bind(this);
    this.filtersUpdated = this.filtersUpdated.bind(this);
  }
  subtitlesUpdated () {
    // we get an object back: key language, value subtitles
    this.setState({
      languages: SubtitleStore.getSubtitles()
    });
  }
  filtersUpdated () {
    let state = this.state;
    state.filters = FilterStore.getFilters();
    this.setState(state);
  }
  displaySubtitles () {
    if (this.state.error) return (<h1>this.state.error</h1>);
    return Object.keys(this.state.languages)
    .filter(language => {
      // Show everything if no filters are set
      if (!FilterStore.isFiltering()) return true;
      return FilterStore.hasFilter(language);
    })
    .map((language, i) => {
      return (
        <div key={i}>
          <h2>{language}</h2>
          <SubtitlesContent subtitles={this.state.languages[language]} />
        </div>
      )
    });
  }
  render () {
    return (
      <div>
        {this.displaySubtitles()}
      </div>
    );
  }
  componentDidMount () {
    SubtitleStore.addChangeListener(this.subtitlesUpdated);
    FilterStore.addChangeListener(this.filtersUpdated);
  }
  componentWillUnmount () {
    SubtitlesStore.removeChangeListener(this.subtitlesUpdated);
    FilterStore.removeChangeListener(this.filtersUpdated);
  }

}

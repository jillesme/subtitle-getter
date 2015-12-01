import React, { Component } from 'react';
import SubtitlesContent from './SubtitlesContent';

import SubtitleStore from './stores/SubtitleStore';
import FilterStore from './stores/FilterStore';

export default class SubtitleOverview extends Component {
  constructor (props) {
    super(props);
    this.state = SubtitleStore.getState();

    this.subtitlesUpdated = this.subtitlesUpdated.bind(this);
    this.filtersUpdated = this.filtersUpdated.bind(this);
  }
  subtitlesUpdated () {
    // we get an object back: key language, value subtitles
    this.setState(SubtitleStore.getState());
  }
  filtersUpdated () {
    this.setState(FilterStore.getState());
  }
  displaySubtitles () {
    if (this.state.error) return (<h1>{this.state.error}</h1>);
    if (this.state.loading) return (<h1>Loading!</h1>);
    return Object.keys(this.state.subtitles)
    .filter(language => {
      // Show everything if no filters are set
      if (!FilterStore.isFiltering()) return true;
      return FilterStore.hasFilter(language);
    })
    .map((language, i) => {
      return (
        <div key={i}>
          <h2>{language}</h2>
          <SubtitlesContent subtitles={this.state.subtitles[language]} />
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

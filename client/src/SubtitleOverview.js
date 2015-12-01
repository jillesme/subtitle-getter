import React, { Component } from 'react';
import SubtitlesContent from './SubtitlesContent';

import SubtitleStore from './stores/SubtitleStore';
import FilterStore from './stores/FilterStore';

export default class SubtitleOverview extends Component {
  constructor (props) {
    super(props);
    this.state = {
      loading: false,
      error: '',
      languages: {}
    };
    this.subtitlesUpdated = this.subtitlesUpdated.bind(this);
    this.filtersUpdated = this.filtersUpdated.bind(this);
  }
  subtitlesUpdated () {
    // TODO: huge todo, move state to Store and just call SubtitleStore.getState();
    // we get an object back: key language, value subtitles

    if (SubtitleStore.isLoading()) {
      return this.setState({ loading: true });
    } else {
      this.setState({ loading: false });
    }

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
    if (this.state.loading) return (<h1>Loading!</h1>);
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

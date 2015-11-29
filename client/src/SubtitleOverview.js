import React, { Component } from 'react';
import SubtitlesContent from './SubtitlesContent';

let SubtitleStore = require('./stores/SubtitleStore');

export default class SubtitleOverview extends Component {
  constructor (props) {
    super(props);
    this.state = {
      error: '',
      languages: {}
    };
    this.subtitlesUpdated = this.subtitlesUpdated.bind(this);
  }
  subtitlesUpdated () {
    // we get an object back: key language, value subtitles
    this.setState({
      languages: SubtitleStore.getSubtitles()
    });
  }
  displaySubtitles () {
    if (this.state.error) return (<h1>this.state.error</h1>);
    return Object.keys(this.state.languages).map(language => {
      return (
        <div>
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
  }
  componentWillUnmount () {
    SubtitleStore.removeChangeListener(this.subtitlesUpdated);
  }

}

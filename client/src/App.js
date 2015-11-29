import React, { Component } from 'react';
import SubtitleTextInput from './SubtitleTextInput';
import SubtitleOverview from './SubtitleOverview';
import Filter from './Filter';

// The.Blacklist.S03E07.HDTV.x264-FLEET

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>Subtitle Getter</h1>
        <SubtitleTextInput />
        <Filter />

        <SubtitleOverview />
      </div>
    );
  }
}

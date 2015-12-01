import React, { Component } from 'react';
import SubtitleActionCreators from './actions/SubtitleActionCreators';

export default class SubtitlesContent extends Component {
  constructor (props) {
    super(props);

    this.calculateMatchRate = this.calculateMatchRate.bind(this);
    this.showHearingAid = this.showHearingAid.bind(this);
    this.displayList = this.displayList.bind(this);
  }
  calculateMatchRate (rate) {
    return '' + (100 - rate) + '%';
  }
  showHearingAid (isHearingAid) {
    return isHearingAid ? '(HI)' : '';
  }
  downloadSubtitle (url) {
    SubtitleActionCreators.download(encodeURIComponent(url));
  }
  displayList () {
    return this.props.subtitles.map((subtitle, i) => {
      return (<li key={i} onClick={this.downloadSubtitle.bind(this, subtitle.url)}>
              [{this.calculateMatchRate(subtitle.matchRate)}]
              - {subtitle.title} by {subtitle.author} {this.showHearingAid(subtitle.hi)}
              </li>);
    });
  }
  render () {
    return (
      <ul>
       {this.displayList()}
      </ul>
    );
  }
}

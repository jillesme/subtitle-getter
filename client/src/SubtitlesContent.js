import React, { Component } from 'react';

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
  displayList () {
    return this.props.subtitles.map(subtitle => {
      return (<li>
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

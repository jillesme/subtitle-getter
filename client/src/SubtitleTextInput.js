import React, { Component } from 'react';

import SubtitleActions from './actions/SubtitleActionCreators.js';
import SubtitleStore from './stores/SubtitleStore.js';

export default class SubtitleTextInput extends Component {
  constructor (props) {
    super(props);

    this.handlePaste = this.handlePaste.bind(this);
  }
  handlePaste (ev) {
    let title = ev.target.value;
    if (title === '') return SubtitleActions.reset();
    SubtitleActions.get(title);
  }
  render () {
    return (
      <div>
        <input type="text" onChange={this.handlePaste} />
      </div>
    );
  }
}

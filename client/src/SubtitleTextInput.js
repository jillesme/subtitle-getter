import React, { Component } from 'react';
import superagent from 'superagent';

import LoadingIndicator from './LoadingIndicator'
import SubtitleOverview from './SubtitleOverview'

import FilterStore from './stores/FilterStore.js';

export default class SubtitleTextInput extends Component {
  constructor (props) {
    super(props);

    this.state = {
      result: {},
      error: false,
      loading: false
    };

    this.handlePaste = this.handlePaste.bind(this);
    this.displayResult = this.displayResult.bind(this);
  }
  handlePaste (ev) {
    let title = ev.target.value;
    this.setState({ loading: true });
    superagent.get('http://localhost:3030/title/' + title)
      .end((err, response) => {
        let state = { loading: false };
        if (err) {
          state.error = err;
        } else {
          state.result = response.body;
        }
        this.setState(state);
      });
  }
  displayResult () {
    if (!this.state.result) return null;
    let list = Object.keys(this.state.result)
    .filter(language => {
      let filters = FilterStore.getFilters();
      if (filters.length === 0) {
        return true;
      } else {
        return filters.indexOf(language) > -1;
      }
    })
    .map((language, i) => {
      return (<li key={i}>
        <span>{language} - </span> ({this.state.result[language].length})
        <SubtitleOverview results={this.state.result[language]} />
      </li>);
    });
    return (<ul>{list}</ul>);
  }
  render () {
    return (
      <div>
        <input type="text" onChange={this.handlePaste} />
        <LoadingIndicator loading={this.state.loading} />
        {this.displayResult()}
      </div>
    );
  }
}

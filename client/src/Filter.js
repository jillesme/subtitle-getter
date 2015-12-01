import React, { Component } from 'react';
import FilterActions from './actions/FilterActionCreators.js';
import FilterStore from './stores/FilterStore.js';

export default class Filter extends Component {
  constructor (props) {
    super(props);

    this.state = FilterStore.getState();

    this.displayLanguages = this.displayLanguages.bind(this);
    this.toggleFilter = this.toggleFilter.bind(this);
  }
  toggleFilter (ev) {
    let target = ev.target.value;
    FilterActions.toggle(target);

    this.setState(FilterStore.getState());
  }
  displayLanguages () {
    let liStyle = {
      display: 'inline-block'
    };
    return FilterStore.getAvailableFilters().map((language, i) => {
      return (
      <li key={i} style={liStyle}>
        <input type="checkbox" name="language" value={language} onClick={this.toggleFilter}/> {language}
       </li>);
    });
  }
  render () {
    // TODO: Move this into .css
    let ulStyle = {
      listStyle: 'none'
    };
    return (
      <div>
        Filter: {this.state.activeFilters.join(', ')}
          <ul style={ulStyle}>
            {this.displayLanguages()}
          </ul>
      </div>
    );
  }
}

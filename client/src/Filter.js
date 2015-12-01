import React, { Component } from 'react';
import FilterActions from './actions/FilterActionCreators.js';
import FilterStore from './stores/FilterStore.js';
import languages from './languages.js';


export default class Filter extends Component {
  constructor (props) {
    super(props);

    this.state = {
      languages: []
    };

    this.displayLanguages = this.displayLanguages.bind(this);
    this.addOrSplice = this.addOrSplice.bind(this);
  }
  addOrSplice (ev) {
    let target = ev.target.value;
    FilterActions.toggle(target);

    this.setState({
      languages: FilterStore.getFilters()
    });
  }
  displayLanguages () {
    let liStyle = {
      display: 'inline-block'
    };
    return Object.keys(languages).map((language, i) => {
      return (
      <li key={i} style={liStyle}>
        <input type="checkbox" name="language" value={language} onClick={this.addOrSplice}/> {language} 
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
        Filter: {this.state.languages.join(', ')}
          <ul style={ulStyle}>
            {this.displayLanguages()}
          </ul>
      </div>
    );
  }
}

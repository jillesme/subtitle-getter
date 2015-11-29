import React, { Component } from 'react';
import FilterActions from './actions/FilterActions.js';
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
    return Object.keys(languages).map((language, i) => {
      return (<li key={i}><input type="checkbox" name="language" value={language} onClick={this.addOrSplice}/> {language} </li>);
    });
  }
  render () {
    return (
      <div>
        Filter: {this.state.languages.join(', ')}
          <ul>
            {this.displayLanguages()}
          </ul>
      </div>
    );
  }
}

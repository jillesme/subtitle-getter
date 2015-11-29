import React, { Component } from 'react';
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
    let newLangs = this.state.languages;
    let index = newLangs.indexOf(target);
    if (index > -1) {
      newLangs.splice(index, 1);
    } else {
      newLangs.push(target);
    }
    this.setState({
      languages: newLangs
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
        filter: {this.state.languages.join(', ')}
          <ul>
            {this.displayLanguages()}
          </ul>
      </div>
    );
  }
}

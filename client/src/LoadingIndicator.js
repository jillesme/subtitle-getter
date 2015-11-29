import React, { Component } from 'react';

export default class LoadingIndicator extends Component {
  constructor (props) {
    super(props);

    this.displaySpinner = this.displaySpinner.bind(this);
  }
  displaySpinner () {
    if (this.props.loading) {
      // todo: add a spinner or something
      return (<h2>Loading..</h2>);
    } else {
      return null;
    }
  }
  render () {
    return (
      <div>
        {this.displaySpinner()}
      </div>
    );
  }
}
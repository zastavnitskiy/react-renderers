import React from 'react';
import Button from './Button';

export default class Input extends React.Component {
  render() {
    return (<div className="b-input">
      <input className="b-input__input" defaultValue={this.props.defaultValue} />
      <Button>{this.props.buttonText}</Button>
    </div>)
  }
}
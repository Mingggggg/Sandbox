import React from 'react';
import ReactDOM from 'react-dom';

class HelloMessage extends React.Component {
  render() {
    return <div>Hello {this.props.name}</div>;
  }
}

class Previewer extends React.Component {

}
// ReactDOM.render(<HelloMessage name="Sebastian" />, document.getElementById('mount'));

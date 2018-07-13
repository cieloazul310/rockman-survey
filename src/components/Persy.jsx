import React, { Component } from 'react';

class Persy extends Component {
  constructor() {
    super();
    this.state = {
      text: ''
    };
    this.changeText = this.changeText.bind(this);
  }

  componentDidMount() {
    const data = localStorage.getItem('persy-international');
    if (data) {
      this.setState(JSON.parse(data));
    }
  }

  changeText(e) {
    this.setState({
      text: e.target.value
    }, () => {
      localStorage.setItem('persy-international', JSON.stringify(this.state));
    });
  }

  render() {
    return (
      <div>
          {'Form: '}
          <input
            type="text"
            value={this.state.text}
            placeholder="Enter text"
            onChange={this.changeText}
          />
      </div>
    );
  }
}

export default Persy;

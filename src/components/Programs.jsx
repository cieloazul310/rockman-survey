import React, { Component } from 'react';
import csv from '../data/programs.csv';
import csv2json from '../csv2json';

class Programs extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    fetch(csv)
      .then(res => res.text())
      .then(csv => {
        this.setState({data: csv2json(csv)})
      });
  }

  render() {
    return (
      <div>
        {
          this.state.data ? (
            <ul>
              {
                this.state.data.map((d, i) => (
                  <li key={i}>{d.theme}</li>
                ))
              }
            </ul>
          ) : null
        }
      </div>
    );
  }
}

export default Programs;

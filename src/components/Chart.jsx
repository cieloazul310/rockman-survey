import React, { Component } from 'react';
import { scaleBand } from 'd3-scale';
import { max as d3max } from 'd3-array';

import Gumi from './Gumi';

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: {
        width: 760,
        height: 320
      },
      padding: {
        top: 10,
        right: 10,
        bottom: 28,
        left: 10
      }
    };

    const years = this.props.playlist
      .map((d, i) => parseInt(d.year, 10))
      .sort();
    const [min, max] = [years[0], years[years.length - 1]];

    this.data = [];

    for (let i = min; i <= max; i++) {
      this.data.push({
        year: i,
        tunes: this.props.playlist.filter(d => parseInt(d.year, 10) === i)
      });
    }

    this.xScale = scaleBand()
      .domain(this.data.map(d => d.year))
      .range([
        this.state.padding.left,
        this.state.size.width - this.state.padding.right
      ])
      .padding(0.2);

    this.yScale = scaleBand()
      .domain(
        Array.from(
          {
            length: Math.ceil(d3max(this.data, d => d.tunes.length) / 10) * 10
          },
          (d, i) => i + 1
        )
      )
      .range([
        this.state.size.height - this.state.padding.bottom,
        this.state.padding.top
      ])
      .padding(0.2);

    this.fillScale = this.props.fillScale;
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <svg
          viewBox={`0 0 ${this.state.size.width} ${
            this.state.size.height
          }`} /*width={this.state.size.width} height={this.state.size.height}*/
        >
          <g>
            {[10, 20].map((d, i) => (
              <g key={i} transform={`translate(0, ${this.yScale(d)})`}>
                <line x2={this.state.size.width} stroke="#eee" />
                <text textAnchor="start" y={this.yScale.bandwidth()}>
                  {d}
                </text>
              </g>
            ))}
          </g>
          {this.data
            ? this.data.map((d, i) => (
                <g transform={`translate(${this.xScale(d.year)}, 0)`} key={i}>
                  {d.tunes.length
                    ? d.tunes
                        .filter(d => d.corner !== '漫遊前の一曲')
                        .map((v, index) => (
                          <Gumi
                            d={v}
                            index={index}
                            key={index}
                            xScale={this.xScale}
                            yScale={this.yScale}
                            fillScale={this.fillScale}
                            selectedTunes={this.props.selectedTunes}
                          />
                        ))
                    : null}
                </g>
              ))
            : null}
          <g
            transform={`translate(0, ${this.state.size.height -
              this.state.padding.bottom})`}
          >
            {[1960, 1970, 1980, 1990, 2000, 2010, 2017].map((d, i) => (
              <g
                key={i}
                transform={`translate(${this.xScale(d) +
                  this.xScale.bandwidth() / 2}, 0)`}
              >
                <line y1={3} y2={-3} stroke="black" />
                <text dy="1.2em" textAnchor="middle">
                  {d}
                </text>
              </g>
            ))}
          </g>
        </svg>
      </div>
    );
  }
}

export default Chart;

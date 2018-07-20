import React, { Component } from 'react';
import { Checkbox } from 'react-bootstrap';
import { scaleBand } from 'd3-scale';
import { max as d3max } from 'd3-array';

import Gumi from './Gumi';

import './Chart.css';

const XAxis = ({ xScale, size, padding, step = 10 }) => (
  <g transform={`translate(0, ${size.height - padding.bottom})`} className="x-axis">
    {scale2axis(xScale, step).map((d, i) => (
      <g
        key={i}
        className="ticks"
        transform={`translate(${xScale(d) + xScale.bandwidth() / 2}, 0)`}
      >
        <line y1={3} y2={-3} />
        <text dy="1.2em" textAnchor="middle">
          {d}
        </text>
      </g>
    ))}
  </g>
);

const YAxis = ({ yScale, size, padding, step = 10 }) => (
  <g className="y-axis">
    {scale2axis(yScale, step)
      .slice(1)
      .map((d, i) => (
        <g key={i} className="ticks" transform={`translate(0, ${yScale(d)})`}>
          <line x2={size.width} />
          <text textAnchor="end" dx="1.2em" y={yScale.bandwidth()}>
            {d}
          </text>
        </g>
      ))}
  </g>
);

const ChartSettings = ({ active, onClick }) => (
  <div className="chart-settings">
    <Checkbox
      checked={active}
      onClick={() => {
        onClick();
      }}
    >
      {'漫遊前の一曲を表示する'}
    </Checkbox>
  </div>
);

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showOverture: false
    };

    this.sortGumis = this.sortGumis.bind(this);
  }

  size = {
    width: 760,
    height: 320
  };
  padding = {
    top: 10,
    right: 10,
    bottom: 28,
    left: 10
  };
  data = tributeByYear(this.props.playlist);
  xScale = scaleBand().domain(this.data.map(d => d.year))
  .range([
    this.padding.left,
    this.size.width - this.padding.right
  ])
  .padding(0.2);
  yScale = scaleBand().domain(
    Array.from(
      {
        length: Math.ceil(d3max(this.data, d => d.tunes.length) / 10) * 10
      },
      (d, i) => i + 1
    )
  )
  .range([
    this.size.height - this.padding.bottom,
    this.padding.top
  ])
  .padding(0.2);

  componentDidMount() {}

  sortGumis(a, b) {
    const { selected } = this.props;
    const { key, label, tunes } = selected;
    if (key !== null && label !== null) {
      if (tunes.indexOf(a.id) >= 0) {
        return -1;
      } else {
        return 1;
      }
    } else {
      return 0;
    }
  }

  render() {
    return (
      <div className="chart-container">
        <svg
          className="chart"
          viewBox={`0 0 ${this.size.width} ${
            this.size.height
          }`} /*width={this.state.size.width} height={this.state.size.height}*/
        >
          <YAxis yScale={this.yScale} size={this.size} step={5} />
          <g className="gumis">
          {this.data.length
            ? this.data.map((d, i) => (
                <g transform={`translate(${this.xScale(d.year)}, 0)`} key={i}>
                  {d.tunes.length
                    ? d.tunes
                        .filter(
                          d =>
                            this.state.showOverture ||
                            d.corner !== '漫遊前の一曲'
                        )
                        .sort(this.sortGumis)
                        .map((v, index) => (
                          <Gumi
                            d={v}
                            index={index}
                            key={index}
                            xScale={this.xScale}
                            yScale={this.yScale}
                            fill={this.props.fillScale(v.nation)}
                            selectedTunes={this.props.selected.tunes}
                          />
                        ))
                    : null}
                </g>
              ))
            : null}
          </g>
          <XAxis xScale={this.xScale} size={this.size} padding={this.padding} />
        </svg>
        <ChartSettings
          active={this.state.showOverture}
          onClick={() => {
            this.setState(prev => ({
              showOverture: !prev.showOverture
            }));
          }}
        />
      </div>
    );
  }
}

function tributeByYear(playlist) {
  // return Array
  const data = [];
  const years = playlist.map((d, i) => d.year).sort();
  const [min, max] = [years[0], years[years.length - 1]];

  for (let i = min; i <= max; i++) {
    data.push({
      year: i,
      tunes: playlist.filter(d => d.year === i)
    });
  }

  return data;
}

function scale2axis(scale, step = 10) {
  const domain = scale.domain();
  const min = domain[0];
  const max = domain[domain.length - 1];
  const min_ceil = Math.ceil(min / step) * step;
  const max_floor = Math.floor(max / step) * step;
  const axis = Array.from(
    { length: (max_floor - min_ceil) / step + 1 },
    (d, i) => min_ceil + i * step
  );

  if (min_ceil - min > step / 2) axis.unshift(min);
  if (max - max_floor >= step / 2) axis.push(max);

  return axis;
}

export default Chart;

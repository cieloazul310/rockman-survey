import React, { Component } from 'react';
import { csv as d3csv } from 'd3-fetch';

import AppHeader from './components/AppHeader';
import AppMain from './components/AppMain';
import playlist from './data/playlist-playlist.csv';
import programs from './data/programs-programs.csv';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      programs: null,
      playlist: null,
      selected: { key: null, label: null, tunes: [] }
    };

    this.onFilterSelected = this.onFilterSelected.bind(this);
  }

  componentDidMount() {
    Promise.all([d3csv(playlist), d3csv(programs)]).then(data => {
      const playlist = data[0].map((d, i) =>
        Object.assign({ selected: false }, d)
      );
      const programs = data[1].map((d, i) => {
        const tunes = playlist.filter(v => v.week === d.week);
        return Object.assign({ type: 'programs', selected: false, tunes }, d);
      });

      this.setState({
        playlist: playlist,
        programs: programs
      });
    });
  }

  onFilterSelected(d, label) {
    const tunes = d.tunes.map(v => v.id);
    const neu = { key: label, label: d[label], tunes };
    this.setState(prev => ({
      selected:
        prev.selected.key !== label || prev.selected.label !== d[label]
          ? neu
          : { key: null, label: null, tunes: [] }
    }));
  }

  render() {
    return (
      <div>
        <AppHeader />
        <div className="app-main">
          {this.state.playlist !== null && this.state.programs !== null ? (
            <AppMain
              playlist={this.state.playlist}
              programs={this.state.programs}
              selected={this.state.selected}
              onFilterSelected={this.onFilterSelected}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default App;

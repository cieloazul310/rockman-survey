import React, { Component } from 'react';
import { csv as d3csv } from 'd3-fetch';

import AppHeader from './components/AppHeader';
import AppMain from './components/AppMain';
import Footer from './components/Footer';
import ScrollUp from './components/ScrollUp';
import playlist from './data/playlist-playlist.csv';
import programs from './data/programs-programs.csv';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      programs: null,
      playlist: null,
    };
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
        {ScrollUp}
        {Footer}
      </div>
    );
  }
}

export default App;

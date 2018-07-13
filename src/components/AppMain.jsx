import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Legends from './Legends';
import Chart from './Chart';
import Playlist from './Playlist';
import SidePanel from './SidePanel';
import AdBox from './AdBox';

import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import { sortByArtist } from '../sortFunctions';
import tribution from '../tribution';

class AppMain extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: { key: null, label: null, tunes: [] },
      favs: []
    };
    this.onFilterSelected = this.onFilterSelected.bind(this);
    this.onFavClick = this.onFavClick.bind(this);
    this.showFavs = this.showFavs.bind(this);
    this.parseHash = this.parseHash.bind(this);
  }

  tributes = {
    week: this.props.programs,
    artist: tribution(
      this.props.playlist,
      ['artist', 'kana', 'nation'],
      (a, b) => b.tunes.length - a.tunes.length || sortByArtist(a, b)
    ),
    nation: tribution(
      this.props.playlist,
      'nation',
      (a, b) =>
        b.tunes.length - a.tunes.length || a.nation.localeCompare(b.nation)
    ),
    corner: tribution(this.props.playlist, 'corner').filter(
      d => d.corner !== ''
    )
  };

  fillScale = scaleOrdinal(schemeCategory10).domain(
    this.tributes.nation.map(d => d.nation)
  );

  componentDidMount() {
    // hash値を解析してsetStateする
    this.parseHash();

    // localStorageからfavsを取得する
    const storageFavs = localStorage.getItem('rockman-favs');
    if (storageFavs) {
      this.setState({
        favs: JSON.parse(storageFavs)
      });
    }
  }

  onFilterSelected(d, label) {
    const tunes = d.tunes.map(v => v.id);
    const neu = { key: label, label: d[label], tunes };
    this.setState(
      prev => ({
        selected:
          prev.selected.key !== label || prev.selected.label !== d[label]
            ? neu
            : { key: null, label: null, tunes: [] }
      }),
      () => {
        if (
          this.state.selected.key !== null &&
          this.state.selected.label !== null
        ) {
          const hash = `#${label}=${d[label]}`;

          window.history.pushState(this.state, '', hash);
        } else {
          window.history.pushState(this.state, '', '#');
        }
      }
    );
  }

  onFavClick(d) {
    this.setState(prev => ({
      favs:
        prev.favs.indexOf(d.id) >= 0
          ? prev.favs.filter(v => d.id !== v)
          : [...prev.favs, d.id]
    }), () => {
      localStorage.setItem('rockman-favs', JSON.stringify(this.state.favs));
    });
  }

  showFavs() {
    if (this.state.favs.length) {
      const neu = {
        key: 'favs',
        label: 'favs',
        tunes: this.state.favs
      };
      this.setState(
        prev => ({
          selected:
            prev.selected.key !== 'favs' || prev.selected.label !== 'favs'
              ? neu
              : { key: null, label: null, tunes: [] }
        }),
        () => {
          if (
            this.state.selected.key !== null &&
            this.state.selected.label !== null
          ) {
            const hash = `#favs`;

            window.history.pushState(this.state, '', hash);
          } else {
            window.history.pushState(this.state, '', '#');
          }
        }
      );
    }
  }

  parseHash() {
    if (window.location.hash !== '') {
      const hash = window.location.hash;
      const parts = hash.slice(1).split('=');

      if (parts.length === 1 && parts[0] === 'favs') {
        this.setState({
          key: 'favs',
          label: 'favs',
          tunes: this.state.favs
        });
      } else if (parts.length === 2) {
        const neu = {key: parts[0], label: parts[1], tunes: this.tributes[parts[0]].filter(d => d[parts[0]] === decodeURI(parts[1]))[0].tunes.map(d => d.id)};
        this.setState({
          selected: neu
        });
      }

    }
  }

  render() {
    const selected = this.state.selected;
    const playlist = selected.tunes.length
      ? this.props.playlist.filter(d => selected.tunes.indexOf(d.id) >= 0)
      : this.props.playlist;

    return (
      <Grid>
        <Row>
          <Col sm={12} md={8} style={{ height: '100%' }}>
            <Legends
              data={this.tributes.nation}
              label="nation"
              scale={this.fillScale}
              filter={(d, i, arr) =>
                arr
                  .sort((a, b) => b.tunes.length - a.tunes.length)
                  .map(v => v.nation)
                  .indexOf(d.nation) < 5
              }
            />
            <Chart
              playlist={playlist}
              selected={selected}
              fillScale={this.fillScale}
            />
            <div>
              <button
                onClick={() => {
                  this.showFavs();
                }}
              >
                Fav Filter
              </button>
            </div>
            <Playlist
              playlist={playlist}
              fillScale={this.fillScale}
              favs={this.state.favs}
              onFavClick={this.onFavClick}
            />
          </Col>
          <SidePanel
            tributes={this.tributes}
            selected={selected}
            onFilterSelected={this.onFilterSelected}
            fillScale={this.fillScale}
          />
        </Row>
        <Row>
          <Col sm={12}>
            <div style={{ marginTop: '2em' }}>
              <AdBox />
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default AppMain;

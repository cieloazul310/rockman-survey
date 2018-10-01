import React, { Component } from 'react';
import { Tab } from 'react-bootstrap';
import AppNavbar from './AppNavbar';
import Apps from './Apps';

import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import { sortByArtist } from '../sortFunctions';
import tribution from '../tribution';

class AppMain extends Component {
  /** Props: playlist, programs
   * State: selected, favs
   * Const: tributes, fillScale
   * func: onFilterSelected, onFavClick, showFavs
   */
  constructor(props) {
    super(props);

    this.state = {
      selected: { key: null, label: null, tunes: [] },
      favs: [],
      tab: window.innerWidth < 768 ? 1 : 2.1,
      isMobile: window.innerWidth < 768
    };
    this.onFilterSelected = this.onFilterSelected.bind(this);
    this.onFavClick = this.onFavClick.bind(this);
    this.showFavs = this.showFavs.bind(this);
    this.parseHash = this.parseHash.bind(this);
    this.handleTab = this.handleTab.bind(this);
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
      'nation'
    ),
    corner: tribution(this.props.playlist, 'corner').filter(
      d => d.corner !== ''
    )
  };

  fillScale = scaleOrdinal(schemeCategory10).domain(
    ['JPN', 'UK', 'US', ...this.tributes.nation.map(d => d.nation).slice(3)]
  );

  componentDidMount() {
    window.addEventListener('resize', e => {
      const isMobile = this.state.isMobile;
      if (e.target.innerWidth < 768 && !isMobile) {
        // Desktop => Mobile
        this.setState(prev => ({
          isMobile: !prev.isMobile,
          tab: 1
        }));
      } else if (e.target.innerWidth >= 768 && isMobile) {
        // Mobile => Desktop
        this.setState(prev => ({
          isMobile: !prev.isMobile,
          tab: 2.1
        }));
      }
    });
    // localStorageからfavsを取得する
    const storageFavs = localStorage.getItem('rockman-favs');
    if (storageFavs) {
      this.setState(
        {
          favs: JSON.parse(storageFavs)
        },
        () => {
          // hash値を解析してsetStateする
          this.parseHash();
        }
      );
    } else {
      // hash値を解析してsetStateする
      this.parseHash();
    }
  }

  handleTab(tab) {
    if (tab === undefined) return;
    this.setState({
      tab: tab
    });
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
    this.setState(
      prev => ({
        favs:
          prev.favs.indexOf(d.id) >= 0
            ? prev.favs.filter(v => d.id !== v)
            : [...prev.favs, d.id]
      }),
      () => {
        localStorage.setItem('rockman-favs', JSON.stringify(this.state.favs));
      }
    );
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
          selected: neu,
          tab: prev.isMobile ? 1 : prev.tab
        }),
        () => {
          if (
            this.state.selected.key !== null &&
            this.state.selected.label !== null
          ) {
            const hash = `#favs`;

            window.history.pushState(this.state, '', hash);
          }
        }
      );
    } else {
      this.setState({
        tab: 2.5
      })
    }
  }

  parseHash() {
    if (window.location.hash === '') return;
    const hash = window.location.hash;
    const parts = hash.slice(1).split('=');

    if (parts.length === 1 && parts[0] === 'favs') {
      // https://cieloazul310.github.io/rockman-survey/#favs
      this.setState({
        selected: {
          key: 'favs',
          label: 'favs',
          tunes: this.state.favs
        },
        tab: 1
      });
    } else if (parts.length === 2) {
      // https://cieloazul310.github.io/rockman-survey/#week=2
      const key = parts[0];
      const label = decodeURI(parts[1]);

      if (!this.tributes.hasOwnProperty(key)) return;
      if (!this.tributes[key].filter(d => d[key] === label).length) return;

      const neu = {
        key: key,
        label: label,
        tunes: this.tributes[key]
          .filter(d => d[key] === label)[0]
          .tunes.map(d => d.id)
      };
      this.setState(prev => ({
        selected: neu,
        tab: prev.isMobile ? 1 : selected2tab(neu)
      }));
    }
  }

  render() {
    const selected = this.state.selected;
    /*
    const playlist = selected.tunes.length
      ? this.props.playlist.filter(d => selected.tunes.indexOf(d.id) >= 0)
      : this.props.playlist;
      */
    const playlist = this.props.playlist.map(d => ({
      ...d,
      fav: this.state.favs.indexOf(d.id) >= 0,
      selected: this.state.selected.tunes.indexOf(d.id) >= 0
    }));

    const selectedLength =
      selected.key !== null ? selected.tunes.length : playlist.length;

    return (
      <Tab.Container
        id="rockman-menu"
        defaultActiveKey={2.1}
        onSelect={tab => {
          this.handleTab(tab);
        }}
        activeKey={this.state.tab}
      >
        <div>
          <AppNavbar
            tributes={this.tributes}
            isMobile={this.state.isMobile}
            showFavs={this.showFavs}
            state={this.state}
            playlistLength={selectedLength}
          />
          <Apps
            playlist={playlist}
            isMobile={this.state.isMobile}
            selected={this.state.selected}
            playlistLength={selectedLength}
            favs={this.state.favs}
            fillScale={this.fillScale}
            onFavClick={this.onFavClick}
            onFilterSelected={this.onFilterSelected}
            tributes={this.tributes}
            removeSelected={() => {
              this.setState(
                {
                  selected: { key: null, label: null, tunes: [] }
                },
                () => {
                  window.history.pushState(this.state, '', '#');
                }
              );
            }}
          />
        </div>
      </Tab.Container>
    );
  }
}

function selected2tab(selected) {
  const { key } = selected;
  return key === null
    ? 1
    : key === 'week'
      ? 2.1
      : key === 'artist'
        ? 2.2
        : key === 'nation'
          ? 2.3
          : key === 'corner'
            ? 2.4
            : key === 'favs'
              ? 2.1
              : 1;
}

export default AppMain;

import React, { Component } from 'react';
import {
  ListGroup,
  ListGroupItem,
  Badge,
  Label,
  Glyphicon
} from 'react-bootstrap';
import SortHandler from './SortHandler';

import { sortDefault } from '../sortFunctions';

import './Playlist.css';

const Fav = ({ d, favs, onFavClick }) => (
  <span
    className={favs.indexOf(d.id) >= 0 ? 'fav active' : 'fav'}
    onClick={() => {
      onFavClick(d);
    }}
    title="お気に入り"
  >
    <Glyphicon glyph="star" />
  </span>
);

const PlayTube = ({ d }) => (
  <span style={{ marginRight: '.8em' }}>
    <a
      href={`https://youtu.be/${d.youtube}`}
      target="_blank"
      rel="noopener noreferrer"
      title="Watch on Youtube"
    >
      <Glyphicon glyph="music" />
    </a>
  </span>
);

const Buttons = ({ d, favs, onFavClick }) => (
  <div style={{ position: 'absolute', right: '1em', top: '1em' }}>
    {d.youtube ? <PlayTube d={d} /> : null}
    <Fav d={d} favs={favs} onFavClick={onFavClick} />
  </div>
);

const PlaylistItem = ({ d, i, fill, favs, onFavClick }) => (
  <ListGroupItem
    className="playlist-item"
    style={{
      borderLeft: `2px solid ${fill}`,
      boxSizing: 'border-box',
      transition: 'border .25s'
    }}
  >
    <p>
      <small>{`Week${d.week} ${d.corner}`}</small>
    </p>
    <h4>{`${i + 1}.  ${d.name}`}</h4>
    {d.artist + ' '}
    <small>
      {`/ ${d.year} `}
      <Label style={{ backgroundColor: fill }}>{d.nation}</Label>
    </small>
    <Buttons d={d} favs={favs} onFavClick={onFavClick} />
  </ListGroupItem>
);

class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortType: { label: 'オンエア順', sortType: sortDefault, desc: false },
      sortDesc: false,
      favs: []
    };

    this.onSortRuleClick = this.onSortRuleClick.bind(this);
    this.onSortTypeClick = this.onSortTypeClick.bind(this);
    this.onFavClick = this.onFavClick.bind(this);
  }

  onSortRuleClick() {
    this.setState(prev => ({
      sortDesc: !prev.sortDesc
    }));
  }

  onSortTypeClick(d) {
    this.setState({
      sortType: d
    });
  }

  onFavClick(d) {
    this.setState(prev => ({
      favs:
        prev.favs.indexOf(d.id) >= 0
          ? prev.favs.filter(v => d.id !== v)
          : [...prev.favs, d.id]
    }));
  }

  render() {
    const { playlist, fillScale, favs, onFavClick, filterTitle } = this.props;
    return (
      <ListGroup>
        <SortHandler
          sortDesc={this.state.sortDesc}
          sortType={this.state.sortType}
          onSortRuleClick={this.onSortRuleClick}
          onSortTypeClick={this.onSortTypeClick}
        />
        {playlist
          .sort(
            (a, b) =>
              this.state.sortDesc
                ? -this.state.sortType.sortType(a, b)
                : this.state.sortType.sortType(a, b)
          )
          .map((d, i) => (
            <PlaylistItem
              key={i}
              d={d}
              i={i}
              fill={fillScale(d.nation)}
              favs={favs}
              onFavClick={onFavClick}
            />
          ))}
      </ListGroup>
    );
  }
}

export default Playlist;

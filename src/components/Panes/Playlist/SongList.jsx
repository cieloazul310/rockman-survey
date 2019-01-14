import React, { Component } from 'react';
import {
  ListGroup,
  ListGroupItem,
  Label,
  Glyphicon
} from 'react-bootstrap';
import SortHandler from './SortHandler';

import { sortDefault } from '../../../sortFunctions';

import './SongList.css';

const Fav = ({ d, onFavClick }) => (
  <span
    className={d.fav ? 'fav active' : 'fav'}
    onClick={() => {
      onFavClick(d);
    }}
    title="お気に入り"
  >
    <Glyphicon glyph="star" />
  </span>
);

const PlayTube = ({ d }) => (
  <span className="playtube">
    <a href={`https://youtu.be/${d.youtube}`} target="_blank" rel="noopener noreferrer" title="Watch on Youtube">
      <Glyphicon glyph="music" />
    </a>
  </span>
);

const Buttons = ({ d, onFavClick }) => (
  <div className="playlist-item-buttons">
    {d.youtube ? <PlayTube d={d} /> : null}
    <Fav d={d} onFavClick={onFavClick} />
  </div>
);

const PlaylistItem = ({ d, i, color, onFavClick }) => (
  <ListGroupItem style={{borderLeft: `2px solid ${color}`}}>
    <p>
      <small>{`Week ${d.week} ${d.corner}`}</small>
    </p>
    <h4>{`${i + 1}.  ${d.name}`}</h4>
    <span title={d.kana || d.artist}>{d.artist + ' '}</span>
    <small>
      {`| ${d.year} `}
      <Label style={{ backgroundColor: color }}>{d.nation}</Label>
    </small>
    <Buttons d={d} onFavClick={onFavClick} />
  </ListGroupItem>
);

class SongList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortType: { label: 'オンエア順', sortType: sortDefault },
      sortDesc: false
    };

    this.onSortRuleClick = this.onSortRuleClick.bind(this);
    this.onSortTypeClick = this.onSortTypeClick.bind(this);
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

  render() {
    const { playlist, fillScale, onFavClick, selection } = this.props;
    return (
      <ListGroup>
        <SortHandler
          sortDesc={this.state.sortDesc}
          sortType={this.state.sortType}
          onSortRuleClick={this.onSortRuleClick}
          onSortTypeClick={this.onSortTypeClick}
        />
        {playlist
          .filter(d => selection ? d.selected : true)
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
              color={fillScale(d.nation)}
              onFavClick={onFavClick}
            />
          ))}
      </ListGroup>
    );
  }
}

export default SongList;

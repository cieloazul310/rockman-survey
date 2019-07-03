import React, { Component } from 'react';
import {
  /*ListGroup, ListGroupItem, Label,*/ Glyphicon
} from 'react-bootstrap';
import { List } from 'react-virtualized';
import SortHandler from './SortHandler';

import { sortDefault } from '../../../sortFunctions';

import './SongList.css';

// removed
/*
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
*/

const PlayTube = ({ d }) => (
  <span className="playtube">
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
/*
const Buttons = ({ d }) => (
  <div className="playlist-item-buttons">
    {d.youtube ? <PlayTube d={d} /> : null}
  </div>
);
*/
/*
const PlaylistItem = ({ d, i, color, style }) => (
  <ListGroupItem style={{ ...style, borderLeft: `2px solid ${color}` }}>
    <p>
      <small>{`Week ${d.week} ${d.corner}`}</small>
    </p>
    <h4>{`${i + 1}.  ${d.name}`}</h4>
    <div className="list-artist">
      <span title={d.kana || d.artist}>{d.artist + ' '}</span>
      <small>
        {`| ${d.year} `}
        <Label style={{ backgroundColor: color }}>{d.nation}</Label>
      </small>
    </div>
    <Buttons d={d} />
  </ListGroupItem>
);
*/
function PlaylistItem({ d, i, color, width, style }) {
  return (
    <div
      className="playlist-item"
      style={{ ...style, borderLeft: `2px solid ${color}` }}
    >
      <div className="playlist-item-header">{`Week ${d.week} ${d.corner}`}</div>
      <div
        className={
          width > 380
            ? 'playlist-item-main'
            : 'playlist-item-main playlist-item-main-xs'
        }
      >
        <div className="playlist-item-name">
          {`${i + 1}. ${d.name} `}
          {d.youtube ? <PlayTube d={d} /> : null}
        </div>
        <div className="playlist-item-blank" />
        <div className="playlist-item-artist">
          <span style={{ borderBottom: `2px solid ${color}` }}>{`${d.artist} (${
            d.year
          }・${d.nation})`}</span>
        </div>
      </div>
    </div>
  );
}

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
    const { playlist, fillScale, selection, width } = this.props;
    const data = playlist
      .filter(d => (selection ? d.selected : true))
      .sort((a, b) =>
        this.state.sortDesc
          ? -this.state.sortType.sortType(a, b)
          : this.state.sortType.sortType(a, b)
      );
    return (
      <div>
        <SortHandler
          sortDesc={this.state.sortDesc}
          sortType={this.state.sortType}
          onSortRuleClick={this.onSortRuleClick}
          onSortTypeClick={this.onSortTypeClick}
        />
        <List
          width={width}
          height={800}
          rowCount={data.length}
          rowHeight={88}
          rowRenderer={({ key, index, style }) => (
            <PlaylistItem
              key={key}
              d={data[index]}
              width={width}
              i={index}
              color={fillScale(data[index].nation)}
              style={style}
            />
          )}
        />
        {
          // removed
          /*playlist
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
          ))*/
        }
      </div>
    );
  }
}

export default SongList;

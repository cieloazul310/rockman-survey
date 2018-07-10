import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Badge, Label } from 'react-bootstrap';
import SortHandler from './SortHandler';

import { sortDefault } from '../sortFunctions';

const PlaylistItem = ({ d, i, fillScale }) => (
  <ListGroupItem>
    <p>
      <small>{`Week${d.week} ${d.corner}`}</small>
    </p>
    <h4>{`${i + 1}.  ${d.name}`}</h4>
    {d.artist + ' '}
    <small>
      {`/ ${d.year} `}
      <Label style={{ backgroundColor: fillScale(d.nation) }}>{d.nation}</Label>
    </small>
  </ListGroupItem>
);

class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortType: {label: 'オンエア順', sortType: sortDefault},
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
    const { playlist, fillScale } = this.props;
    return (
      <ListGroup>
        <h3>
          Playlist <Badge>{playlist.length}</Badge>
        </h3>
        <SortHandler
          sortDesc={this.state.sortDesc}
          sortType={this.state.sortType}
          onSortRuleClick={this.onSortRuleClick}
          onSortTypeClick={this.onSortTypeClick}
        />
        {playlist
          .sort((a, b) => this.state.sortDesc ? - this.state.sortType.sortType(a, b) : this.state.sortType.sortType(a, b))
          .map((d, i) => (
            <PlaylistItem key={i} d={d} i={i} fillScale={fillScale} />
          ))}
      </ListGroup>
    );
  }
}

export default Playlist;

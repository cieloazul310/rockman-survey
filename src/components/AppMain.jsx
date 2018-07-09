import React, { Component } from 'react';
import {
  Grid,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Badge
} from 'react-bootstrap';
import Chart from './Chart';
import FilterPanel from './FilterPanel';

import {
  sortDefault,
  sortByYear,
  sortByArtist,
  sortByNation
} from '../sortFunctions';
import tribution from '../tribution';

class AppMain extends Component {
  constructor(props) {
    super(props);

    this.byArtist = tribution(this.props.playlist, 'artist', (a, b) => b.tunes.length - a.tunes.length || a.artist.localeCompare(b.artist));
    this.byNation = tribution(this.props.playlist, 'nation', (a, b) => b.tunes.length - a.tunes.length);
    this.byCorner = tribution(this.props.playlist, 'corner').filter(d => d.corner !== '');
  }
  /*
  componentDidUpdate() {
    console.log(this.props);
  }
*/
  render() {
    const { programs, selected, onFilterSelected } = this.props;
    const playlist = selected.tunes.length ? this.props.playlist.filter(d => selected.tunes.indexOf(d.id) >= 0) : this.props.playlist;
    return (
      <Grid>
        <Row>
          <Col sm={12} md={8}>
            <Chart
              playlist={playlist}
              programs={programs}
              selectedTunes={selected.tunes}
            />
            <ListGroup>
              <h3>
                Playlist{' '}
                <Badge>
                  {
                    playlist.length
                  }
                </Badge>
              </h3>
              {playlist
                .map((d, i) => (
                  <ListGroupItem key={i} active={d.selected}>
                    {d.corner !== '' ? (
                      <p>
                        <small>{d.corner}</small>
                      </p>
                    ) : null}
                    <h4>{`${i + 1}.  ${d.name}`}</h4>
                    {d.artist} <small>{`- ${d.year} ${d.nation}`}</small>
                  </ListGroupItem>
                ))}
            </ListGroup>
          </Col>
          <Col sm={12} md={4}>
            <h3 id="programs">
              Programs <Badge>{programs.length}</Badge>
            </h3>
            <div style={{ height: window.innerHeight, overflowX: 'scroll' }}>
              <ListGroup>
                {programs.map((d, i) => (
                  <ListGroupItem
                    key={i}
                    active={d.selected}
                    onClick={() => {
                      onFilterSelected(d, 'week');
                    }}
                  >
                    {`${d.week}. ${d.theme}`}
                    <br />
                    <small>{d.date}</small>
                  </ListGroupItem>
                ))}
              </ListGroup>
            </div>
            <FilterPanel id="artists" title="Artists" data={this.byArtist} label="artist" onClick={onFilterSelected} />
            <FilterPanel id="countries" title="Countries" data={this.byNation} label="nation" onClick={onFilterSelected} />
            <FilterPanel id="corner" title="Corner" data={this.byCorner} label="corner" onClick={onFilterSelected} />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default AppMain;

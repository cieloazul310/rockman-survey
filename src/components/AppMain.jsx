import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Legends from './Legends';
import Chart from './Chart';
import Playlist from './Playlist';
import SidePanel from './SidePanel';

import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import { sortByArtist } from '../sortFunctions';
import tribution from '../tribution';

class AppMain extends Component {
  constructor(props) {
    super(props);

    this.byArtist = tribution(
      this.props.playlist,
      ['artist', 'kana', 'nation'],
      (a, b) => b.tunes.length - a.tunes.length || sortByArtist(a, b)
    );
    this.byNation = tribution(
      this.props.playlist,
      'nation',
      (a, b) =>
        b.tunes.length - a.tunes.length || a.nation.localeCompare(b.nation)
    );
    this.byCorner = tribution(this.props.playlist, 'corner').filter(
      d => d.corner !== ''
    );

    this.fillScale = scaleOrdinal(schemeCategory10).domain(
      this.byNation.map(d => d.nation)
    );
  }
  /*
  componentDidUpdate() {
    console.log(this.props);
  }
*/
  render() {
    const { programs, selected, onFilterSelected } = this.props;
    const playlist = selected.tunes.length
      ? this.props.playlist.filter(d => selected.tunes.indexOf(d.id) >= 0)
      : this.props.playlist;
    return (
      <Grid>
        <Row>
          <Col sm={12} md={8} style={{ height: '100%' }}>
            <Legends
              data={this.byNation}
              label="nation"
              scale={this.fillScale}
              filter={(d, i, arr) =>
                arr
                  .sort((a, b) => b.tunes.length - a.tunes.length)
                  .map(v => v.nation)
                  .indexOf(d.nation) < 4
              }
            />
            <Chart
              playlist={playlist}
              programs={programs}
              selectedTunes={selected.tunes}
              fillScale={this.fillScale}
            />
            <Playlist playlist={playlist} fillScale={this.fillScale} />
          </Col>
          <SidePanel
            programs={programs}
            selected={selected}
            onFilterSelected={onFilterSelected}
            byArtist={this.byArtist}
            byNation={this.byNation}
            byCorner={this.byCorner}
          />
        </Row>
      </Grid>
    );
  }
}

export default AppMain;

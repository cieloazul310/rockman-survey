import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import './Analizer.css';

class Analizer extends Component {
  /*
  constructor(props) {
    super(props);
    this.mapRegion = this.mapRegion.bind(this);
  }

  componentDidMount() {
    this.mapRegion();
    console.log(this.state);
  }

  mapRegion() {
    const regions = this.props.playlist.map(d => d.nation);
    const nations = {};

    this.props.playlist.forEach((d, i) => {
      if (nations.hasOwnProperty(d.nation)) {
        nations[d.nation] = [d];
      } else {
        nations[d.nation].push(d);
      }
    });

    this.setState({
      nations
    });
  }
*/
  render() {
    const playlist = this.props.playlist;
    return (
      <div>
        <Grid>
          <Row>
            {playlist.map((d, i) => (
              <Col
                sm={6}
                md={3}
                key={i}
                onClick={() => {
                  this.props.selectTune(d);
                }}
              >
                <h3>
                  {d.name} <br />
                  <small>{d.artist}</small>
                </h3>
              </Col>
            ))}
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Analizer;

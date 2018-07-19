import React, { Component } from 'react';
import { Grid, Row, Col, Tab } from 'react-bootstrap';

import Playlist from './Panes/Playlist';
import Programs from './Panes/Programs';
import Artists from './Panes/Artists';
import Countries from './Panes/Countries';
import Corners from './Panes/Corners';
import About from './Panes/About';

const AppForMobile = ({
  playlist,
  selected,
  favs,
  fillScale,
  onFavClick,
  tributes,
  onFilterSelected
}) => (
  <Row>
    <Col xs={12} smHidden mdHidden lgHidden>
      <Tab.Content animation>
        <Tab.Pane eventKey={1}>
          <Playlist
            playlist={playlist}
            selected={selected}
            favs={favs}
            fillScale={fillScale}
            onFavClick={onFavClick}
            dataForLegends={tributes.nation}
          />
        </Tab.Pane>
        <Tab.Pane eventKey={2.1}>
          <Programs
            data={tributes.week}
            selected={selected}
            onFilterSelected={onFilterSelected}
            isMobile
          />
        </Tab.Pane>
        <Tab.Pane eventKey={2.2}>
          <Artists
            data={tributes.artist}
            selected={selected}
            onFilterSelected={onFilterSelected}
            fillScale={fillScale}
            isMobile
          />
        </Tab.Pane>
        <Tab.Pane eventKey={2.3}>
          <Countries
            data={tributes.nation}
            selected={selected}
            onFilterSelected={onFilterSelected}
            fillScale={fillScale}
            isMobile
          />
        </Tab.Pane>
        <Tab.Pane eventKey={2.4}>
          <Corners
            data={tributes.corner}
            selected={selected}
            onFilterSelected={onFilterSelected}
            isMobile
          />
        </Tab.Pane>
        <Tab.Pane eventKey={3}>
          <About />
        </Tab.Pane>
      </Tab.Content>
    </Col>
  </Row>
);

const AppForDesktop = ({
  playlist,
  selected,
  favs,
  fillScale,
  onFavClick,
  tributes,
  onFilterSelected
}) => (
  <Row>
    <Col xs={8} xsHidden sm={8}>
      <Playlist
        playlist={playlist}
        selected={selected}
        favs={favs}
        fillScale={fillScale}
        onFavClick={onFavClick}
        dataForLegends={tributes.nation}
      />
    </Col>
    <Col xs={4} xsHidden sm={4}>
      <Tab.Content animation>
        <Tab.Pane eventKey={2.1}>
          <Programs
            data={tributes.week}
            selected={selected}
            onFilterSelected={onFilterSelected}
          />
        </Tab.Pane>
        <Tab.Pane eventKey={2.2}>
          <Artists
            data={tributes.artist}
            selected={selected}
            onFilterSelected={onFilterSelected}
            fillScale={fillScale}
          />
        </Tab.Pane>
        <Tab.Pane eventKey={2.3}>
          <Countries
            data={tributes.nation}
            selected={selected}
            onFilterSelected={onFilterSelected}
            fillScale={fillScale}
          />
        </Tab.Pane>
        <Tab.Pane eventKey={2.4}>
          <Corners
            data={tributes.corner}
            selected={selected}
            onFilterSelected={onFilterSelected}
          />
        </Tab.Pane>
        <Tab.Pane eventKey={3}>
          <About />
        </Tab.Pane>
      </Tab.Content>
    </Col>
  </Row>
);

class Apps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: window.innerWidth < 768
    };
  }

  componentDidMount() {
    window.addEventListener('resize', e => {
      const isMobile = this.state.isMobile;
      if (e.target.innerWidth < 768 && !isMobile) {
        // Desktop => Mobile
        this.setState(prev => ({
          isMobile: !prev.isMobile
        }));
      } else if (e.target.innerWidth >= 768 && isMobile) {
        // Mobile => Desktop
        this.setState(prev => ({
          isMobile: !prev.isMobile
        }));
      }
    })
  }

  render() {
    return (
      <Grid>
        {this.state.isMobile ? (
          <AppForMobile {...this.props} />
        ) : (
          <AppForDesktop {...this.props} />
        )}
      </Grid>
    );
  }
}

export default Apps;

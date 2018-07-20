import React from 'react';
import { Grid, Row, Col, Tab } from 'react-bootstrap';

import Playlist from './Panes/Playlist';
import Programs from './Panes/Programs';
import Artists from './Panes/Artists';
import Countries from './Panes/Countries';
import Corners from './Panes/Corners';
import Favs from './Panes/Favs';
import About from './Panes/About';

const AppForMobile = ({
  playlist,
  playlistLength,
  removeSelected,
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
            playlistLength={playlistLength}
            removeSelected={removeSelected}
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
        <Tab.Pane eventKey={2.5}>
          <Favs />
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
  playlistLength,
  selected,
  favs,
  fillScale,
  onFavClick,
  tributes,
  onFilterSelected,
  removeSelected
}) => (
  <Row>
    <Col xs={8} xsHidden sm={8}>
      <Playlist
        playlist={playlist}
        playlistLength={playlistLength}
        selected={selected}
        favs={favs}
        fillScale={fillScale}
        onFavClick={onFavClick}
        dataForLegends={tributes.nation}
        removeSelected={removeSelected}
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
        <Tab.Pane eventKey={2.5}>
          <Favs />
        </Tab.Pane>
        <Tab.Pane eventKey={3}>
          <About />
        </Tab.Pane>
      </Tab.Content>
    </Col>
  </Row>
);

const Apps = props => (
  <Grid className="app-main">
    {props.isMobile ? (
      <AppForMobile {...props} />
    ) : (
      <AppForDesktop {...props} />
    )}
  </Grid>
);

export default Apps;

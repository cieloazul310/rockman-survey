import React from 'react';
import { Grid, Row, Col, Tab } from 'react-bootstrap';
import { AutoSizer } from 'react-virtualized';

import Playlist from './Panes/Playlist';
import Programs from './Panes/Programs';
import FilterPanel from './Panes/FilterPanel';
import About from './Panes/About';
import AdBox from './AdBox';

const AppForMobile = ({
  playlist,
  playlistLength,
  removeSelected,
  selected,
  fillScale,
  tributes,
  onFilterSelected
}) => (
  <Row>
    <Col xs={12} smHidden mdHidden lgHidden>
      <AutoSizer disableHeight>
        {({ width }) => (
          <div style={{ width }}>
            <Tab.Content animation>
              <Tab.Pane eventKey={1}>
                <Playlist
                  playlist={playlist}
                  playlistLength={playlistLength}
                  removeSelected={removeSelected}
                  selected={selected}
                  fillScale={fillScale}
                  dataForLegends={tributes.nation}
                  width={width}
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
                <FilterPanel
                  title="アーティスト"
                  data={tributes.artist}
                  width={width}
                  label="artist"
                  selected={selected}
                  onClick={onFilterSelected}
                  color={d => fillScale(d.nation)}
                  isMobile
                />
              </Tab.Pane>
              <Tab.Pane eventKey={2.3}>
                <FilterPanel
                  title="国・地域"
                  data={tributes.nation}
                  width={width}
                  label="nation"
                  selected={selected}
                  onClick={onFilterSelected}
                  color={d => fillScale(d.nation)}
                  isMobile
                />
              </Tab.Pane>
              <Tab.Pane eventKey={2.4}>
                <FilterPanel
                  title="コーナー"
                  data={tributes.corner}
                  width={width}
                  label="corner"
                  selected={selected}
                  onClick={onFilterSelected}
                />
              </Tab.Pane>
              <Tab.Pane eventKey={3}>
                <About />
              </Tab.Pane>
            </Tab.Content>
            {width ? <AdBox /> : null}
          </div>
        )}
      </AutoSizer>
    </Col>
  </Row>
);

const AppForDesktop = ({
  playlist,
  playlistLength,
  selected,
  fillScale,
  tributes,
  onFilterSelected,
  removeSelected
}) => (
  <Row>
    <Col sm={8}>
      <AutoSizer disableHeight>
        {({ width }) => {
          console.log(width);
          return (
            <Playlist
              width={width}
              playlist={playlist}
              playlistLength={playlistLength}
              selected={selected}
              fillScale={fillScale}
              dataForLegends={tributes.nation}
              removeSelected={removeSelected}
            />
          );
        }}
      </AutoSizer>
    </Col>
    <Col sm={4}>
      <AutoSizer disableHeight>
        {({ width }) => (
          <div style={{ width }}>
            <Tab.Content animation>
              <Tab.Pane eventKey={2.1}>
                <Programs
                  data={tributes.week}
                  selected={selected}
                  onFilterSelected={onFilterSelected}
                />
              </Tab.Pane>
              <Tab.Pane eventKey={2.2}>
                <FilterPanel
                  title="アーティスト"
                  data={tributes.artist}
                  width={width}
                  label="artist"
                  selected={selected}
                  onClick={onFilterSelected}
                  color={d => fillScale(d.nation)}
                />
              </Tab.Pane>
              <Tab.Pane eventKey={2.3}>
                <FilterPanel
                  title="国・地域"
                  data={tributes.nation}
                  width={width}
                  label="nation"
                  selected={selected}
                  onClick={onFilterSelected}
                  color={d => fillScale(d.nation)}
                />
              </Tab.Pane>
              <Tab.Pane eventKey={2.4}>
                <FilterPanel
                  title="コーナー"
                  data={tributes.corner}
                  width={width}
                  label="corner"
                  selected={selected}
                  onClick={onFilterSelected}
                />
              </Tab.Pane>
              <Tab.Pane eventKey={3}>
                <About />
              </Tab.Pane>
            </Tab.Content>
            {width ? <AdBox /> : null}
          </div>
        )}
      </AutoSizer>
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

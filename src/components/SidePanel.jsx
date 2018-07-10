import React from 'react';
import {
  Col,
  Badge,
  ListGroup,
  ListGroupItem,
  Tabs,
  Tab
} from 'react-bootstrap';
import FilterPanel from './FilterPanel';
import About from './About';

const SidePanel = ({
  programs,
  selected,
  byNation,
  byArtist,
  byCorner,
  onFilterSelected
}) => (
  <Col sm={12} md={4} style={{ height: '100%' }}>
    <Tabs defaultActiveKey={1} animation={true} id="side-panel">
      <Tab eventKey={1} title="Programs">
        <h3 id="programs">
          Programs <Badge>{programs.length}</Badge>
        </h3>
        <div style={{ height: window.innerHeight, overflowX: 'scroll' }}>
          <ListGroup>
            {programs.map((d, i) => (
              <ListGroupItem
                key={i}
                active={selected.key === 'week' && selected.label === d['week']}
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
      </Tab>
      <Tab eventKey={2} title="Artists">
        <FilterPanel
          id="artists"
          title="Artists"
          data={byArtist}
          label="artist"
          selected={selected}
          onClick={onFilterSelected}
        />
      </Tab>
      <Tab eventKey={3} title="Countries">
        <FilterPanel
          id="countries"
          title="Countries"
          data={byNation}
          label="nation"
          selected={selected}
          onClick={onFilterSelected}
        />
      </Tab>
      <Tab eventKey={4} title="Corner">
        <FilterPanel
          id="corner"
          title="Corner"
          data={byCorner}
          label="corner"
          selected={selected}
          onClick={onFilterSelected}
        />
      </Tab>
      <Tab eventKey={5} title="About">
        {About}
      </Tab>
    </Tabs>
  </Col>
);

export default SidePanel;

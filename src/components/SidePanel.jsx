import React from 'react';
import {
  Col,
  Badge,
  ListGroup,
  ListGroupItem,
  Tab
} from 'react-bootstrap';
import FilterPanel from './FilterPanel';
import About from './About';

const SidePanel = ({ tributes, selected, onFilterSelected, fillScale }) => (
  <Col xsHidden sm={4} style={{ height: '100%' }}>
    <Tab.Content animation>
      <Tab.Pane eventKey={2.1} title="Programs">
        <h3 id="programs">
          Programs <Badge>{tributes.week.length}</Badge>
        </h3>
        <div
          style={{
            height: window.innerHeight,
            overflowX: 'hidden',
            overflowY: 'scroll'
          }}
        >
          <ListGroup>
            {tributes.week.map((d, i) => (
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
      </Tab.Pane>
      <Tab.Pane eventKey={2.2} title="Artists">
        <FilterPanel
          id="artists"
          title="Artists"
          data={tributes.artist}
          label="artist"
          selected={selected}
          onClick={onFilterSelected}
          color={{ scale: fillScale, key: 'nation' }}
        />
      </Tab.Pane>
      <Tab.Pane eventKey={2.3} title="Countries">
        <FilterPanel
          id="countries"
          title="Countries"
          data={tributes.nation}
          label="nation"
          selected={selected}
          onClick={onFilterSelected}
          color={{ scale: fillScale, key: 'nation' }}
        />
      </Tab.Pane>
      <Tab.Pane eventKey={2.4} title="Corner">
        <FilterPanel
          id="corner"
          title="Corner"
          data={tributes.corner}
          label="corner"
          selected={selected}
          onClick={onFilterSelected}
        />
      </Tab.Pane>
      <Tab.Pane eventKey={2.5} title="favs">
        <h3>favs</h3>
      </Tab.Pane>
      <Tab.Pane eventKey={3} title="About">
        {About}
      </Tab.Pane>
    </Tab.Content>
  </Col>
);

export default SidePanel;

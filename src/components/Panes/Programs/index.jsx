import React from 'react';
import { Badge, ListGroup, ListGroupItem } from 'react-bootstrap';

// Artists/index.jsx

const Programs = ({ data, selected, onFilterSelected, isMobile }) => (
  <div>
    <h3 id="programs">
      Programs <Badge>{data.length}</Badge>
    </h3>
    <div
      style={isMobile ? {} : {
        height: window.innerHeight - 100,
        overflowX: 'hidden',
        overflowY: 'scroll'
      }}
    >
      <ListGroup>
        {data.map((d, i) => (
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
  </div>
);

export default Programs;

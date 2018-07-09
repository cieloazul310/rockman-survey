import React from 'react';
import { ListGroup, ListGroupItem, Badge } from 'react-bootstrap';

const FilterPanel = ({id, data, title, label, onClick }) => (
  <div id={id}>
    <h3>
      {title + ' '}<Badge>{data.length}</Badge>
    </h3>
    <div style={{ maxHeight: window.innerHeight / 2, overflowX: 'scroll' }}>
      <ListGroup>
        {data.map((d, i) => (
          <ListGroupItem
            key={i}
            active={d.selected}
            onClick={() => {
              onClick(d, label);
            }}
          >
            {d[label] + ' '}
            <Badge>{d.tunes.length}</Badge>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  </div>
);

export default FilterPanel;

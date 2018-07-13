import React from 'react';
import { ListGroup, ListGroupItem, Badge } from 'react-bootstrap';

const FilterPanelItem = ({ d, i, label, selected, onClick, color }) => (
  <ListGroupItem
    key={i}
    active={selected.key === label && selected.label === d[label]}
    onClick={() => {
      onClick(d, label);
    }}
  >
    {color ? (
      <span style={{ color: color.scale(d[color.key]) }}>● </span>
    ) : null}
    {d[label]}
    <Badge>{d.tunes.length}</Badge>
  </ListGroupItem>
);

const FilterPanel = ({ id, data, title, label, onClick, selected, color }) => (
  <div id={id}>
    <h3>
      {title + ' '}
      <Badge>{data.length}</Badge>
    </h3>
    <div style={{ maxHeight: window.innerHeight - 150, overflowX: 'hidden', overflowY: 'scroll' }}>
      <ListGroup>
        {data.map((d, i) => (
          <FilterPanelItem
            key={i}
            d={d}
            i={i}
            label={label}
            selected={selected}
            onClick={onClick}
            color={color}
          />
        ))}
      </ListGroup>
    </div>
  </div>
);

export default FilterPanel;

import React from 'react';
import { ListGroup, ListGroupItem, Badge } from 'react-bootstrap';

const FilterPanelItem = ({ d, i, label, selected, onClick, color }) => (
  <ListGroupItem
    active={selected.key === label && selected.label === d[label]}
    onClick={() => {
      onClick(d, label);
    }}
  >
    {color ? (
      <span style={{ color: /*color.scale(d[color.key])*/ color(d) }}>● </span>
    ) : null}
    {d[label]}
    <Badge>{d.tunes.length}</Badge>
  </ListGroupItem>
);

const FilterPanelStyle = {
  maxHeight: window.innerHeight - 150,
  overflowX: 'hidden',
  overflowY: 'scroll'
};

const FilterPanel = ({
  id,
  data,
  title,
  label,
  onClick,
  selected,
  color,
  isMobile
}) => (
  <div id={id}>
    <h3>
      {title + ' '}
      <Badge>{data.length}</Badge>
    </h3>
    <div style={isMobile ? {} : FilterPanelStyle}>
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

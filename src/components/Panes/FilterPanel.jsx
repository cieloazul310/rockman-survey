import React from 'react';
import { ListGroup, ListGroupItem, Badge } from 'react-bootstrap';
import { List } from 'react-virtualized';

const FilterPanelItem = ({ d, i, label, selected, onClick, color, style }) => (
  <ListGroupItem
    style={style}
    active={selected.key === label && selected.label === d[label]}
    onClick={() => {
      onClick(d, label);
    }}
  >
    {color ? <span style={{ color: color(d) }}>● </span> : null}
    {d[label]}
    <Badge>{d.tunes.length}</Badge>
  </ListGroupItem>
);
// removed
/*
const FilterPanelStyle = {
  maxHeight: window.innerHeight - 150,
  overflowX: 'hidden',
  overflowY: 'scroll'
};
*/
const FilterPanel = ({
  id,
  data,
  title,
  label,
  onClick,
  selected,
  width,
  color
}) => (
  <div id={id}>
    <h3>
      {title + ' '}
      <Badge>{data.length}</Badge>
    </h3>
    <ListGroup>
      <List
        width={width}
        height={window.innerHeight - 150}
        rowHeight={48}
        rowCount={data.length}
        rowRenderer={({ key, index, style }) => (
          <FilterPanelItem
            key={key}
            style={style}
            d={data[index]}
            i={index}
            label={label}
            selected={selected}
            onClick={onClick}
            color={color}
          />
        )}
      />
      {/*data.map((d, i) => (
          <FilterPanelItem
            key={i}
            d={d}
            i={i}
            label={label}
            selected={selected}
            onClick={onClick}
            color={color}
          />
        ))*/}
    </ListGroup>
  </div>
);

export default FilterPanel;

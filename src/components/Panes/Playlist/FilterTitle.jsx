import React from 'react';
import { Glyphicon } from 'react-bootstrap';

import './FilterTitle.css';

const RemoveSelectedButton = ({ removeSelected }) => (
  <span
    title="選択解除"
    className="remove-selected"
    onClick={() => {
      removeSelected();
    }}
  >
    <Glyphicon glyph="remove-circle" />
  </span>
);

const FilterTitle = ( { selected, removeSelected }) => {
  const { key, label } = selected;
  if (key === null　|| label === null) return null;

  if (key === 'favs') {
    return (
      <span className="filter-title">
        <small>{'お気に入り'}</small>
        <RemoveSelectedButton removeSelected={removeSelected} />
      </span>
    );
  } else if (key === 'week') {
    return (
      <span className="filter-title">
        <small>{`week${label}`}</small>
        <RemoveSelectedButton removeSelected={removeSelected} />
      </span>
    );
  } else {
    return (
      <span className="filter-title">
        <small>{`${key}: ${decodeURI(label)}`}</small>
        <RemoveSelectedButton removeSelected={removeSelected} />
      </span>
    );
  }
};

export default FilterTitle;

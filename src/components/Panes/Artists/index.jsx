import React from 'react';
import FilterPanel from '../FilterPanel';

// Artists/index.jsx

const Artists = ({
  data,
  selected,
  onFilterSelected,
  fillScale,
  isMobile
}) => (
  <FilterPanel
    title="アーティスト"
    data={data}
    label="artist"
    selected={selected}
    onClick={onFilterSelected}
    color={d => fillScale(d.nation) /*{ scale: fillScale, key: 'nation' }*/}
    isMobile={isMobile}
  />
);

export default Artists;

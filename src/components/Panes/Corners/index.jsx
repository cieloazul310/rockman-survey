import React from 'react';
import FilterPanel from '../FilterPanel';

// Artists/index.jsx

const Corners = ({
  data,
  selected,
  onFilterSelected,
  fillScale,
  isMobile
}) => (
  <FilterPanel
    title="Corners"
    data={data}
    label="corner"
    selected={selected}
    onClick={onFilterSelected}
    isMobile={isMobile}
  />
);

export default Corners;

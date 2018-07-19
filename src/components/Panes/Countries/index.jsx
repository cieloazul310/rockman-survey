import React from 'react';
import FilterPanel from '../FilterPanel';

// Artists/index.jsx

const Countries = ({
  data,
  selected,
  onFilterSelected,
  fillScale,
  isMobile
}) => (
  <FilterPanel
    title="Countries"
    data={data}
    label="nation"
    selected={selected}
    onClick={onFilterSelected}
    color={d => fillScale(d.nation) /*{ scale: fillScale, key: 'nation' }*/}
    isMobile={isMobile}
  />
);

export default Countries;

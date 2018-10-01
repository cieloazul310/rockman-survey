import React from "react";
import FilterPanel from "../FilterPanel";

// Artists/index.jsx

const Countries = ({
  data,
  selected,
  onFilterSelected,
  fillScale,
  isMobile
}) => (
  <FilterPanel
    title="国・地域"
    data={data.sort(
      (a, b) =>
        b.tunes.length - a.tunes.length || a.nation.localeCompare(b.nation)
    )}
    label="nation"
    selected={selected}
    onClick={onFilterSelected}
    color={d => fillScale(d.nation) /*{ scale: fillScale, key: 'nation' }*/}
    isMobile={isMobile}
  />
);

export default Countries;

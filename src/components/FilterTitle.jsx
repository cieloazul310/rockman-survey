import React from 'react';

const FilterTitle = ( { selected }) => {
  const { key, label } = selected;
  if (key === null　|| label === null) return null;

  if (key === 'favs') {
    return (
      <small>{'お気に入り'}</small>
    );
  } else if (key === 'week') {
    return (
      <small>{`week${label}`}</small>
    );
  } else {
    return (
      <small>{`${key}: ${decodeURI(label)}`}</small>
    );
  }
};

export default FilterTitle;

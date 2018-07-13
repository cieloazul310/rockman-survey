import React from 'react';
import {
  Button,
  ButtonGroup,
  DropdownButton,
  MenuItem,
  Glyphicon
} from 'react-bootstrap';
import { sortDefault, sortByYear, sortByArtist } from '../sortFunctions';

const sortItems = [
  { label: 'オンエア順', sortType: sortDefault },
  { label: 'リリース年', sortType: sortByYear },
  { label: 'アーティスト名', sortType: sortByArtist }
];

const SortHandler = ({
  sortType,
  sortDesc,
  onSortRuleClick,
  onSortTypeClick
}) => (
  <div style={{ textAlign: 'right', paddingBottom: '.5em' }}>
    <ButtonGroup>
      <DropdownButton bsSize="small" title={sortType.label} id="sortType">
        {sortItems.map((d, i) => (
          <MenuItem
            eventKey={i + 1}
            key={i}
            active={d.label === sortType.label}
            onClick={() => onSortTypeClick(d)}
          >
            {d.label}
          </MenuItem>
        ))}
      </DropdownButton>
      <Button
        bsSize="small"
        title="ルール"
        id="sortRule"
        onClick={() => {
          onSortRuleClick();
        }}
      >
        {sortDesc ? '降順' : '昇順'}
        <Glyphicon glyph={sortDesc ? 'arrow-down' : 'arrow-up'} />
      </Button>
    </ButtonGroup>
  </div>
);

export default SortHandler;

import React from 'react';
import { Badge } from 'react-bootstrap';
import PropTypes from 'prop-types';
import FilterTitle from './FilterTitle';
import Legends from './Legends';
import Chart from './Chart';
import SongList from './SongList';

const Playlist = ({
  playlist,
  selected,
  favs,
  fillScale,
  onFavClick,
  dataForLegends
}) => (
  <div>
    <h3>
      Playlist <Badge>{playlist.length}</Badge>{' '}
      <FilterTitle selected={selected} />
    </h3>
    <Legends
      data={dataForLegends}
      fill={(d) => fillScale(d.nation)}
      label="nation"
      filter={(d, i, arr) =>
        arr
          .sort((a, b) => b.tunes.length - a.tunes.length)
          .map(v => v.nation)
          .indexOf(d.nation) < 5
      }
    />
    <Chart playlist={playlist} selected={selected} fillScale={fillScale} />
    <SongList
      playlist={playlist}
      fillScale={fillScale}
      selection={selected.tunes.length ? true : false}
      onFavClick={onFavClick}
    />
  </div>
);

Playlist.propTypes = {
  playlist: PropTypes.arrayOf(PropTypes.object).isRequired,
  selected: PropTypes.shape({
    key: PropTypes.string,
    label: PropTypes.string,
    tunes: PropTypes.arrayOf(PropTypes.number)
  }),
  fillScale: PropTypes.func.isRequired,
  onFavClick: PropTypes.func.isRequired,
  dataForLegends: PropTypes.arrayOf(PropTypes.object)
};

export default Playlist;

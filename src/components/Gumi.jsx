import React from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

const Gumi = ({ d, index, selectedTunes, xScale, yScale, fillScale }) =>
  selectedChecker(selectedTunes, d) ? (
    <OverlayTrigger
      placement="top"
      key={index}
      overlay={
        <Tooltip id={`tooltip-${index}`}>{`${d.name} / ${d.artist}`}</Tooltip>
      }
    >
      <rect
        y={yScale(index + 1)}
        rx={2}
        ry={2}
        width={xScale.bandwidth()}
        height={yScale.bandwidth()}
        fill={fillScale(d.nation)}
      />
    </OverlayTrigger>
  ) : (
    <rect
      y={yScale(index + 1)}
      rx={2}
      ry={2}
      width={xScale.bandwidth()}
      height={yScale.bandwidth()}
      fill="silver"
    />
  );

function selectedChecker(selectedTunes, d) {
  return !selectedTunes.length || selectedTunes.indexOf(d.id) >= 0;
}

export default Gumi;

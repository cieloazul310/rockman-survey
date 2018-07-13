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
        className="gumi"
        y={yScale(index + 1)}
        rx={2}
        ry={2}
        width={xScale.bandwidth()}
        height={yScale.bandwidth()}
        style={{fill:fillScale(d.nation)}}
      />
    </OverlayTrigger>
  ) : (
    <rect
      className="gumi"
      y={yScale(index + 1)}
      rx={2}
      ry={2}
      width={xScale.bandwidth()}
      height={yScale.bandwidth()}
      style={{fill: "#d7d7d7"}}
    />
  );

function selectedChecker(selectedTunes, d) {
  return !selectedTunes.length || selectedTunes.indexOf(d.id) >= 0;
}

export default Gumi;

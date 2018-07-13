import React from 'react';
import ScrollToTop from 'react-scroll-up';
import { Glyphicon } from 'react-bootstrap';

const ScrollUp = (
  <ScrollToTop showUnder={160}>
    <div
      style={{
        padding: '.5em',
        color: 'white',
        backgroundColor: 'rgba(80, 80, 80, 0.8)',
        fontSize: '1.6em',
        borderRadius: '25%'
      }}
    >
      <Glyphicon glyph="chevron-up" />
    </div>
  </ScrollToTop>
);

export default ScrollUp;

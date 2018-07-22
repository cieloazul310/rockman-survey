import React from 'react';
import ScrollToTop from 'react-scroll-up';
import { Glyphicon } from 'react-bootstrap';

import './ScrollUp.css';

const ScrollUp = (
  <ScrollToTop showUnder={160}>
    <div className="scroll-up-button" title="一番上にスクロール">
      <Glyphicon glyph="chevron-up" />
    </div>
  </ScrollToTop>
);

export default ScrollUp;

import React from 'react';
import { Glyphicon } from 'react-bootstrap';

const Footer = (
  <footer
    style={{
      color: '#eee',
      backgroundColor: '#333',
      textAlign: 'center',
      padding: '1em 0',
      marginTop: '1em'
    }}
  >
    <p>
      <Glyphicon glyph="globe" /> ロック大陸測量部 <small>by 水戸地図</small>
    </p>
    <p>{'Copyright © 2019 cieloazul310 All right reserved.'}</p>
  </footer>
);

export default Footer;

import React from 'react';
import './Loader.css';

const Loader = (
  <div style={{height: window.innerHeight - 50, color: 'royalblue'}}>
    <div className="spinner">
      <div className="rect1" />
      <div className="rect2" />
      <div className="rect3" />
      <div className="rect4" />
      <div className="rect5" />
    </div>
  </div>
);

export default Loader;

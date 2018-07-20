import React from 'react';
import './Loader.css';

const Loader = () => (
  <div className="loader-container">
    <div className="spinner">
      <div className="rect-container">
        <div className="spin-rect rect1" />
        <div className="spin-rect rect2" />
        <div className="spin-rect rect3" />
        <div className="spin-rect rect4" />
        <div className="spin-rect rect5" />
      </div>
      <p>Loading...</p>
      <h2>ロック大陸測量部</h2>
    </div>
  </div>
);

export default Loader;

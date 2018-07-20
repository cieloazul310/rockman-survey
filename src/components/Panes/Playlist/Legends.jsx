import React from 'react';

import './Legends.css';

const Legends = ({ data, label, fill, filter = () => true }) => (
  <div className="legends-container">
    <ul>
      {data.filter(filter).map((d, i) => (
        <li key={i}>
          <span style={{color: fill(d)}} />
          {d[label]}
        </li>
      ))}
    </ul>
  </div>
);

export default Legends;

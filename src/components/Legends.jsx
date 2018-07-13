import React from 'react';

const Legends = ({ data, label, scale, filter = () => true }) => (
  <div style={{padding: '1.5em 0 0 0'}}>
    <ul style={{margin: 'auto', padding: 0, textAlign: 'center'}}>
      {data.filter(filter).map((d, i) => (
        <li key={i} style={{display: 'inline-block', margin: 'auto .5em'}}>
          <span style={{color: scale(d[label])}}>
            ■
          </span>
          {d[label]}
        </li>
      ))}
    </ul>
  </div>
);

export default Legends;

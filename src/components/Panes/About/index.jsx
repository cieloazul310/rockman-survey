import React from 'react';

const About = () => (
  <div>
    <h3>About</h3>
    <p>
      {
        'ロック大陸測量部は、TOKYO FM他全国37局ネットで放送されているラジオ番組「SPITZ 草野マサムネのロック大陸漫遊記」のオンエア曲を分類し、広大なロック大陸を自由奔放に漫遊する草野隊長の足跡を記録していこうというページです。'
      }
    </p>
    <h5>{'Data from:'}</h5>
    <ul>
      <li>
        <a
          href="http://www.tfm.co.jp/manyuki/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {'SPITZ 草野マサムネのロック大陸漫遊記 番組HP'}
        </a>
      </li>
      <li>
        <a
          href="https://ja.wikipedia.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {'Wikipedia'}
        </a>
      </li>
      <li>
        <a
          href="https://www.discogs.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {'Discogs'}
        </a>
      </li>
    </ul>
    <p>{'データの誤りの指摘やお問い合わせはこちらから'}</p>
    <ul>
      <li>
        {'Twitter: '}
        <a
          href="https://twitter.com/cieloazul310"
          target="_blank"
          rel="noopener noreferrer"
        >
          {'@cieloazul310'}
        </a>
      </li>
    </ul>
  </div>
);

export default About;

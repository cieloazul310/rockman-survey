import React from 'react';

const About = () => (
  <div>
    <aside>
      <h3>About</h3>
      <p>
        {
          'ロック大陸測量部は、TOKYO FMで毎週日曜日に放送されているラジオ番組「SPITZ 草野マサムネのロック大陸漫遊記」のプレイリストを年別・国別に分類したものを視覚化したアプリケーションです。'
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
        <li>
          <a
            href="https://www.youtube.com/playlist?list=PLGqFsFmePh4xxQjnjCpBLYsJY-VecUzdJ"
            target="_blank"
            rel="noopener noreferrer"
          >
            YouTube 再生リスト
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
        <li>
          {'制作: '}
          <a
            href="https://cieloazul310.github.io"
            target="_blank"
            rel="noopener noreferrer"
          >
            {'水戸地図'}
          </a>
        </li>
      </ul>
    </aside>
  </div>
);

export default About;

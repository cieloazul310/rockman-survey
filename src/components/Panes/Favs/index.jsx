import React from 'react';
import { Glyphicon } from 'react-bootstrap';

const Favs = () => (
  <div>
    <h3><Glyphicon glyph="star" style={{color: 'gold'}} /> favs</h3>
    <p>
      {
        '気に入った曲をお気に入りリストに登録することができます。'
      }
    </p>
    <h4>使い方</h4>
    <ul>
      <li><strong>選択・解除:</strong> 曲の右側にある<Glyphicon glyph="star" />アイコンをクリック</li>
      <li><strong>閲覧:</strong> メニューバーの<Glyphicon glyph="star" /> favsを選択</li>
    </ul>
    <h4>プライバシーポリシー</h4>
    <ul>
      <li>このお気に入りリストはローカル環境のみで動作します。サーバーを通じてサイト作成者や第三者に情報提供される可能性はありません。</li>
      <li>お気に入りリストはブラウザ毎に保存されます。個人の異なるブラウザ(例: ChromeとSafari)での共有や、デバイス間(PCとスマホ)の共有、第三者との共有はできません。</li>
    </ul>
  </div>
);

export default Favs;

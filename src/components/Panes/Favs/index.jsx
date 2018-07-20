import React from 'react';
import { Glyphicon } from 'react-bootstrap';

const Favs = () => (
  <div>
    <h3><Glyphicon glyph="star" /> favs</h3>
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
      <li>このお気に入りリストはローカル環境のみで動作するので、サーバーを通じてサイト作成者や第三者に情報提供される可能性はありません。</li>
      <li>お気に入りリストを個人の異なるブラウザやデバイス、または第三者と共有することはできません。</li>
    </ul>
  </div>
);

export default Favs;

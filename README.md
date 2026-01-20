# 架空のコーポレートサイト「CareSend」

架空の介護派遣会社「CareSend」のコーポレートサイトで、トップページ1枚です。  
Figmaのデザインカンプから静的コーディングしました。  

## デザインツール
- Figma

## サイト構成
トップページのみ

## 使用技術
- HTML5
- CSS / Sass (Dart Sass)
- JavaScript (ES6+)
- jQuery 3.7.1
- slick 1.8.1

## CSS設計
- BEM + FLOCSS

## 実装機能・UIパーツ
- ハンバーガーメニュー
- スムーススクロール
- 2枚同時スライダー
- アコーディオン
- 入力フォーム（GoogleフォームにAjaxで非同期送信）

## WAI-ARIA
まだまだ勉強中ですが、以下の点を意識して実装しています。

- VSCodeの拡張機能`markuplint`と使ってWAI-ARIAの構文チェックをしながら実装
- セマンティックなHTML要素を使用
- 装飾目的だけの`svg`タグや`img`タグには`aria-hidden="true"`を適用
- ハンバーガーメニューは、アイコンとメニューを`aria-controls`属性で関連付け、メニューが展開されているかどうかを`aria-expanded`属性で表現

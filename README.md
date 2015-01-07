TypeScript型定義管理ツール tsdをインストール。

$ npm install -g tsd

プロジェクトルートでtsdを初期化

$ tsd init

tsd.jsonファイルができる。

backbone.jsの定義ファイルをインストール。

$ tsd query backbone --action install --resolve --save

typings配下に型定義ファイルが依存関係込で追加される。


$ npm install grunt-typescript --save-dev

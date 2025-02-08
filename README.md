# Description

## これは何？

- YouTube でシェアリングを押したときの si パラメータ付きの URL を取得する API
- puppeteer を使って動画ページでの操作をエミュレートした原始的な手法

## 使い方

- 必要なパッケージをインストール

```
npm install
```

- 簡易サーバを立ち上げる

```
node app.js
```

- 任意の方法で API にリクエストを送る

```
$ curl "http://localhost:3000/share-link?videoId=qP52sh7PzYA"
{"videoId":"qP52sh7PzYA","shareLink":"https://youtu.be/qP52sh7PzYA?si=gd9ML-Klfl7xoCZQ"}
```

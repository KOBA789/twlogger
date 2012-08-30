# twlogger

CouchDB に Twitter のストリームを放り込み続けます。あと、ふぁぼられ一覧が見られます。

## 準備

まず `my_keys.json` を書きます。

```bash
$ cp example_keys.json my_keys.json
$ cat my_keys.json
{
  "key": "",
  "secret": "",
  "token": "",
  "tokenSecret": "",
  "couchdb": "",
  "username": "",
  "password": ""
}
$ $EDITOR my_keys.json
```

Twitter にアプリ登録してない人は dev.twitter.com からどうぞ。

んで例によって `npm install`

```bash
$ npm install
```

## CouchDB に View を作る

`create_view.js` を使う。

```bash
$ node create_view.js
```

一度だけでよい。

## ストリームを CouchDB に突っ込む

`stream_bridge.js` を使う。

```bash
$ node stream_bridge.js
```

サーバー立てて forever とかでやるとよい。
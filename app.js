const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
// Mongoose（MongoDB）の設定（Mean）
//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/scheduler', { promiseLibrary: require('bluebird') })
  .then(() => console.log('connection succesful'))
  .catch((err) => console.error(err));

//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
// Expressの設定（mEan）
//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

const app = express();

// 各種サービスを提供するルーターの準備
// 舞台役者
const actors = require('./server/routes/actors');
// 劇場
const theaters = require('./server/routes/theaters');
// スケジュール
const schedules = require('./server/routes/schedules');

// リクエストを処理するパーサーの設定
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// ルーターの設定　サービス
app.use('/schedule/api/actors', actors);
app.use('/schedule/api/theaters', theaters);
app.use('/schedule/api/schedules', schedules);

// ルーターの設定　静的コンテンツの配布
app.use(express.static(path.join(__dirname, '/dist/scheduler')));

// 上記以外のGETメソッドはインデックスページを表示するように設定
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/scheduler/index.html'));
});

// 使用するポート番号の設定
const port = '3001';
app.set('port', port);

// HTTPサーバーを生成し指定したポートで待機
const server = http.createServer(app);
server.listen(port, () => console.log(`API running on localhost:${port}`));

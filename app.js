const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

const actors = require('./server/routes/actors');
const theaters = require('./server/routes/theaters');
const schedules = require('./server/routes/schedules');

const app = express();

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/scheduler', { promiseLibrary: require('bluebird') })
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '/dist/scheduler')));

app.use('/api/actors', actors);
app.use('/api/theaters', theaters);
app.use('/api/schedules', schedules);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/scheduler/index.html'));
});

const port = '3001';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`API running on localhost:${port}`));


const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require("cors");
const db = require('./config/db/mongodb');

const app = express();

var corsOptions = { 
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(logger('dev'));

app.use(bodyParser.json({ limit: '50mb'  }))
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));

app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, 'public')));

require('./routes/index')(app);

const PORT = process.env.PORT || 3000;
var httpServer = require('http').createServer(app);
httpServer.listen(PORT);

module.exports = app;

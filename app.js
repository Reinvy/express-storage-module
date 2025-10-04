require('dotenv').config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const whitelist = require('./app/middlewares/whitelist');
const verifyToken = require('./app/middlewares/verifyToken');

const indexRouter = require('./app/routes/index');
const storagesRouter = require('./app/routes/storages');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(whitelist); 

app.use('/', indexRouter);
app.use('/api/v1/storages', verifyToken, storagesRouter);

module.exports = app;

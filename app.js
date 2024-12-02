const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./app/routes/index');
const storagesRouter = require('./app/routes/storages');

const whitelist = ["123.45.67.89", "98.76.54.32", "::1", "::ffff:127.0.0."]; // Ganti dengan IP Anda

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {

    console.log(req.ip);
    console.log(req.socket.remoteAddress);
    console.log(req.headers['x-forwarded-for']);
   
    // Mendapatkan IP client
    const clientIp = req.ip; 

    // Logika untuk IPv6-mapped IPv4
    const normalizedIp = clientIp.startsWith('::ffff:') ? clientIp.replace('::ffff:', '') : clientIp;

    // Periksa apakah IP ada di whitelist
    if (whitelist.includes(clientIp) || whitelist.includes(normalizedIp)) {
        // Lanjutkan ke endpoint jika IP diizinkan
        next(); 
    } else {
        return res.status(403).json({ 
            success: false,
            message: 'Access denied' 
        });
    }
});
  

app.use('/', indexRouter);
app.use('/api/v1/storages', storagesRouter);

module.exports = app;

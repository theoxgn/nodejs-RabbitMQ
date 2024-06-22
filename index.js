const express = require("express");
const app = express();
const http = require("http").createServer(app);
const winston = require('winston');

// require router
const router = require('./src/index');
app.use('/v1/', router);

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
  ],
});

// cek server
app.get("/ping", (req, res) => {
    res.json({
        error: false,
        message: "Server is healthy",
    });
});

const port = 3001

var Server = http.listen(port, () =>{
    // cek server
});

app.get("/", async(req, res) => {
    res.json({
        message: "ngapain",
    });
});

app.use((req, res, next) => {
    logger.info('New request:', req.method, req.url);
    next();
});

// inisialisasi router

/**
 * handle 404 not found
 */
app.use(function(req, res, next) {
    res.status(404)

    if (req.accepts('json')) {
        res.json({ error: 'Not found' })
        return
    }

})
const winston = require('winston');
const geoip = require('geoip-lite');

const logLevels = {
    critical: 0,
    error: 1,
    warning: 2,
    info: 3,
    debug: 4
};

const logColors = {
    critical: 'red',
    error: 'red',
    warning: 'yellow',
    info: 'green',
    debug: 'blue'
};

winston.addColors(logColors);

const logger = winston.createLogger({
    levels: logLevels,
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf((info) => {
            const { timestamp, level, message, ...meta } = info;
            return `${timestamp} [${level}]: ${message}: ${JSON.stringify(meta)}`
        })
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'src/logs/app.log' })
    ]
});

const getUserRegion = (req) => {
    try {
        const ip = req || req.connection.remoteAddress;
        const geo = geoip.lookup(ip);
        return geo;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    logger,
    getUserRegion
}
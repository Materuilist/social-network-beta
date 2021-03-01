const config = require(`../../config.${process.env.MODE}.js`);

module.exports = () => config;

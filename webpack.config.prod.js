const config = require("./webpack.config.js");

config.mode = 'production';
config.optimization.splitChunks.name = false;

module.exports = config; 
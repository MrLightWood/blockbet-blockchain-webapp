const dotenv = require("dotenv");
const config = dotenv.config();

if (config.error) {
  throw config.error;
}
const toExport = {};

for (let item in config.parsed) {
  toExport[item.toLowerCase()] = config.parsed[item];
}

module.exports = toExport;

const path = require("path");
const morgan = require("morgan");
const rfs = require('rotating-file-stream');

const errorLogStream = rfs.createStream('error.log', {
  interval: '7d', // rotate daily
  path: path.join(__dirname, '../logs/error')
});

const morganFormat = "[:date[clf]] - :response-time ms - ERR :status =>	:message	- :method => :url - http: :http-version";

module.exports = morgan(morganFormat, {
	skip: (_, res) => (res.statusCode < 400),
	stream: errorLogStream
});
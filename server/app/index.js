require("dotenv").config();
const express = require("express");
const debug = require('debug')('app');
const path = require("path");
const app = express();
const router = require("./routers");
const { errorHandler } = require("./services/errorHandler");
const helmet = require("helmet");
const morgan = require("morgan");
const rfs = require('rotating-file-stream');

/** Helmet for security */
// app.use(helmet());

/** Parser **/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


/** Cors **/
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', "http://localhost:8080");
  res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
  // response to preflight request
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  }
  else {
    next();
  }
});

if (process.env.NODE_ENV === "production") {
  /** Static files **/
  app.use(express.static(path.join(__dirname, 'public')));
}

/** Morgan **/  
// doc officiel => https://expressjs.com/en/resources/middleware/morgan.htmlb_playground": 6,
// https://medium.com/@zahidbashirkhan/access-and-error-logging-in-node-express-with-morgan-26e0e376a3e

const accessLogStream = rfs.createStream('access.log', {
	interval: '1d', // rotate daily
	path: path.join(__dirname, 'logs/access'),
});

const errorLogStream = rfs.createStream('error.log', {
	interval: '1d', // rotate daily
	path: path.join(__dirname, 'logs/error'),
});
const morganFormat = () => JSON.stringify({
	method: ':method',
	url: ':url',
	http_version: ':http-version',
	response_time: ':response-time',
	status: ':status',
	content_length: ':res[content-length]',
	timestamp: ':date[iso]',
	headers_count: 'req-headers-length',
});
app.use(morgan(morganFormat(), {
	skip: (req, res) => (res.statusCode < 400),
	stream: errorLogStream,
}));

app.use(morgan('combined', {
	stream: accessLogStream,
}));

/** Router **/
app.use("/", router);

/** Route front**/
if (process.env.NODE_ENV === "production") {
  app.get('/*', (_, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
}

/** Error handler **/
app.use(errorHandler);

const port = process.env.PORT ?? 3001;
app.listen(port, () => {
  console.log(`API demarrée sur http://localhost:${port}`);
});

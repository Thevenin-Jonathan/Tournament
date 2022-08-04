require("dotenv").config();
const express = require("express");
const debug = require('debug')('app');
const path = require("path");
const app = express();
const router = require("./routers");
const helmet = require("helmet");
const { errorHandler } = require("./services/errorHandler");
const morganLogger = require("./services/morganLogger");

/** Helmet for security */
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: [
        `'self'`
      ],
      imgSrc: [
        `'self'`,
        `data:`,
        `https://*`
      ],
      connectSrc: [
        `'self'`,
        `data:`,
        `https://api.cloudinary.com`,
      ]
    },
  },
  crossOriginEmbedderPolicy: false,
  crossOriginOpenerPolicy: false,
  crossOriginResourcePolicy : false
}));

/** CORS **/
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

/** Parser **/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** Static files **/
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, 'public')));
}

// /** Morgan logger */
app.use(morganLogger);

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

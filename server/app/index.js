require("dotenv").config();
const express = require("express");
const debug = require('debug')('app');
const path = require("path");
const app = express();
const router = require("./routers");
const { errorHandler } = require("./services/errorHandler");
const helmet = require("helmet");

/** Helmet for security */
app.use(helmet());

/** Parser **/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


/** Cors **/
app.use((req, res, next) => {
  const origin = res.headers.origins;
  if (origin === "http://localhost:8080" || origin === "https://kinoah.com") {
    
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    
    // response to preflight request
    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
    }
  }
  else {
    next();
  }
});

if (process.env.NODE_ENV === "production") {
  /** Static files **/
  app.use(express.static(path.join(__dirname, 'public')));
}

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

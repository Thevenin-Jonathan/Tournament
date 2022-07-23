require("dotenv").config();
const path = require("path");
const express = require("express");
// const debug = require('debug')('app');
const app = express();
const router = require("./app/routers");

/** Parser **/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** Cors **/
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
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

app.use(express.static(path.join(__dirname, 'public')));


/** Router **/
app.use("/", router);


app.get('/*', (_, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const port = process.env.PORT ?? 3001;
app.listen(port, () => {
  console.log(`API demarrée sur http://localhost:${port}`);
});

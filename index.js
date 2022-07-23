require("dotenv").config();
const path = require("path");
const express = require("express");
// const debug = require('debug')('app');
const app = express();
const router = require("./app/routers");

/** Parser **/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** Static files **/
app.use(express.static(path.join(__dirname, 'public')));

/** Router **/
app.use("/", router);

/** Route front**/
app.get('/*', (_, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const port = process.env.PORT ?? 3001;
app.listen(port, () => {
  console.log(`API demarrée sur http://localhost:${port}`);
});

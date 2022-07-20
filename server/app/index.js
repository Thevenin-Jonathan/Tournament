require("dotenv").config();
const express = require("express");
const debug = require('debug')('app:server');
const app = express();
const router = require("./routers");

// On active le middleware pour parser le payload JSON
app.use(express.json());
// On active le middleware pour parser le payload urlencoded
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

const port = process.env.PORT ?? 3000;
app.listen(port, () => {
  console.log(`API demarrée sur http://localhost:${port}`);
});

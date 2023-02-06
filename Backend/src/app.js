const express = require("express");
const cors = require("cors");
require("./db/mongoose");
const gameRouter = require("./routers/gameRouter");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(gameRouter);

module.exports = app;

require("dotenv").config();
const express = require("express");
const moment = require("moment");
const middleware = require("./middleware");
const posts = require("./post.json");
// const morgen = require(morgen);

const app = express();
const port = process.env.PORT || 3001;

// app.use(morgan('combined'));

let logger = (req, res, next) => {
  const { method, url } = req;
  let timeStamp = moment().format("YYYY-MM-DD HH:MM:SS");
  console.log(`${timeStamp} ${method} ${url}`);
  next();
};

app.use(logger);

app.get("/login", middleware.generateToken);

app.use(middleware.authCheck);

app.get("/api/posts", (req, res) => {
  res.send(posts.posts);
});

app.listen(port, () => {
  console.log(`server is started on port ${port}`);
});

const express = require("express");
const nunjucks = require("nunjucks");
const path = require("path");
const booksRouter = require("./books/books-router-api");
const usersRouter = require("./users/users-router-api");

const app = express();

nunjucks.configure(path.join(__dirname, "views"), {
  autoescape: true,
  express: app,
});

app.use(express.json());

app.use("/api/v1/books", booksRouter);

app.use("/api/v1/users", usersRouter);

app.use((error, req, res, next) => {
  console.error(error);
  res.status = 500;
  res.json({ error: "An error has occurred" });
});

module.exports = app;

const express = require("express");
const nunjucks = require("nunjucks");
const path = require("path");
const booksRouter = require("./books/books-router");
const usersRouter = require("./users/users-router");

const app = express();

nunjucks.configure(path.join(__dirname, "views"), {
  autoescape: true,
  express: app,
});

app.use(express.json());

app.use("/books", booksRouter);

app.use("/users", usersRouter);

app.use((error, req, res, next) => {
  console.error(error);
  res.status = 500;
  res.json({ error: "An error has occurred" });
});

module.exports = app;

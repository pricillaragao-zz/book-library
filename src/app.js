const express = require("express");
const nunjucks = require("nunjucks");
const path = require("path");
const booksRouterAPI = require("./books/books-router-api");
const usersRouterAPI = require("./users/users-router-api");
const booksRouter = require("./books/books-router");

const app = express();

app.use(express.json());

app.use("/api/v1/books", booksRouterAPI);

app.use("/api/v1/users", usersRouterAPI);

app.use(express.static(__dirname + "/public"));

nunjucks.configure(path.join(__dirname, "views"), {
  autoescape: true,
  express: app,
});

app.use("/books", booksRouter);

app.get("/", (req, res) => {
  res.render("index.html", { lang: "en", title: "Pricilla's Library - Home" });
});

app.get("/exemplo", (req, res) => {
  res.render("exemplo.html");
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status = 500;
  res.json({ error: "An error has occurred" });
});

module.exports = app;

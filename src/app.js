const express = require("express");
const nunjucks = require("nunjucks");
const path = require("path");
const db = require("./db");
const UsersService = require("./users/users-service");
const UsersRepository = require("./users/users-repository");
const UsersController = require("./users/users-controller");
const booksRouter = require("./books/books-router");

const app = express();

nunjucks.configure(path.join(__dirname, "views"), {
  autoescape: true,
  express: app,
});

app.use(express.json());

const usersRepository = new UsersRepository(db);
const usersService = new UsersService(usersRepository);
const usersController = new UsersController(usersService);

app.post("/users", usersController.createUser.bind(usersController));

app.get("/users", usersController.listUsers.bind(usersController));

app.get("/users/:id", usersController.getUser.bind(usersController));

app.patch("/users/:id", usersController.updateUser.bind(usersController));

app.delete("/users/:id", usersController.deleteUser.bind(usersController));

app.use("/books", booksRouter);

app.use((error, req, res, next) => {
  console.error(error);
  res.status = 500;
  res.json({ error: "An error has occurred" });
});

module.exports = app;

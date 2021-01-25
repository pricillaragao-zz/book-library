const express = require("express");
const nunjucks = require("nunjucks");
const path = require("path");
const UsersService = require("./users/users-service");
const UsersRepository = require("./users/users-repository");
const UsersController = require("./users/users-controller");
const Book = require("./books/book");
const BooksService = require("./books/books-service");
const BooksRepository = require("./books/books-repository");
const BooksController = require("./books/books-controller");

const app = express();

nunjucks.configure(path.join(__dirname, "views"), {
  autoescape: true,
  express: app,
});

app.use(express.json());

const knex = require("knex")({
  client: "pg",
  connection: {
    user: "pricillapatriciadearagao",
    host: "localhost",
    database: "library",
    password: null,
    port: 5432,
  },
});

const usersRepository = new UsersRepository(knex);
const usersService = new UsersService(usersRepository);
const usersController = new UsersController(usersService);

const booksRepository = new BooksRepository(knex);
const booksService = new BooksService(booksRepository);
const booksController = new BooksController(booksService);

// app.get("/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     console.log('id', id)
//     const user = await usersService.getUser(id);
//     res.render("index.html", {
//       name: user.name,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status = 500;
//     res.json({ error: "An error has occurred" });
//   }
// });


app.post("/users", usersController.createUser.bind(usersController));

app.get("/users", usersController.listUsers.bind(usersController));

app.get("/users/:id", usersController.getUser.bind(usersController));

app.patch("/users/:id", usersController.updateUser.bind(usersController));

app.delete("/users/:id", usersController.deleteUser.bind(usersController));


app.post("/books", booksController.createBook.bind(booksController));

app.get("/books", booksController.listBooks.bind(booksController));

app.get("/books/:id", booksController.getBook.bind(booksController));

app.patch("/books/:id", booksController.updateBook.bind(booksController));

app.delete("/books/:id", booksController.deleteBook.bind(booksController));

app.use((error, req, res, next) => {
  console.error(error);
  res.status = 500;
  res.json({ error: "An error has occurred" });
});

module.exports = app;

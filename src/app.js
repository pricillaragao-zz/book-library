const express = require("express");
const nunjucks = require("nunjucks");
const path = require("path");
const UsersService = require("./users/users-service");
const UsersRepository = require("./users/users-repository");
const UsersController = require("./users/users-controller");
const Book = require("./books/book");
const BooksService = require("./books/books-service");
const BooksRepository = require("./books/books-repository");

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

const booksRepository = new BooksRepository(knex);

const booksService = new BooksService(booksRepository);

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

const usersController = new UsersController(usersService);

app.post("/users", usersController.createUser.bind(usersController));

app.get("/users", usersController.listUsers.bind(usersController));

app.get("/users/:id", usersController.getUser.bind(usersController));

app.patch("/users/:id", usersController.updateUser.bind(usersController));

app.delete("/users/:id", usersController.deleteUser.bind(usersController));

app.get("/books/:id", async (req, res) => {
  try {
    const id = req["params"]["id"];
    res.json(await booksService.getBook(id));
  } catch (err) {
    console.error(err);
    res.json({
      error: "An error has ocurred",
    });
  }
});

app.delete("/books/:id", async (req, res) => {
  try {
    const id = req["params"]["id"];
    console.log("Id:", id);
    await booksService.deleteBook(id);
    res.statusCode = 204;
    res.json();
  } catch (err) {
    console.error(err);
    res.json({
      error: "An error has ocurred",
    });
  }
});

app.patch("/books/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const title = req.body.title;
    let book = new Book(id, title);
    book = await booksService.updateBook(book);
    res.json(book);
  } catch (err) {
    console.error(err);
    res.json({
      error: "An error has ocurred",
    });
  }
});

app.post("/books", async (req, res) => {
  try {
    const book = await booksService.createBook(
      req["body"]["title"] // usar o postman - body - raw
    );
    res.json(book);
  } catch (error) {
    console.error(error);
    res.status = 500;
    res.json({ error: "An error has occurred" });
  }
});

app.get("/books", async (req, res) => {
  res.json(await booksService.listBooks());
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status = 500;
  res.json({ error: "An error has occurred" });
});

module.exports = app;

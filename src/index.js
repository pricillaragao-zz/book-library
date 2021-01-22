const express = require("express");
const nunjucks = require("nunjucks");
const path = require("path");
const UsersRepository = require("./users-repository");
const UsersService = require("./users-service");
const BooksService = require("./books-service");
const BooksRepository = require("./books-repository");
const User = require("./user");
const Book = require("./book");

const app = express();

nunjucks.configure(path.join(__dirname, "views"), {
  autoescape: true,
  express: app,
});

app.use(express.json());

const port = 3000;

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

app.post("/users", async (req, res) => {
  try {
    const user = await usersService.createUser(
      req["body"]["name"],
      req["body"]["address"]
    );
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status = 500;
    res.json({ error: "An error has occurred" });
  }
});

app.get("/users", async (req, res) => {
  res.json(await usersService.listUsers());
});

app.get("/users/:id", async (req, res) => {
  try {
    const id = req["params"]["id"];
    res.json(await usersService.getUser(id));
  } catch (err) {
    console.error(err);
    res.json({
      error: "An error has ocurred",
    });
  }
});

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

app.delete("/users/:id", async (req, res) => {
  try {
    const id = req["params"]["id"];
    console.log("Id:", id);
    await usersService.deleteUser(id);
    res.statusCode = 204;
    res.json();
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

app.patch("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const name = req.body.name;
    let user = new User(id, name);
    user = await usersService.updateUser(user);
    res.json(user);
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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

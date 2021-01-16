const express = require("express");
const {Pool} = require("pg")
const UsersRepository = require("./users-repository");
const UsersService = require("./users-service");
const BooksService = require("./books-service");
const BooksRepository = require("./books-repository");

const app = express();

app.use(express.json());

const port = 3000;

const pool = new Pool({
  user: 'pricillapatriciadearagao',
  host: 'localhost',
  database: 'library',
  password: null,
  port: 5432,
}); 

const usersRepository = new UsersRepository(pool);

const usersService = new UsersService(usersRepository);

const booksRepository = new BooksRepository();

const booksService = new BooksService(booksRepository);

app.get("/", (req, res) => {
  res.send(usersService.getUser());
});

app.post("/users", async (req, res) => {
  try {
    const user = await usersService.createUser(
      req["body"]["name"],
      req["body"]["address"]
    );
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status = 500;
    res.json({ error: "An error has occurred" });
  }
});

app.get("/users", async (req, res) => {
  res.send(await usersService.listUsers());
});

app.get("/users/:id", (req, res) => {
  res.send(usersService.getUser(req["params"]["id"]));
});

// Implementar a rota para listar os livros listBooks
//

app.post("/books", async (req, res) => { 
  try {
    const book = await booksService.createBook(
      req["body"]["title"] // usar o postman - body - raw 
    );
    res.send(book);
  } catch (error) {
    console.error(error);
    res.status = 500;
    res.json({ error: "An error has occurred" });
  }
});

app.get("/books", async (req, res) => {
  res.send(await booksService.listBooks());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

const express = require("express");
const UsersRepository = require("./users-repository");
const UsersService = require("./users-service");

const app = express();

app.use(express.json());

const port = 3000;

const usersRepository = new UsersRepository();

const usersService = new UsersService(usersRepository);

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
    res.json({ error: "An error was occurred" });
  }
});

app.get("/users", async (req, res) => {
  res.send(await usersService.listUsers());
});

app.get("/users/:id", (req, res) => {
  res.send(usersService.getUser(req["params"]["id"]));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

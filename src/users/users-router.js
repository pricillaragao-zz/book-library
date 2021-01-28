// Implementar as rotas dos usuários usando o express router (igual nos books);
// Validar requisição (igual nos books).

const express = require("express");
const { checkSchema, validationResult } = require("express-validator");
const User = require("./user");
const usersService = require("./users-service");

const router = express.Router();

router.post(
  "/",
  checkSchema({
    name: {
      notEmpty: {
        options: {
          ignore_whitespace: true,
        },
      },
    },
    address: {
      notEmpty: {
        options: {
          ignore_whitespace: true,
        },
      },
    },
  }),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(400).json({ errors });
        return;
      }
      const user = await usersService.createUser(
        req.body.name,
        req.body.address
      );
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.get("/", async (_req, res, next) => {
  try {
    res.json(await usersService.listUsers());
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, nect) => {
  try {
    const id = req["params"]["id"];
    res.json(await usersService.getUser(id));
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const name = req.body.name;
    let user = new User(id, name);
    user = await usersService.updateUser(user);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const id = req["params"]["id"];
    console.log("Id:", id);
    await usersService.deleteUser(id);
    res.statusCode = 204;
    res.json();
  } catch (error) {
    next(error);
  }
});

module.exports = router;

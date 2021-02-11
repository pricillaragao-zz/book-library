const express = require("express");
const { checkSchema, validationResult } = require("express-validator");
const Book = require("./book");
const booksService = require("./books-service");

const router = express.Router();

router.post(
  "/",
  checkSchema({
    title: {
      notEmpty: {
        options: {
          ignore_whitespace: true,
        },
      },
    },
    coverUrl: {
      isURL: true,
    },
  }),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(400).json({ errors });
        return;
      }

      const book = await booksService.createBook(
        req.body.title,
        req.body.coverUrl,
        req.body.bookUrl,
        req.body.review
      );
      res.json(book);
    } catch (error) {
      next(error);
    }
  }
);

router.get("/", async (_req, res, next) => {
  try {
    res.json(await booksService.listBooks());
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    res.json(await booksService.getBook(id));
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const title = req.body.title;
    const coverUrl = req.body.coverUrl;
    const bookUrl = req.body.bookUrl;
    const review = req.body.review;
    let book = new Book(id, title, coverUrl, bookUrl, review);
    book = await booksService.updateBook(book);
    res.json(book);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    await booksService.deleteBook(id);
    res.statusCode = 204;
    res.json();
  } catch (error) {
    next(book);
  }
});

module.exports = router;

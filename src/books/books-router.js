const express = require("express");
const booksService = require("./books-service");

const router = express.Router();

router.get("/rent", async (req, res, next) => {
  try {
    const books = await booksService.listBooks();
    res.render("books.html", {
      lang: "en",
      title: "Pricilla's Library - Rent a Book",
      books,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

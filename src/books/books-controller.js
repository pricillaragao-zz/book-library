// Para cada livro, retornar tambem um link com uma imagem da capa

const Book = require("./book");

class BooksController {
  constructor(booksService) {
    this.booksService = booksService;
  }

  async createBook(req, res, next) {
    try {
      const book = await this.booksService.createBook(
        req["body"]["title"], // usar o postman - body - raw
        req["body"]["coverUrl"]
      );
      res.json(book);
    } catch (error) {
      next(error);
    }
  }

  async listBooks(req, res, next) {
    try {
      res.json(await this.booksService.listBooks());
    } catch (error) {
      next(error);
    }
  }

  async getBook(req, res, next) {
    try {
      const id = req["params"]["id"];
      res.json(await this.booksService.getBook(id));
    } catch (error) {
      next(error);
    }
  }

  async updateBook(req, res, next) {
    try {
      const id = req.params.id;
      const title = req.body.title;
      const coverUrl = req.body.coverUrl;
      let book = new Book(id, title, coverUrl);
      book = await this.booksService.updateBook(book);
      res.json(book);
    } catch (error) {
      next(error);
    }
  }

  async deleteBook(req, res, next) {
    try {
      const id = req["params"]["id"];
      console.log("Id:", id);
      await this.booksService.deleteBook(id);
      res.statusCode = 204;
      res.json();
    } catch (error) {
      next(book);
    }
  }
}

module.exports = BooksController;

const { v4: uuidv4 } = require("uuid");
const Book = require("./book");
const BooksRepository = require("./books-repository");

class BooksService {
  /**
   *
   * @param {BooksRepository} booksRepository
   */
  constructor(booksRepository) {
    this.books = [];
    this.booksRepository = booksRepository;
  }

  /**
   *
   * @param {String} id
   * @param {String} title
   * @returns {Book}
   */
  async createBook(title) {
    if (!title) {
      throw new Error("title is required");
    }
    const book = new Book(uuidv4(), title);
    await this.booksRepository.insertBook(book);
    return book;
  }

  /**
   *
   * @param {Number} id
   * @return {Book}
   */
  getBook(id) {
    const book = this.book.find((book) => {
      return book.id === id;
    });
    return book;
  }
  async listBooks() {
    return await this.booksRepository.listBooks();
  }
}

module.exports = BooksService;

// rentBook(userId, bookId) {}

// returnBook(bookId) {}

// createBook(title) {}

// listBooks() {
//   const book = new Book(6, "ABC");
//   return [book];
// }

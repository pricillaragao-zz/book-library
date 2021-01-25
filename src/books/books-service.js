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
   * @param {URL} coverUrl
   * @returns {Book}
   */
  async createBook(title, coverUrl) {
    if (!title) {
      throw new Error("title is required");
    }
    const book = new Book(uuidv4(), title, coverUrl);
    await this.booksRepository.insertBook(book);
    return book;
  }

  /**
   *
   * @param {String} id
   * @return {Book}
   */
  async getBook(id) {
    return await this.booksRepository.getBook(id);
  }

  /**
   * @returns {[Book]}
   */
  async listBooks() {
    return await this.booksRepository.listBooks();
  }

  /**
   *
   * @param {Book} book
   * @returns {Book}
   */
  async updateBook(book) {
    return await this.booksRepository.updateBook(book);
  }

  async deleteBook(id) {
    await this.booksRepository.deleteBook(id);
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

const { v4: uuidv4 } = require("uuid");
const Book = require("./book");
const booksRepository = require("./books-repository");

/**
 * @param {String} id
 * @param {String} title
 * @param {URL} coverUrl
 * @returns {Book}
 */
const createBook = async (title, coverUrl) => {
  if (!title) {
    throw new Error("title is required");
  }
  const book = new Book(uuidv4(), title, coverUrl);
  await booksRepository.insertBook(book);
  return book;
};

/**
 * @param {String} id
 * @return {Book}
 */
const getBook = async (id) => {
  return await booksRepository.getBook(id);
};

/**
 * @returns {[Book]}
 */
const listBooks = async () => {
  return await booksRepository.listBooks();
};

/**
 *
 * @param {Book} book
 * @returns {Book} the updated book
 */
const updateBook = async (book) => {
  return await booksRepository.updateBook(book);
};

/**
 * @param {String} id
 */
const deleteBook = async (id) => {
  await booksRepository.deleteBook(id);
};

module.exports = {
  createBook,
  getBook,
  listBooks,
  updateBook,
  deleteBook,
};

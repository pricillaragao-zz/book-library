const Knex = require("knex");
const db = require("../db");
const Book = require("./book");

const table = "books";

/**
 * @param {Book} book
 */
const insertBook = async (book) => {
  const query = `insert into ${table} (id, title, cover_url, book_url, review) values (:id, :title, :coverUrl, :bookUrl, :review)`;
  await db.raw(query, {
    id: book.id,
    title: book.title,
    coverUrl: book.coverUrl,
    bookUrl: book.bookUrl,
    review: book.review,
  });
};

/**
 * @return {[Book]} list of all books
 */
const listBooks = async () => {
  const query = `select * from ${table};`;

  const result = await db.raw(query);

  return result.rows.map((row) => {
    return new Book(row.id, row.title, row.cover_url, row.book_url, row.review);
  });
};

/**
 * @param {string} id
 * @returns {Book} book
 */
const getBook = async (id) => {
  const query = `select * from ${table} where id = :id`;
  const result = await db.raw(query, {
    id,
  });
  const row = result.rows[0];
  return new Book(row.id, row.title, row.coverUrl, row.bookUrl, row.review);
};

/**
 * @param {Book} book
 * @returns {Book} updated book
 */
const updateBook = async (book) => {
  const result = await db(table)
    .where("id", "=", book.id)
    .update({
      title: book.title,
      cover_url: book.coverUrl,
      book_url: book.bookUrl,
      review: book.review,
    })
    .returning("*");

  const row = result[0];

  return new Book(row.id, row.title, row.cover_url, row.book_url, book.review);
};

/**
 * @param {string} id
 */
const deleteBook = async (id) => {
  await db(table).where("id", "=", id).delete();
};

module.exports = {
  insertBook,
  listBooks,
  getBook,
  updateBook,
  deleteBook,
};

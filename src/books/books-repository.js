const Knex = require("knex");
const User = require("../users/user");
const Book = require("./book");

class BooksRepository {
  /**
   * @param {Knex} knex
   */
  constructor(knex) {
    this.knex = knex;
    this.table = "books";
  }

  /**
   * @param {Book} book
   */
  async insertBook(book) {
    const query = `insert into ${this.table} (id, title, cover_url) values (:id, :title, :coverUrl)`;
    await this.knex.raw(query, {
      id: book.id,
      title: book.title,
      coverUrl: book.coverUrl
    });
  }

  /**
   * @return {[Book]} list of all books
   */
  async listBooks() {
    const query = `select * from ${this.table};`;

    const result = await this.knex.raw(query);

    return result.rows.map((row) => {
      return new Book(row.id, row.title, row.cover_url);
    });
  }

  async getBook(id) {
    const query = `select * from ${this.table} where id = :id`;
    const result = await this.knex.raw(query, {
      id,
    });
    const row = result.rows[0];
    return new Book(row.id, row.title, row.coverUrl);
  }

  /**
   * @param {Book} book
   * @returns {Book} updated book
   */
  async updateBook(book) {
    const result = await this.knex(this.table).where("id", "=", book.id).update({
      title: book.title,
      cover_url: book.coverUrl
    }).returning('*');

    const row = result[0];

    return new Book(row.id, row.title, row.cover_url);
  }

  async deleteBook(id) {
    await this.knex(this.table).where("id", "=", id).delete();
  }
}

module.exports = BooksRepository;

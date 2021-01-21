const path = require("path");
const Knex = require("knex");
const Book = require("./book");

class BooksRepository {
  /**
   *
   * @param {Knex} knex
   */
  constructor(knex) {
    this.knex = knex;
    this.table = "books";
  }

  /**
   *
   * @param {Book} book
   */
  async insertBook(book) {
    const query = `insert into ${this.table} (id, title) values (:id, :title)`;
    await this.knex.raw(query, {
      id: book.id,
      title: book.title,
    });
  }

  /**
   * @return {[Book]} list of all books
   */
  async listBooks() {
    const query = `select * from ${this.table};`;

    const result = await this.knex.raw(query);

    return result.rows.map((row) => {
      return new Book(row.id, row.title);
    });
  }

  async getBook(id) {
    const query = `select * from ${this.table} where id = :id`;
    const result = await this.knex.raw(query, {
      id,
    });
    const row = result.rows[0];
    return new Book(row.id, row.title);
  }

  /**
   *
   * @param {Book} book
   */
  async updateBook(book) {
    await this.knex(this.table).where("id", "=", book.id).update({
      title: book.title,
    });
  }

  async deleteBook(id) {
    await this.knex(this.table).where("id", "=", id).delete();
  }
}

module.exports = BooksRepository;

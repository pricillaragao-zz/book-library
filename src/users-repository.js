const path = require("path");
const Knex = require("knex");
const User = require("./user");

class UsersRepository {
  /**
   *
   * @param {Knex} knex
   */
  constructor(knex) {
    this.knex = knex;
    this.table = "users";
  }
  /**
   *
   * @param {User} user
   */
  async insertUser(user) {
    const query = `insert into ${this.table} (id, name) values (:id, :name);`;
    await this.knex.raw(query, {
      id: user.id,
      name: user.name,
    });
  }

  /**
   * @return {[User]} list of all users
   */
  async listUsers() {
    const query = `select * from ${this.table};`;

    const result = await this.knex.raw(query);

    return result.rows.map((row) => {
      return new User(row.id, row.name);
    });
  }

  async getUser(id) {
    const query = `select * from ${this.table} where id = :id;`;
    const result = await this.knex.raw(query, {
      id,
    });
    const row = result.rows[0];
    return new User(row.id, row.name);
  }

  /**
   *
   * @param {User} user
   */
  async updateUser(user) {
    await this.knex(this.table).where("id", "=", user.id).update({
      name: user.name,
    });
  }

  async deleteUser(id) {
    await this.knex(this.table).where("id", "=", id).delete();
  }
}

module.exports = UsersRepository;

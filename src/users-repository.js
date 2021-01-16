const path = require("path");
const fs = require("fs");
const {Pool} = require("pg")
const readLine = require("readline");
const User = require("./user");

class UsersRepository {
  /**
   * 
   * @param {Pool} pool 
   */
  constructor(pool) {
    this.filepath = path.join(__dirname, "users.csv");
    this.pool = pool
    this.table = "users"
  }
  /**
   *
   * @param {User} user
   */
  async insertUser(user) {
    try {
      await this.pool.query(`insert into ${this.table} (id, name) values ($1::uuid, $2::text)`, [user.id, user.name])     
    } catch (err) {
      throw err
    }
  }

  /**
   * @return {[User]} list of all users
   */
  async listUsers() {
    // https://nodejs.org/api/readline.html#readline_example_read_file_stream_line_by_line
    const fileStream = fs.createReadStream(this.filepath);

    const rl = readLine.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    const users = [];

    for await (const line of rl) {
      const [id, name, address] = line.split(",");

      const user = new User(id, name, address);

      users.push(user);
    }
    return users;
  }
}

module.exports = UsersRepository;

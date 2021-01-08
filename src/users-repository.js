const path = require('path')
const fs = require('fs')
const readLine = require('readline')
const User = require("./user")

class UsersRepository {
  constructor() {
    this.filepath = path.join(__dirname, "users.csv")
  }
  /**
   * 
   * @param {User} user 
   */
  async insertUser(user) {
    const data = `\n${user.id}, ${user.name}, ${user.address}`
    await fs.appendFile(this.filepath, data, (error) => {
      if (error) {
        throw error 
      }
    })
  }

  /**
   * @return {[User]} list of all users  
   */
  async listUsers() {
    // https://nodejs.org/api/readline.html#readline_example_read_file_stream_line_by_line
    const fileStream = fs.createReadStream(this.filepath)

    const rl = readLine.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    })

    const users = []

    for await (const line of rl) {
      const [id, name, address] = line.split(",")

      const user = new User(id, name, address)

      users.push(user)
    }
    return users
  }
}


module.exports = UsersRepository

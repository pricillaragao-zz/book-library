const { v4: uuidv4 } = require('uuid')
const User = require('./user')
const UsersRepository = require('./users-repository')

class UsersService {
  /**
   * 
   * @param {UsersRepository} usersRepository 
   */
  constructor(usersRepository) {
    this.users = []   
    this.usersRepository = usersRepository
  }
  /**
   * 
   * @param {String} name 
   * @param {String} address 
   * @returns {User}
   */
  async createUser(name, address) {
    if (!name) {
      throw new Error("name is required")
    }
    if (!address) {
      throw new Error("address is required")
    }
    const user = new User(uuidv4(), name, address)
    await this.usersRepository.insertUser(user)
    return user 
  }
  /**
   * 
   * @param {String} id 
   * @returns {User}
   */
  getUser(id) {
    const user = this.users.find((user) => {
      return user.id === id 
    })
    return user
  }

  async listUsers() {
    return await this.usersRepository.listUsers() 
  }

}

module.exports = UsersService; 

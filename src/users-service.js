const { v4: uuidv4 } = require("uuid");
const User = require("./user");
const UsersRepository = require("./users-repository");

class UsersService {
  /**
   *
   * @param {UsersRepository} usersRepository
   */
  constructor(usersRepository) {
    this.users = [];
    this.usersRepository = usersRepository;
  }
  /**
   *
   * @param {String} name
   * @param {String} address
   * @returns {User}
   */
  async createUser(name, address) {
    if (!name) {
      throw new Error("name is required");
    }
    if (!address) {
      throw new Error("address is required");
    }
    const user = new User(uuidv4(), name, address);
    await this.usersRepository.insertUser(user);
    return user;
  }
  /**
   *
   * @param {String} id
   * @returns {User}
   */
  async getUser(id) {
    return await this.usersRepository.getUser(id);
  }

  /**
   * @returns {[User]}
   */
  async listUsers() {
    return await this.usersRepository.listUsers();
  }

  /**
   *
   * @param {User} user
   * @returns {User}
   */
  async updateUser(user) {
    await this.usersRepository.updateUser(user);
    return this.getUser(user.id);
  }

  async deleteUser(id) {
    await this.usersRepository.deleteUser(id);
  }
}

module.exports = UsersService;

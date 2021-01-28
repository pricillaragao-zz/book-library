const { v4: uuidv4 } = require("uuid");
const User = require("./user");
const usersRepository = require("./users-repository");

/**
 * @param {String} id
 * @param {String} name
 * @param {Strind} address
 * @returns {User}
 */
createUser = async (name, address) => {
  if (!name) {
    throw new Error("name is required");
  }
  if (!address) {
    throw new Error("address is required");
  }
  const user = new User(uuidv4(), name, address);
  await usersRepository.insertUser(user);
  return user;
};
/**
 *
 * @param {String} id
 * @returns {User}
 */
getUser = async (id) => {
  return await usersRepository.getUser(id);
};

/**
 * @returns {[User]}
 */
listUsers = async () => {
  return await usersRepository.listUsers();
};

/**
 *
 * @param {User} user
 * @returns {User}
 */
updateUser = async (user) => {
  await usersRepository.updateUser(user);
  return getUser(user.id);
};

deleteUser = async (id) => {
  await usersRepository.deleteUser(id);
};

module.exports = {
  createUser,
  getUser,
  listUsers,
  updateUser,
  deleteUser,
};

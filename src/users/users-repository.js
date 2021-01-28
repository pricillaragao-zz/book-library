const Knex = require("knex");
const db = require("../db");
const User = require("./user");

const table = "users";

/**
 * @param {User} user
 */
const insertUser = async (user) => {
  const query = `insert into ${table} (id, name) values (:id, :name);`;
  await db.raw(query, {
    id: user.id,
    name: user.name,
  });
};

/**
 * @return {[User]} list of all users
 */
const listUsers = async () => {
  const query = `select * from ${table};`;

  const result = await db.raw(query);

  return result.rows.map((row) => {
    return new User(row.id, row.name);
  });
};

const getUser = async (id) => {
  const query = `select * from ${table} where id = :id;`;
  const result = await db.raw(query, {
    id,
  });
  console.log("result", id);
  const row = result.rows[0];
  return new User(row.id, row.name);
};

/**
 * @param {User} user
 * @returns {User} updated user
 */
const updateUser = async (user) => {
  const result = await db(table)
    .where("id", "=", user.id)
    .update({
      name: user.name,
      address: user.address,
    })
    .returning("*");

  const row = result[0];

  return new User(row.id, row.name, row.address);
};

const deleteUser = async (id) => {
  await db(table).where("id", "=", id).delete();
};

module.exports = {
  insertUser,
  listUsers,
  getUser,
  updateUser,
  deleteUser,
};

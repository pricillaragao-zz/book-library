const { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } = require("constants");
const { Pool, Client } = require("pg");

//POOL
const pool = new Pool({
  user: "pricillapatriciadearagao",
  host: "localhost",
  database: "netflix",
  password: null,
  port: 5432,
});
pool.query("SELECT NOW()", (err, res) => {
  console.log(err, res);
  pool.end();
});

//CLIENT
const client = new Client({
  user: "pricillapatriciadearagao",
  host: "localhost",
  database: "netflix",
  password: null,
  port: 5432,
});
client.connect();

const res = client.query("SELECT NOW()", (err, res) => {
  console.log(err, res);
  client.end();
});

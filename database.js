var mysql = require("mysql");
const QueryBuilder = require("node-querybuilder");
const settings = {
  host: "localhost",
  database: "expensesplit",
  user: "root",
  password: "",
};
const con = new QueryBuilder(settings, "mysql", "pool");
module.exports = con;

const res = require("express/lib/response");
const con = require("./database");

async function getUserOwnsBy(id) {
  try {
    const qb = await con.get_connection();

    const response = await qb
      .select(["name", "user_owns.amount"])
      .where("owns_to_id", id)
      .join("users", "users.u_id=user_owns.owns_by_id")
      .get("user_owns");
    console.log("Query Ran: " + qb.last_query());
    return response;
  } catch (error) {
    return false;
  }
}
async function getUserOwnsTo(id) {
  try {
    const qb = await con.get_connection();

    const response = await qb
      .select(["name", "user_owns.amount"])
      .where("owns_by_id", id)
      .join("users", "users.u_id=user_owns.owns_to_id")
      .get("user_owns");
    return response;
  } catch (error) {
    return false;
  }
}

module.exports = {
  getUserOwnsBy,
  getUserOwnsTo,
};

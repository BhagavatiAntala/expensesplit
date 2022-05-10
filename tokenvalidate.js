const res = require("express/lib/response");
const con = require("./database");

async function validateToken(user_id, token) {
  try {
    const qb = await con.get_connection();
    const response = await qb
      .select("*")
      .where({ u_id: user_id, "token ": token })
      .get("users");
    if (response.length > 0) return true;
    qb.disconnect();
    return false;
  } catch (error) {
    return false;
  }
}
module.exports = {
  validateToken,
};

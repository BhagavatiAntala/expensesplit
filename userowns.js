const res = require("express/lib/response");
const con = require("./database");
async function userOwns(user_by_id, user_to_id, amount) {
  try {
    console.log("userOwns");
    await new Promise(async (resolve, reject) => {
      const qb = await con.get_connection();
      const ownsTo = await qb
        .select("*")
        .where({ owns_by_id: user_to_id, owns_to_id: user_by_id })
        .get("user_owns");

      if (ownsTo.length > 0) {
        let difference = parseFloat(amount) - parseFloat(ownsTo[0].amount);
        if (difference >= 0) {
          await qb.update(
            "user_owns", //table name
            { "amount ": 0 }, //set
            { owns_by_id: user_to_id, owns_to_id: user_by_id } //Where
          );
          amount = difference;
        } else {
          await qb.update(
            "user_owns", //table name
            { "amount ": Math.abs(difference) }, //set
            { owns_by_id: user_to_id, owns_to_id: user_by_id } //Where
          );
          amount = 0;
        }
      }
      if (amount > 0) {
        const response = await qb
          .select("*")
          .where({ owns_by_id: user_by_id, owns_to_id: user_to_id })
          .get("user_owns");
        if (response.length > 0) {
          await qb.update(
            "user_owns", //table name
            { "amount ": parseFloat(amount) + parseFloat(response[0].amount) }, //set
            { owns_by_id: user_by_id, owns_to_id: user_to_id } //Where
          );
        } else {
          await qb.insert("user_owns", {
            owns_by_id: user_by_id,
            owns_to_id: user_to_id,
            amount: amount,
          });
        }
      }
      qb.disconnect();
      resolve(1);
    });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

module.exports = {
  userOwns,
};

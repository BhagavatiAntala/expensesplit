const res = require("express/lib/response");
const con = require("./database");
const { userOwns } = require("./userowns");
async function EqualSplit(data) {
  try {
    let splitWith = data.splitwith.split(",");
    let totalPerson = splitWith.length + 1;
    let perPersonAmount = data.amount / totalPerson;
    splitWith.forEach(async (user_id) => {
      await userOwns(user_id, data.user_id, perPersonAmount.toFixed(2));
    });
    return true;
  } catch (error) {
    return false;
  }
}
async function ExactSplit(data) {
  try {
    let splitWith = data.splitwith.split(",");
    let splitWithamount = data.splitcondition.split(",");
    splitWith.forEach(async (user_id, index) => {
      await userOwns(
        user_id,
        data.user_id,
        parseFloat(splitWithamount[index]).toFixed(2)
      );
    });

    return true;
  } catch (error) {
    return false;
  }
}
async function PercentageSplit(data) {
  try {
    let splitWith = data.splitwith.split(",");
    let splitWithamount = data.splitcondition.split(",");
    splitWith.forEach(async (user_id, index) => {
      if (index < splitWith.length - 1) {
        await userOwns(
          user_id,
          data.user_id,
          (
            (parseFloat(data.amount) * parseFloat(splitWithamount[index])) /
            100
          ).toFixed(2)
        );
      }
    });
    return true;
  } catch (error) {
    return false;
  }
}

module.exports = {
  EqualSplit,
  ExactSplit,
  PercentageSplit,
};

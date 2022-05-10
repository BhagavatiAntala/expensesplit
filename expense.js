const res = require("express/lib/response");
const con = require("./database");
const {
  validateEqualSplitData,
  validateExactSplitData,
  validatePercentageSplitData,
} = require("./validations");
const { EqualSplit, ExactSplit, PercentageSplit } = require("./split");
async function addExpense(data) {
  try {
    console.log("addExpense");
    const qb = await con.get_connection();
    let valid = false;
    if (data.type == 0) {
      valid = await validateEqualSplitData(data);
    } else if (data.type == 1) {
      valid = await validateExactSplitData(data);
    } else if (data.type == 2) {
      valid = await validatePercentageSplitData(data);
    } else {
      return { status: 0, message: "Invalid Split Type" };
    }
    if (valid) {
      qb.insert("expense", {
        user_id: data.user_id,
        type: data.type,
        amount: data.amount,
        splitwith: data.splitwith,
        splitcondition: data.splitcondition,
      });

      switch (parseInt(data.type)) {
        case 0:
          await EqualSplit(data);
          break;
        case 1:
          await ExactSplit(data);
          break;
        case 2:
          await PercentageSplit(data);
          break;
      }
      qb.disconnect();
      return { status: 1, message: "Bill Splitted Successfully" };
    } else {
      return { status: 0, message: "Invalid Details" };
    }
  } catch (error) {
    return { status: 0, message: "Invalid Call Try Again" };
  }
}

module.exports = {
  addExpense,
};

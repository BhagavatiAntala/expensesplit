const res = require("express/lib/response");
async function validateEqualSplitData(data) {
  try {
    let splitWith = data.splitwith.split(",");
    if (splitWith.includes(data.user_id)) return false;
    return true;
  } catch (error) {
    return false;
  }
}
async function validateExactSplitData(data) {
  try {
    let splitWith = data.splitwith.split(",");
    if (splitWith.includes(data.user_id)) return false;
    let splitWithamount = data.splitcondition.split(",");
    if (splitWith.length != splitWithamount.length) return false;
    let total = splitWithamount.reduce(function (a, b) {
      return parseFloat(a) + parseFloat(b);
    }, 0);
    if (total > data.amount) return false;
    return true;
  } catch (error) {
    return false;
  }
}
async function validatePercentageSplitData(data) {
  try {
    console.log("validatePercentageSplitData");
    let splitWith = data.splitwith.split(",");
    let splitWithamount = data.splitcondition.split(",");
    if (splitWith.length != splitWithamount.length) return false;
    let total = splitWithamount.reduce(function (a, b) {
      return parseFloat(a) + parseFloat(b);
    }, 0);
    if (total != 100) return false;
    return true;
  } catch (error) {
    return false;
  }
}

module.exports = {
  validateEqualSplitData,
  validateExactSplitData,
  validatePercentageSplitData,
};

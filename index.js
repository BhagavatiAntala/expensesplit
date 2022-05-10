const con = require("./database");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { addExpense } = require("./expense");
const { validateToken } = require("./tokenvalidate");
const { getUserOwnsBy, getUserOwnsTo } = require("./getuserowns");

const app = express();
app.use(cors({ origin: true })); // By default I have allowed all origins

app.use(
  bodyParser.urlencoded({
    limit: "1024mb",
    extended: true,
    parameterLimit: 1024000000,
  })
);
app.use(bodyParser.json());

app.use(function (req, res, next) {
  if (req.headers.authorization != undefined) {
    //
    next();
  } else {
    return res.send({
      message: "Invalid API call",
      status: 0,
    });
  }
});

// Select Active User
app.get("/", async function (req, res) {
  try {
    res.send(JSON.stringify({ status: 0, message: "API root called" }));
  } catch (error) {
    res.send(
      JSON.stringify({
        status: 0,
        message: "Something Went Wrong, Please Try Again!!!",
      })
    );
  }
});

app.post("/addexpense", async function (req, res) {
  try {
    let authtoken = req.headers.authorization.replace("Bearer ", "");
    if (await validateToken(req.body.user_id, authtoken)) {
      let response = await addExpense(req.body);
      res.send(JSON.stringify(response));
    } else {
      res.send(
        JSON.stringify({ status: 0, message: "User Not Authenticated" })
      );
    }
  } catch (error) {
    res.send(
      JSON.stringify({
        status: 0,
        message: "Something Went Wrong, Please Try Again!!!",
      })
    );
  }
});

// Get Owns By Id
app.get("/getownsbyid/:id", async function (req, res) {
  try {
    let authtoken = req.headers.authorization.replace("Bearer ", "");
    if (await validateToken(req.params.id, authtoken)) {
      result = await getUserOwnsBy(req.params.id);
      res.send(
        JSON.stringify({
          data: result,
        })
      );
    } else {
      res.send(
        JSON.stringify({ status: 0, message: "User Not Authenticated" })
      );
    }
  } catch (error) {
    res.send(
      JSON.stringify({
        status: 0,
        message: "Something Went Wrong, Please Try Again!!!",
      })
    );
  }
});
// Get Owns To Id
app.get("/getownstoid/:id", async function (req, res) {
  try {
    let authtoken = req.headers.authorization.replace("Bearer ", "");
    if (await validateToken(req.params.id, authtoken)) {
      result = await getUserOwnsTo(req.params.id);
      res.send(
        JSON.stringify({
          data: result,
        })
      );
    } else {
      res.send(
        JSON.stringify({ status: 0, message: "User Not Authenticated" })
      );
    }
  } catch (error) {
    res.send(
      JSON.stringify({
        status: 0,
        message: "Something Went Wrong, Please Try Again!!!",
      })
    );
  }
});
app.listen("3000", function () {
  console.log("Server Successfully Created");
});

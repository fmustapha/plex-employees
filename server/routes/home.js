const express = require("express");
const router = express.Router();
const cors = require("cors");
const employees = require("../data/employees.json");


var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

router.get("/", cors(corsOptions), (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  res.status(200);
  res.send(JSON.stringify(employees, null, 2));
});

module.exports = router
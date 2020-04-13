const startUpDebugging = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db')
const config = require("config");
const helmet = require("helmet");
const morgan = require("morgan");
const express = require("express");
const cors = require("cors");
const Joi = require("Joi");
const app = express();
const employees = require("./data/employees.json");
const auth = require('./middleware/auth');

app.use(express.json());
app.use(helmet());
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  startUpDebugging("morgan running...");
}

//Db Debugging
dbDebugger('Connecting to the Database...')

//Configuration
console.log("Application Name: " + config.get("name"));

const port = process.env.PORT || 8080;

var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.get("/api/employees", cors(corsOptions), (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  res.status(200);
  res.send(JSON.stringify(employees, null, 2));
});

app.post("/api/employees", cors(corsOptions), (req, res, next) => {
  //Validate the req.body
  const { error } = validateEmployee(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  //Check if the employee already exists by checking the name
  employees.forEach((employee) => {
    if (req.body.name === employee.name)
      return res.status(409).send("Employee already exists");
  });

  //Push the new employee data into the existing employees array
  let id = employees.length + 1;
  const employee = { id, ...req.body };
  employees.push(employee);
  return res.send(employees);
});

app.put("/api/employees/:id", cors(corsOptions), (req, res, next) => {
  const employee = employees.find((e) => e.id === parseInt(req.params.id, 10));
  if (!employee) return res.status(404).send("The employee does not exist");

  const { error } = validateEmployee(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const { name, code, profession, color, city, branch, assigned } = req.body;
  employee.name = name;
  employee.code = code;
  employee.profession = profession;
  employee.color = color;
  employee.city = city;
  employee.branch = branch;
  employee.assigned = assigned;

  return res.status(200).send(employee);
});

app.delete("/api/employees/:id", (req, res) => {
  const employee = employees.find((e) => e.id === parseInt(req.params.id));
  if (!employee) return res.status(404).send("Employee does not exist");

  const index = employees.indexOf(employee);
  employees.splice(index, 1);
  return res.send(employee);
});

function validateEmployee(data) {
  const schema = {
    name: Joi.string().min(4).max(15).required(),
    code: Joi.string().min(2).max(12).required(),
    profession: Joi.string().min(4).max(12).required(),
    color: Joi.string().min(4).max(12).required(),
    city: Joi.string().min(3).max(15).required(),
    branch: Joi.string().min(4).max(12).required(),
    assigned: Joi.boolean(),
  };

  return Joi.validate(data, schema);
}

app.listen(port, () =>
  console.log(`Job Dispatch API running on port ${port}!`)
);

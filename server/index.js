const express = require("express");
const cors = require("cors");
const app = express();
const employees = require("./data/employees.json");

app.use(express.json());

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
  // return 400 - bad request if invalid
  const { name } = req.body;
  if (employees.find((e) => e.name === name)) {
    return res.status(400).send("The employee already exists");
  }

  //Check if the employee already exists by checking the name
  //If true return 300 already exists . error

  // push the new employee data into the existing employees array
  console.log(req.body);
  let id = employees.length;
  id += 1;
  const employee = { id, ...req.body };
  employees.push(employee);
  res.status(200).send(employees);
});

app.put("/api/employees/:id", cors(corsOptions), (req, res, next) => {
  console.log(req.params.id, "id");
  const employee = employees.find((e) => e.id === parseInt(req.params.id, 10));
  if (!employee) return res.status(404).send("The employee does not exist");

  if (!validateEmployee(req.body)) {
    return res.status(400).send("The name should be 5 to 20 characters long");
  }

  const { name, code, profession, color, city, branch, assigned } = req.body;
  employee.name = name;
  employee.code = code;
  employee.profession = profession;
  employee.color = color;
  employee.city = city;
  employee.branch = branch;
  employee.assigned = assigned;

  res.status(200);
  res.send(employee);
});

app.delete("/api/employees/:id", (req, res) => {
  const employee = employees.find((e) => e.id === parseInt(req.params.id));
  if (!employee) return res.status(404).send("Employee does not exist");

  const index = employees.indexOf(employee);
  employees.splice(index, 1);
  res.send(employees);
});

function validateEmployee(data) {
  const { name } = data;
  if (name.length >= 5 && name.length <= 20) {
    return true;
  }
  return false;
}

app.listen(port, () => console.log(`Job Dispatch API running on port ${port}!`));

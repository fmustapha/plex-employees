const express = require("express");
const cors = require("cors");
const app = express();
const employees = require("./data/employees.json");

app.use(express.json());

var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.get("/api/employees", cors(corsOptions), (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  res.status(200);
  res.send(JSON.stringify(employees, null, 2));
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

function validateEmployee(data) {
  if (data.name.length >= 5 && data.name.length <= 20) {
    return true;
  }
  return false;
}

app.listen(8080, () => console.log("Job Dispatch API running on port 8080!"));

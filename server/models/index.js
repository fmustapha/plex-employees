const { Sequelize, DataTypes } = require("sequelize");

//configure
const sequelize = new Sequelize("empapp", "postgres", "pass", {
  host: "localhost",
  dialect: "postgres",
});

//connect to DB
async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.log("Unable to connect to the database", error);
  }
}
//create model
const Employee = sequelize.define(
  "Employee",
  {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profession: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    branch: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    assigned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    // Other model options go here
    freezeTableName: true,
  }
);

// `sequelize.define` also returns the model
console.log(Employee === sequelize.models.Employee); // true

//sync model
// async function syncDB() {
//   await Employee.sync({ alter: true });
//   console.log("The Employee table was just re(created)!");
// }

//create Employee record
async function createEmployee() {
  const employee = await Employee.create(
    {
      name: "Jonas Valanciunas",
      code: "F103",
      profession: "Drywall Installer",
      color: "#333333",
      city: "Bolton",
      branch: "Pillsworth",
    },
    { fields: ["name", "code", "profession", "color", "city", "branch"] }
  );
  console.log("Employee with Id ", employee.id, " successfully created!");
}

async function getEmployees() {
  const employees = await Employee.findAll();

  console.log("All Employees:", JSON.stringify(employees, null, 2));
}

async function updateEmployees(id) {
  const employee = await Employee.findByPk(id);
  if (!employee) return;

  (employee.code = "F120"),
    (employee.profession = "Tailor"),
    (employee.color = "#5e5e5e"),
    (employee.city = "Houston"),
    (employee.branch = "Waterscotch");

  const result = await employee.save();
  console.log("result", JSON.stringify(result, null, 2));
}

async function deleteEmployee(id) {
  const result = await Employee.destroy({
    where: {
      id: id 
    }
  })

  console.log("Result: ", result)
}

connectDB();
// syncDB();
// createEmployee();
// getEmployees();
// updateEmployees(4);
deleteEmployee(1)
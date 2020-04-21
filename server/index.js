const startUpDebugging = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const config = require("config");
const helmet = require("helmet");
const morgan = require("morgan");
const express = require("express");
const app = express();
const employees = require("./routes/employees");
const home = require("./routes/home");
const auth = require("./middleware/auth");
const log = require("./middleware/logger");

app.use(express.json());
app.use(helmet());
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  startUpDebugging("morgan running...");
}
app.use("/api/employees", employees);
app.use("/", home);

app.use(log)

const port = process.env.PORT || 8080;

app.listen(port, () =>
  console.log(`Job Dispatch API running on port ${port}!`)
);

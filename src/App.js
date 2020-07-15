import React, { useState, useEffect, useMemo } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { getEmployees } from "./services/employeeService";
import Table from "./components/common/Table";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import EmployeeForm from "./components/common/employeeForm";

const App = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    async function getEmp() {
      try {
        const result = await getEmployees();
        setEmployees(result.data);
      } catch (err) {
        console.log(err, "<--err");
      }
    }
    getEmp();
  }, []);

  let newData = employees.map((e) => {
    delete e.id;
    return { ...e, assigned: e.assigned === false ? "No" : "Yes" };
  });

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Code",
        accessor: "code",
      },
      {
        Header: "Profession",
        accessor: "profession",
      },
      {
        Header: "Color",
        accessor: "color",
      },
      {
        Header: "City",
        accessor: "city",
      },
      {
        Header: "Branch",
        accessor: "branch",
      },
      {
        Header: "Assigned",
        accessor: "assigned",
      },
    ],
    []
  );

  const data = useMemo(() => newData, [newData]);

  return (
    <React.Fragment>
      <ToastContainer autoClose={8000} dragable={false} />
      <h1>Plex Employees</h1>
      <div className="App">
        <Switch>
          <Route path="/add-employee" component={EmployeeForm} />
          <Route
            path="/"
            render={(props) => (
              <Table columns={columns} data={data} {...props} />
            )}
          />
          <Redirect from="/" exact to="/employees" />
        </Switch>
      </div>
    </React.Fragment>
  );
};

export default App;

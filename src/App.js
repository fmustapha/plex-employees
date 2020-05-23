import React, { useState, useEffect, useMemo } from "react";
import { getEmployees } from "./services/employeeService";
import Table from "./components/Table";

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
    delete e.id
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
    <div className="App">
      <h1>Plex Employees</h1>
      <Table columns={columns} data={data} />
    </div>
  );
};

export default App;

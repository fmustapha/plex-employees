import React, { Component } from "react";

class EmployeeForm extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <h2>Add Employee</h2>

        <form action="post">
          <div>
            <div>
              <label htmlFor="name">Name:</label>
            </div>
            <div>
              <input id="name" name="name" type="text"></input>
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="code">Code:</label>
            </div>
            <div>
              <input id="code" name="code" type="text"></input>
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="profession">Profession:</label>
            </div>
            <div>
              <input id="profession" name="profession" type="text"></input>
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="color">Color</label>
            </div>
            <div>
              <input id="color" name="color" type="text"></input>
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="city">City</label>
            </div>
            <div>
              <input id="city" name="city" type="text"></input>
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="branch">Branch</label>
            </div>
            <div>
              <input id="branch" name="branch" type="text"></input>
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="assigned">Assigned:</label>
            </div>
            <div>
              <input id="assigned" name="assigned" type="text"></input>
            </div>
          </div>
          <div>
            <div>
              <button type="submit">Add</button>
            </div>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default EmployeeForm;

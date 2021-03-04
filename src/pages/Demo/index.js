import React, { Component, useState } from "react";
import UserTable from "./table";
import AddUserForm from "./add";
import EditUserForm from "./edit";
import { Col, Row } from "reactstrap";

class Demo extends React.Component {
  initialUser = { id: null, name: "",};

  state = {
    users: [],
    currentUser: this.initialUser,
    editing: false,
  };

  addService = (user) => {
    this.setState({
      users: [
        ...this.state.users,
        {
          ...user,
          id: this.state.users.length + 1,
        },
      ],
    });
  };

  deleteService = (id) => {
    this.setState({
      users: this.state.users.filter((user) => user.id !== id),
    });
  };

  editService = (id, user) => {
    this.setState({
      editing: true,
      currentUser: user,
    });
  };

  updateService = (newUser) => {
    this.setState({
      users: this.state.users.map((user) =>
        user.id === this.state.currentUser.id ? newUser : user
      ),
      currentUser: this.initialUser,
      editing: false,
    });
  };

  render() {
    return (
      <div className="App">
        <div>
          <Row>
            <Col>
              {this.state.editing ? (
                <div>
                  <h4>Edit Service</h4>
                  <EditUserForm
                    currentUser={this.state.currentUser}
                    setEditing={this.state.setEditing}
                    updateService={this.updateService}
                  />
                </div>
              ) : (
                <div>
                  <h4>Add Service</h4>
                  <AddUserForm
                    addService={this.addService}
                    setEditing={this.state.setEditing}
                  />
                </div>
              )}
            </Col>
          </Row>
        </div>
        <Row>
          <Col style={{ marginTop: "40px" }}>
            <UserTable
              users={this.state.users}
              deleteService={this.deleteService}
              editService={this.editService}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Demo;

import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import ModalForm from "../../components/model/notificationModel";
import { CSVLink } from "react-csv";
import NotificationTable from "../../components/table/notificationTable";
import { GetNotification } from "src/api/notification";

class Notification extends Component {
  state = {
    items: [],
  };

  addItemToState = (item) => {
    this.setState((prevState) => ({
      items: [...prevState.items, item],
    }));
  };

  updateState = (item) => {
    console.log(item.id);
    const itemIndex = this.state.items.findIndex((data) => data.id === item.id);
    const newArray = [
      ...this.state.items.slice(0, itemIndex),
      item,
      ...this.state.items.slice(itemIndex + 1),
    ];
    this.setState({ items: newArray });
  };

  deleteItemFromState = (id) => {
    console.log("ID", id);
    const updatedItems = this.state.items.filter((item) => item.id !== id);
    this.setState({ items: updatedItems });
  };

  async componentDidMount() {
    let rs = await GetNotification();
    this.setState({ items: rs });
  }

  render() {
    return (
      <Container className="App">
        <div>
          <Row>
            <Col>
              <div class="d-flex bg-light border">
                <div class="p-2 flex-grow-1">
                  <h5>Notification Details</h5>
                </div>
                <div class="p-2">
                  <CSVLink
                    filename={"db.csv"}
                    color="primary"
                    className="btn btn-primary"
                    data={this.state.items}
                  >
                    Download CSV
                  </CSVLink>
                </div>
                <div class="p-2">
                  <ModalForm
                    buttonLabel="Add Item"
                    addItemToState={this.addItemToState}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <Row>
          <Col>
            <NotificationTable
              items={this.state.items}
              updateState={this.updateState}
              deleteItemFromState={this.deleteItemFromState}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Notification;

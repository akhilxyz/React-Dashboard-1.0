import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import ModalForm from "../../components/model/companyModel";
import { CSVLink } from "react-csv";
import CompanyTable from "../../components/table/companyTable";
import { GetCompany } from "../../api/company";
import Permissions  from '../../components/utils/permissions'

class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }


  // ****************** Add Function *****************************

  addItemToState = (item) => {
    this.setState((prevState) => ({
      items: [...prevState.items, item],
    }));
  };

  // ****************** Update Function *****************************

  updateState = (item) => {
    const itemIndex = this.state.items.findIndex((data) => data.id === item.id);
    const newArray = [
      ...this.state.items.slice(0, itemIndex),
      item,
      ...this.state.items.slice(itemIndex + 1),
    ];
    this.setState({ items: newArray });
  };

  // ****************** Delete Function *****************************

  deleteItemFromState = (id) => {
    const updatedItems = this.state.items.filter((item) => item.id !== id);
    this.setState({ items: updatedItems });
  };

  async componentDidMount() {
    let rs = await GetCompany();
    if (rs) {
      this.setState({ items: rs });
    }
  }

  render() {
    return (
      <Container className="App">
        <div>
          {Permissions.includes("company.add") ?
            <Row>
              <Col>
                <div class="d-flex bg-light border">
                  <div class="p-2 flex-grow-1">
                    <h5>Company Details</h5>
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
            : <> </>}
        </div>
        <Row>
          <Col>
            <CompanyTable
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

export default Company;

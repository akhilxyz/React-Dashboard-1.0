import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import ModalForm from '../../components/model/serviceModel'
import { CSVLink } from "react-csv"
import CompanyTable from '../../components/table/serviceTable'
import {GetService} from '../../api/service'


class Service extends Component {
  state = {
    items: [],
  }

  addItemToState = (item) => {
    this.setState(prevState => ({
      items: [...prevState.items, item]
    }))
  }

  updateState = (item) => {
    console.log('itemmm',item)
    const itemIndex = this.state.items.findIndex(data => data.id === item.id)
    const newArray = [
      ...this.state.items.slice(0, itemIndex),
      item,
      ...this.state.items.slice(itemIndex + 1)
    ]
    this.setState({ items: newArray })
  }

  deleteItemFromState = (id) => {
    const updatedItems = this.state.items.filter(item => item.id !== id)
    this.setState({ items: updatedItems })
  }

  async componentDidMount(){
    let rs = await GetService();
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
                            <h5>Services Details</h5>
                        </div>
                        <div class="p-2">
                            <CSVLink
                            filename={"db.csv"}
                            color="primary"
                            className="btn btn-primary"
                            data={this.state.items}>
                            Download CSV
                            </CSVLink>
                        </div>
                            <div class="p-2"> 
                            <ModalForm buttonLabel="Add Item" addItemToState={this.addItemToState} />
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
            <Row>
                <Col>
                    <CompanyTable items={this.state.items} updateState={this.updateState} deleteItemFromState={this.deleteItemFromState} />
                </Col>
            </Row>
        </Container>
    )
  }
}

export default Service ;
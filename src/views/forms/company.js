import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { NotificationManager } from 'react-notifications';
// import axios from 'axios'
import Select from 'react-select';

class AddEditForm extends React.Component {
  state = { 
    id: '',
    name: '',
    vat: '',
    phone: '',
    website: '',
    address: '',
    service: '',
    selectedOption: null,
    serviceData: []
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  submitFormAdd = e => {
  }

  submitFormEdit = e => {
  
  }

  validation = (e) => {
    e.preventDefault();
    if (!this.state.name) {
      NotificationManager.error('Please Enter Company Name', 'Info', 2000)
      return false;
    }
    if (!this.state.vat) {
      NotificationManager.error('Please Enter VAT number', 'Info', 2000)
      return false;
    }
    if (!this.state.phone.length) {
      NotificationManager.error('Please Phone Number', 'Error', 2000)
      return false
    }
    if (this.state.phone.length < 10 && this.state.phone.length > 12) {
      NotificationManager.error('Please Phone Number', 'Error', 2000)
      return false
    }
    if (!this.state.address) {
      NotificationManager.error('Please Enter Your Address', 'Error', 2000)
      return false;
    }
    if (!this.state.service) {
          NotificationManager.error('Please Enter Service Name', 'Error', 2000)
        return false;
    }
    else {

      if (this.props.item) {
        this.submitFormEdit()
      }
      this.submitFormAdd()
    }
  }
  
  getServices() {

  }

  handleChange = selectedOption => {
    this.setState({ service : selectedOption });
    console.log("SELECTED OPTION :", selectedOption)
    }

  componentDidMount() {
    this.getServices()
    if (this.props.item) {
      const { id, name, vat, phone, website, address, service } = this.props.item
      this.setState({ id, name, vat, phone, website, address, service })
    }
  }

  render() {
    return (
      <Form onSubmit={this.validation}>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input type="text" name="name" id="name" onChange={this.onChange} value={this.state.name === null ? '' : this.state.name} />
        </FormGroup>
        <FormGroup>
          <Label for="service">Service</Label>
          <Select isMulti value={this.state.service}  onChange={this.handleChange} options = {this.state.serviceData.map((item, index) => {
            return { value: item.name, label: item.name, id : item.id};})}/>
        </FormGroup>
        <FormGroup>
          <Label for="vat">Vat No</Label>
          <Input type="text" name="vat" id="vat" onChange={this.onChange} value={this.state.vat === null ? '' : this.state.vat} />
        </FormGroup>
        <FormGroup>
          <Label for="phone">phone</Label>
          <Input type="phone" name="phone" id="phone" onChange={this.onChange} value={this.state.phone === null ? '' : this.state.phone} />
        </FormGroup>
        <FormGroup>
          <Label for="website">Website</Label>
          <Input type="text" name="website" id="website" onChange={this.onChange} value={this.state.website === null ? '' : this.state.website} />
        </FormGroup>
        <FormGroup>
          <Label for="address">Address</Label>
          <Input type="text" name="address" id="address" onChange={this.onChange} value={this.state.address === null ? '' : this.state.address} />
        </FormGroup>
        <Button>Submit</Button>
      </Form>

    );
  }
}

export default AddEditForm
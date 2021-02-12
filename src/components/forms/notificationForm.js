import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { NotificationManager } from 'react-notifications';
import axios from 'axios'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
var DatePicker = require("reactstrap-date-picker");

const animatedComponents = makeAnimated();

class AddEditForm extends React.Component {
  state = { 
    id: '',
    services: '',
    company: '',
    expiry: null,
    renew: null,
    email: '',
    message: '',
    selectedOption: null,
    serviceData: [],
    companyData: []
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  submitFormAdd = e => {
    e.preventDefault();
    fetch('http://localhost:3003/api/notification', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        company: this.state.company,
        services: this.state.services,
        email: this.state.email,
        expiry: this.state.expiry,
        renew: this.state.renew,
        message: this.state.message
      })
    }).then(response => response.json())
    .then(item => {
      console.log('item',item)
      if (item) {
        this.props.updateState(item.data[0])
        this.props.toggle()
      } else {
        // console.log('failure')
      }
    })
    .catch(err => console.log(err))
  }

  submitFormEdit = e => {
    e.preventDefault();
    fetch('http://localhost:3003/api/notification/update', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: this.state.id,
        company: this.state.company,
        services: this.state.services,
        email: this.state.email,
        expiry: this.state.expiry,
        renew: this.state.renew,
        message: this.state.message
      })
    })
      .then(response => response.json())
      .then(item => {
        console.log('NOT',item)
        if (item) {
          this.props.updateState(item.data[0])
          this.props.toggle()
        } else {
          // console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  validation = (e) => {
    e.preventDefault();
    if (!this.state.company) {
      NotificationManager.error('Please Enter Company Name', 'Info', 2000)
      return false;
    }
    if (!this.state.services) {
      NotificationManager.error('Please Enter Service', 'Info', 2000)
      return false;
    }
    if (!this.state.expiry) {
      NotificationManager.error('Please Enter Expiry Date', 'Error', 2000)
      return false
    }
    if (!this.state.renew) {
      NotificationManager.error('Please Enter Renew Date', 'Error', 2000)
      return false;
    }
    if (!this.state.email) {
          NotificationManager.error('Please Enter Email', 'Error', 2000)
        return false;
    }
    if (!this.state.message) {
      NotificationManager.error('Please Enter Message', 'Error', 2000)
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
    axios.post('http://localhost:3003/api/service')
      .then((resp) => {
        if (resp.success === false) { NotificationManager.error("Something Went Wrong", 'Error', 2000) }
        else { this.setState({ serviceData: resp.data.data })}},(err) => { NotificationManager.error("Something Went Wrong", 'Error', 2000) })
  }

  getCompany(){
    axios.post('http://localhost:3003/api/company')
      .then((resp) => {
        if (resp.success === false) { NotificationManager.error("Something Went Wrong", 'Error', 2000) }
        else { this.setState({ companyData: resp.data.data })}},(err) => { NotificationManager.error("Something Went Wrong", 'Error', 2000) })

  }

  componentDidMount() {
    this.getServices()
    this.getCompany()
    if (this.props.item) {
      const { id, company, services, email, expiry, renew, message } = this.props.item
      this.setState({ id, company, services, email, expiry, renew, message })
    }
    
  }

  render() {
    console.log('COMP', this.state.company)
    return (
      <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
        <FormGroup>
          <Label for="company">Company</Label>
          <Select value={this.state.company} components={animatedComponents} onChange={(selectedOption) => this.setState({company : selectedOption})} options = {this.state.companyData.map((item) => {
            return { value: item.name, label: item.name, id : item.id};})}/>
        </FormGroup>
        <FormGroup>
          <Label for="services">Service</Label>
          <Select isMulti value={this.state.services} components={animatedComponents}  onChange={(selectedOption) => this.setState({services : selectedOption})} options = {this.state.serviceData.map((item) => {
            return { value: item.name, label: item.name, id : item.id};})}/>
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="text" name="email" id="email" onChange={this.onChange} value={this.state.email === null ? '' : this.state.email} placeholder='demo@email.com' />
        </FormGroup>
        <FormGroup>
        <Label for="expiry">expiry</Label>
        <DatePicker id="expiry-datepicker" value={this.state.expiry} onChange= {(v,f) =>  this.setState({expiry: v, formattedValue: f})} />
      </FormGroup>
        <FormGroup>
          <Label for="renew">renew</Label>
          <DatePicker id="renew-datepicker" value={this.state.renew} onChange= {(v,f) =>  this.setState({renew: v, formattedValue: f})} />
        </FormGroup>
        <FormGroup>
          <Label for="message">message</Label>
          <Input type="textarea" name="message" id="message" onChange={this.onChange} value={this.state.message === null ? '' : this.state.message} />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default AddEditForm
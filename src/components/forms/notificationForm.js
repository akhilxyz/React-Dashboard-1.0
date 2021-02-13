import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { NotificationManager } from 'react-notifications';
import axios from 'axios'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { GetCompany } from 'src/api/company';
import { AddNotification, UpdateNotification } from 'src/api/notification';
import { GetService } from 'src/api/service';
import { NotificationEmail, NotificationExpiry, NotificationMessage, 
        NotificationCompany, NotificationService,  NotificationRenew } from '../utils/validation';
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

  submitFormAdd = async(e) => {
    e.preventDefault();
    console.log("ADDEd")
    await this.validation()
    if (this.state.valid == true) {
      let rs = await AddNotification({
        company: this.state.company,
        services: this.state.services,
        email: this.state.email,
        expiry: this.state.expiry,
        renew: this.state.renew,
        message: this.state.message
      });
      console.log("RS", rs)
      this.props.addItemToState(rs)
      this.props.toggle()
      NotificationManager.info("Notification Send Successfully", 'Info', 2000);
    }
  }

  submitFormEdit = async(e) => {
    e.preventDefault();
    await this.validation()
    if (this.state.valid == true) {
      let rs = await UpdateNotification({
        id: this.state.id,
        company: this.state.company,
        services: this.state.services,
        email: this.state.email,
        expiry: this.state.expiry,
        renew: this.state.renew,
        message: this.state.message
      });
      this.props.updateState(rs)
      this.props.toggle()
      NotificationManager.info("notification Updated & send Successfully", 'Info', 2000);
    }
  }

  validation = (e) => {
    if (NotificationCompany(this.state.company)
    && NotificationService(this.state.services)
    && NotificationEmail(this.state.email)
    && NotificationRenew(this.state.renew)
    && NotificationExpiry(this.state.expiry)
    && NotificationMessage(this.state.message))
    this.setState({ valid: true })
  }
  


  async componentDidMount() {
    
    let rsComp = await GetCompany();
    this.setState({ companyData: rsComp });

    let rsSer = await GetService();
    this.setState({ serviceData: rsSer });

    if (this.props.item) {
      const { id, company, services, email, expiry, renew, message } = this.props.item
      this.setState({id, company, services, email, expiry, renew, message })
    }
  }

  render() {
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
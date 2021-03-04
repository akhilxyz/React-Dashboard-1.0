import React from "react";
import { Button, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import { GetService } from "src/api/service";
import { CSelect } from "@coreui/react";
import {
  CompanyCity,
  CompanyName,
  CompanyAddress,
  CompanyCountry,
  CompanyPhone,
  CompanyState,
} from "../utils/validation";
import { AddCompany, UpdateCompany } from "src/api/company";
import { NotificationManager } from "react-notifications";
import { GetCountry } from "src/api/country";
const phone = require('phone');

class AddEditForm extends React.Component {
  state = {
    id: '',
    name: '',
    vat: '',
    phone_number: '',
    country: null,
    address: '',
    city: '',
    state: '',
    zip: '',
    service: '',
    active: '',
    serviceDuration: "",
    selectedOption: null,
    serviceData: [],
    countryData: [],
    valid: false
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  // ****************** Add Function *****************************

  submitFormAdd = async (e) => {
    e.preventDefault();
    await this.validation()
    if (this.state.valid == true) {
      let rs = await AddCompany({
        "name": this.state.name,
        "address": this.state.address,
        "city": this.state.city,
        "state": this.state.state,
        "country": this.state.country,
        "phone_number": this.state.phone_number,
        "active": parseInt(this.state.active),
        "vat": this.state.vat,
        "zip": this.state.zip,
      });
      this.props.addItemToState(rs)
      this.props.toggle()
      NotificationManager.info("Company Added Successfully", 'Info', 2000);
    }
  }

  // ****************** Edit Function *****************************

  submitFormEdit = async (e) => {
    e.preventDefault();
    await this.validation()
    if (this.state.valid == true) {
      let rs = await UpdateCompany({
        "id": this.state.id,
        "name": this.state.name,
        "address": this.state.address,
        "city": this.state.city,
        "state": this.state.state,
        "country": this.state.country,
        "phone_number": this.state.phone_number,
        "active": parseInt(this.state.active),
        "vat": this.state.vat,
        "zip": this.state.zip,
      });
      if (rs === undefined) {
        NotificationManager.error("Something Went Wrong", "Info", 2000);
      }
      else {
        this.props.updateState(rs)
        this.props.toggle()
        NotificationManager.info("Company Updated Successfully", 'Info', 2000);
      }
    }
  }

  // ****************** Validation Function *****************************

  validation = (e) => {
    if (CompanyName(this.state.name)
      && CompanyCountry(this.state.country)
      && CompanyPhone(this.state.phone_number)
      && CompanyCity(this.state.city)
      && CompanyState(this.state.state)
      && CompanyAddress(this.state.address)
    ) {
      let ISO = ""
      this.state.countryData.map((it) => { if (it.id === this.state.country) { ISO = it.iso3 }; })
      const Phone = phone(this.state.phone_number, ISO,);
      console.log("PH", Phone)
      if (Phone.length > 0) {
        this.setState({ valid: true })
      } else {
        NotificationManager.error("Invalid Phone Number", "Info", 2000);
      }
    }
  }

  async componentDidMount() {
    let rs = await GetService();
    let countryData = await GetCountry();
    if (rs && countryData) {
      this.setState({ serviceData: rs });
      this.setState({ countryData: countryData });
    }
    if (this.props.item) {
      const { id, name, vat, phone_number, city, state, zip, address, service, active } = this.props.item
      this.setState({ id, name, vat, phone_number, city, state, zip, address, service, active })
      let countryList = [this.props.item.country]
      countryList.map((it) => {
        this.setState({ country: it.id })
      })
    }
  }

  render() {
    return (
      <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input type="text" name="name" id="name" onChange={this.onChange} value={this.state.name === null ? '' : this.state.name} />
        </FormGroup>
        <Row form>
          <Col md={3}>
            <FormGroup>
              <Label for="country">Country</Label>
              <Input type="select" name="country" id="country" onChange={this.onChange} value={this.state.country === null ? '' : this.state.country}>
                <option value="">Select</option>
                {this.state.countryData.map((it) => {
                  return (
                    <option value={it.id}>
                      {it.iso3}
                    </option>
                  );
                })}
              </Input>
            </FormGroup>
          </Col>
          <Col >
            <FormGroup>
              <Label for="phone_number">Phone Number</Label>
              <Input type="phone_number" name="phone_number" id="phone_number" onChange={this.onChange} value={this.state.phone_number === null ? '' : this.state.phone_number} placeholder="Enter Number" />
            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <Label for="vat">Vat No</Label>
          <Input type="text" name="vat" id="vat" onChange={this.onChange} value={this.state.vat === null ? '' : this.state.vat} />
        </FormGroup>
        <FormGroup>
          <Label for="city">City</Label>
          <Input type="text" name="city" id="city" onChange={this.onChange} value={this.state.city === null ? '' : this.state.city} />
        </FormGroup>
        <FormGroup>
          <Label for="state">State</Label>
          <Input type="text" name="state" id="state" onChange={this.onChange} value={this.state.state === null ? '' : this.state.state} />
        </FormGroup>
        <FormGroup>
          <Label for="address">Address</Label>
          <Input type="textarea" name="address" id="address" onChange={this.onChange} value={this.state.address === null ? '' : this.state.address} />
        </FormGroup>
        <FormGroup>
          <Label for="zip">Zip</Label>
          <Input type="text" name="zip" id="zip" onChange={this.onChange} value={this.state.zip === null ? '' : this.state.zip} />
        </FormGroup>
        <FormGroup>
          <Label for="active">Status</Label>
          <CSelect custom size="lg" name="active" id="active" value={this.state.active} onChange={(e) => this.setState({ active: e.target.value })}>
            <option value="">Select active</option>
            <option value={1}>Active</option>
            <option value={0}>Inactive</option>
          </CSelect>
        </FormGroup>
        <Button>Submit</Button>
      </Form>

    );
  }
}

export default AddEditForm
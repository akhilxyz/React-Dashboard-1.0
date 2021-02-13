import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import Select from "react-select";
import { GetService } from "src/api/service";
import { CSelect } from "@coreui/react";
import {
  CompanyAddress,
  CompanyName,
  CompanyPhone,
  CompanyService,
  CompanyStatus,
  CompanyVat,
  CompanyWebsite,
} from "../utils/validation";
import { AddCompany, UpdateCompany } from "src/api/company";
import { NotificationManager } from "react-notifications";

class AddEditForm extends React.Component {
  state = {
    id: '',
    name: '',
    vat: '',
    phone: '',
    website: '',
    address: '',
    service: '',
    status: '',
    selectedOption: null,
    serviceData: [],
    valid: false
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  submitFormAdd = async (e) => {
    e.preventDefault();
    await this.validation()
    if (this.state.valid == true) {
      let rs = await AddCompany({
        "name": this.state.name,
        "vat": this.state.vat,
        "phone": this.state.phone,
        "website": this.state.website,
        "address": this.state.address,
        "service": this.state.service,
        "status": this.state.status
      });
      this.props.addItemToState(rs)
      this.props.toggle()
      NotificationManager.info("Company Added Successfully", 'Info', 2000);
    }
  }

  submitFormEdit = async (e) => {
    e.preventDefault();
    await this.validation()
    if (this.state.valid == true) {
      let rs = await UpdateCompany({
        "id": this.state.id,
        "name": this.state.name,
        "vat": this.state.vat,
        "phone": this.state.phone,
        "website": this.state.website,
        "address": this.state.address,
        "service": this.state.service,
        "status": this.state.status
      });
      this.props.updateState(rs)
      this.props.toggle()
      NotificationManager.info("Company Updated Successfully", 'Info', 2000);
    }
  }

  validation = (e) => {

    if (CompanyName(this.state.name)
      && CompanyService(this.state.service)
      && CompanyStatus(this.state.status)
      && CompanyVat(this.state.vat)
      && CompanyPhone(this.state.phone)
      && CompanyWebsite(this.state.website)
      && CompanyAddress(this.state.address)
    )
      this.setState({ valid: true })
  }

  handleChange = selectedOption => {
    this.setState({ service: selectedOption });
    console.log("SELECTED OPTION :", selectedOption)
  }

  async componentDidMount() {
    let rs = await GetService();
    this.setState({ serviceData: rs });
    if (this.props.item) {
      const { id, name, vat, phone, website, address, service, status } = this.props.item
      this.setState({ id, name, vat, phone, website, address, service, status })
    }
  }

  render() {
    return (
      <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input type="text" name="name" id="name" onChange={this.onChange} value={this.state.name === null ? '' : this.state.name} />
        </FormGroup>
        <FormGroup>
          <Label for="service">Service</Label>
          <Select isMulti value={this.state.service} onChange={this.handleChange} options={this.state.serviceData.map((item, index) => {
            return { value: item.name, label: item.name, id: item.id };
          })} />
        </FormGroup>
        <FormGroup>
          <Label for="duration">Service Status</Label>
          <CSelect custom size="lg" name="selectLg" id="selectLg" value={this.state.status} onChange={(e) => this.setState({ status: e.target.value })}>
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Pending">Pending</option>
            <option value="Banned">Banned</option>
          </CSelect>
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
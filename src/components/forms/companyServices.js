import React from "react";
import { Button, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import { NotificationManager } from "react-notifications";
import { GetCompany } from "src/api/company";
import { GetService } from "src/api/service";
import {
  ServiceName,
  email,
  name,
  phone,
  address,
  CompanyName,
  serviceList,
} from "../utils/validation";
import ServicesDetails from "../table/servicesDetails";
import AddServiceForm from "../forms/servicesDetails/add";
import EditServiceForm from "../forms/servicesDetails/edit";
import {
  AddCompanyServices,
  GetCompanyServices,
  UpdateCompanyServices,
} from "src/api/companyServices";

class AddEditForm extends React.Component {
  initialUser = { id: null, name: "" };

  state = {
    id: "",
    users: [],
    currentUser: this.initialUser,
    editing: false,
    services: "",
    name: "",
    serviceStarted: null,
    expiry: new Date().toISOString(),
    renew: null,
    email: "",
    message: "",
    selectedOption: null,
    serviceData: [],
    companyData: [],
    user: "",
    phone: "",
    userEmail: "",
    address: "",
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // ****************** Add Function *****************************

  submitFormAdd = async (e) => {
    e.preventDefault();
    await this.validation();
    if (this.state.valid == true) {
      let rs = await AddCompanyServices({
        name: this.state.name,
        email: this.state.email,
        service: this.state.users,
        user: this.state.user,
        userEmail: this.state.userEmail,
        phone: this.state.phone,
        address: this.state.address,

        // serviceStarted: this.state.serviceStarted,
        // email: this.state.email,
        // expiry: this.state.expiry,
        // renew: this.state.renew,
        // message: this.state.message,
      });
      this.props.addItemToState(rs);
      this.props.toggle();
      NotificationManager.info("Notification Added Successfully", "Info", 2000);
    }
  };

  // ****************** Edit Function *****************************

  submitFormEdit = async (e) => {
    e.preventDefault();
    await this.validation();
    if (this.state.valid == true) {
      let rs = await UpdateCompanyServices({
        id: this.state.id,
        name: this.state.name,
        email: this.state.email,
        service: this.state.users,
        user: this.state.user,
        userEmail: this.state.userEmail,
        phone: this.state.phone,
        address: this.state.address,
      });
        this.props.updateState(rs);
      this.props.toggle();
      NotificationManager.info(
        "notification Updated Successfully",
        "Info",
        2000
      );
    }
  };

  // ****************** Validations Function *****************************

  validation = (e) => {
    if (
      CompanyName(this.state.name) &&
      email(this.state.email)&&
      serviceList(this.state.users)&&
      name(this.state.user) &&
      phone(this.state.phone) &&
      email(this.state.userEmail) &&
      address(this.state.address))
      this.setState({ valid: true });
  };

  // ************************* Add Service********************************
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

  // ************************* Delete Service********************************

  deleteService = (id) => {
    this.setState({
      users: this.state.users.filter((user) => user.id !== id),
    });
  };

  // ************************* Edit Service********************************

  editService = (id, user) => {
    this.setState({
      editing: true,
      currentUser: user,
    });
  };

  // ************************* Update Service********************************

  updateService = (newUser) => {
    this.setState({
      users: this.state.users.map((user) =>
        user.id === this.state.currentUser.id ? newUser : user
      ),
      currentUser: this.initialUser,
      editing: false,
    });
  };

  async componentDidMount() {
    if (this.props.item) {
      const {
        id,
        name,
        email,
        service,
        user,
        phone,
        userEmail,
        address,
      } = this.props.item;
      this.setState({
        id,
        name,
        email,
        service,
        user,
        phone,
        userEmail,
        address,
      });
    }

    let rsComp = await GetCompany();
    let rsSer = await GetService();
    let rsCompSer = await GetCompanyServices();

    if (rsComp && rsSer && rsCompSer) {
      this.setState({ companyData: rsComp });
      this.setState({ serviceData: rsSer });

      let usersList = [];
      rsCompSer.map((it) => {
        if (this.state.name == it.name) {
          it.service.map((item) => {
            usersList.push(item);
          });
        }
      });
      this.setState({ users: usersList });
    }
  }

  render() {
    return (
      <Form
        onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}
      >
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="name">Company</Label>
              <Input
                className="u-full-width"
                type="select"
                value={this.state.name}
                name="name"
                onChange={(e) => this.setState({ name: e.target.value })}
              >
                <option value="">Select Service</option>
                {this.state.companyData.map((it) => {
                  return (
                    <option value={it.id} key={it.id}>
                      {it.name}
                    </option>
                  );
                })}
              </Input>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="text"
                name="email"
                id="email"
                onChange={this.onChange}
                value={this.state.email === null ? "" : this.state.email}
                placeholder="demo@email.com"
              />
            </FormGroup>
          </Col>
        </Row>
        <div>
          <Row>
            <Col>
              {this.state.editing ? (
                <div>
                  <h4>Edit Service</h4>
                  <EditServiceForm
                    companyId={this.state.name}
                    currentUser={this.state.currentUser}
                    setEditing={this.state.setEditing}
                    updateService={this.updateService}
                  />
                </div>
              ) : (
                <div>
                  <h4>Add Service</h4>
                  <AddServiceForm
                    companyId={this.state.name}
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
            <ServicesDetails
              users={this.state.users}
              deleteService={this.deleteService}
              editService={this.editService}
            />
          </Col>
        </Row>

        <h4>User Details</h4>

        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="user">Full Name</Label>
              <Input
                type="text"
                name="user"
                id="user"
                onChange={this.onChange}
                value={this.state.user === null ? "" : this.state.user}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="phone">Phone No</Label>
              <Input
                type="text"
                name="phone"
                id="phone"
                onChange={this.onChange}
                value={this.state.phone === null ? "" : this.state.phone}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="userEmail">Email</Label>
              <Input
                type="text"
                name="userEmail"
                id="userEmail"
                onChange={this.onChange}
                value={
                  this.state.userEmail === null ? "" : this.state.userEmail
                }
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="address">Address</Label>
              <Input
                type="text"
                name="address"
                id="address"
                onChange={this.onChange}
                value={this.state.address === null ? "" : this.state.address}
              />
            </FormGroup>
          </Col>
        </Row>

        <Button>Submit</Button>
      </Form>
    );
  }
}

export default AddEditForm;

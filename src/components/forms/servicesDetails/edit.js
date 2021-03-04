import React, { useState, useEffect } from "react";
import { Col, Row, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { GetService } from "src/api/service";

const EditServiceForm = (props) => {
  const [serviceList, setServiceList] = useState([]);

  useEffect(async () => {
    let rs = await GetService();
    setServiceList(rs);
    setUser(props.currentUser);
  }, [props]);

  const [user, setUser] = useState(props.currentUser);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      user.name &&
      user.status &&
      user.startDate &&
      user.expiryDate &&
      user.serviceLink
    )
      props.updateService(user);
  };

  return (
    <Form>
      <Row form>
        <Col md={4}>
          <FormGroup>
            <Label>Name</Label>
            <Input
              className="u-full-width"
              type="select"
              value={user.name}
              name="name"
              onChange={handleChange}
            >
              {serviceList.map((it) => {
                return (
                  <option value={it.id} key={it.id}>
                    {it.name}
                  </option>
                );
              })}
            </Input>
          </FormGroup>
        </Col>

        <Col md={4}>
          <FormGroup>
            <Label>Started On</Label>
            <Input
              className="u-full-width"
              type="date"
              placeholder="date placeholder"
              value={user.startDate}
              name="startDate"
              x
              onChange={handleChange}
            />
          </FormGroup>
        </Col>

        <Col md={4}>
          <FormGroup>
            <Label>Expiry Date</Label>
            <Input
              className="u-full-width"
              type="date"
              placeholder="date placeholder"
              value={user.expiryDate}
              name="expiryDate"
              onChange={handleChange}
            />
          </FormGroup>
        </Col>
      </Row>

      <Row form>
        <Col md={4}>
          <FormGroup>
            <Label>Links</Label>
            <Input
              className="u-full-width"
              type="textarea"
              value={user.serviceLink}
              name="serviceLink"
              onChange={handleChange}
            />
          </FormGroup>
        </Col>

        <Col md={4}>
          <FormGroup>
            <Label>Status</Label>
            <Input
              className="u-full-width"
              type="select"
              value={user.status}
              name="status"
              onChange={handleChange}
            >
              <option value="">Select Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
              <option value="Banned">Banned</option>
            </Input>
          </FormGroup>
        </Col>
        <Col md={4}>
          <Button
            className="button-primary"
            style={{ margin: "23px", minWidth: "120px" }}
            type="submit"
            onClick={handleSubmit}
          >
            Update
          </Button>

          <Button
            className="button-primary"
            style={{ margin: "23px", minWidth: "120px" }}
            type="submit"
            onClick={() => props.setEditing(false)}
          >
            Cancel
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default EditServiceForm;

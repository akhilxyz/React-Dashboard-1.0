import { CBadge } from "@coreui/react";
import React, { useEffect } from "react";
import { Table, Button } from "reactstrap";
import { GetService } from "src/api/service";

const getBadge = (status) => {
  switch (status) {
    case "Active":
      return "success";
    case "Inactive":
      return "secondary";
    case "Pending":
      return "warning";
    case "Banned":
      return "danger";
    default:
      return "primary";
  }
};

const UserTable = (props) => {
  const [services, setServices] = React.useState(0);

  useEffect(async () => {
    let servicesList = await GetService();
    setServices(servicesList);
  }, []);
  
  sessionStorage.setItem("ServiceList", JSON.stringify(props.users))

  return (
    <div>
      <h4>Your Services</h4>
      <Table striped hover responsive>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Start On</th>
            <th>Expiry On</th>
            <th>Link</th>
            <th>status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.users.length > 0 ? (
            props.users.map((user) => {
              const {
                id,
                name,
                status,
                startDate,
                expiryDate,
                servicelink,
              } = user;
              return (
                <tr key={id}>
                  <td></td>
                  {services ? (
                    services.map((it) => {
                      if (it.id == name) {
                        return <td>{it.name}</td>;
                      }
                    })
                  ) : (
                    <> </>
                  )}
                  <td>{startDate}</td>
                  <td>{expiryDate}</td>
                  <td>{servicelink}</td>
                  <td>
                    <CBadge color={getBadge(status)}>{status}</CBadge>
                  </td>
                  <td>
                    <Button onClick={() => props.deleteService(id)}>Delete</Button>
                    <span style={{ margin: "10px" }}></span>
                    <Button onClick={() => props.editService(id, user)}>
                      Edit
                    </Button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={4}>
                <h5>You have no service 🚫</h5>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default UserTable;

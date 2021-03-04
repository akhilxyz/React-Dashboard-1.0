import React, { useEffect } from "react";
import {
  CCardBody,
  CCollapse,
  CButton,
  CDataTable,
  CBadge,
} from "@coreui/react";
import ModalForm from "../model/companyServicesModel";
import { GetCompany } from "src/api/company";
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
const CompanyServiceTable = (props) => {
  const [details, setDetails] = React.useState([]);
  const [companyData, setCompany] = React.useState([]);
  const [serviceData, setService] = React.useState([]);

  useEffect(async () => {
    let companyList = await GetCompany();
    let serviceList = await GetService();
    if (companyList && serviceList) {
      setCompany(companyList);
      setService(serviceList);
    }
  }, []);

  const Data = props.items;
  const toggleDetails = (index) => {
    const position = details.indexOf(index);
    let newDetails = details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...details, index];
    }
    setDetails(newDetails);
  };

  const fields = [
    { key: "name" },
    { key: "service" },
    { key: "status" },
    { key: "user" },
    { key: "phone" },
    {
      key: "show_details",
      label: "",
      _style: { width: "10%" },
      sorter: false,
      filter: false,
    },
  ];

  const deleteItem = (id) => {
    let confirmDelete = window.confirm("Delete item forever?");
    if (confirmDelete) {
      fetch(`http://localhost:3003/api/companyServices/${id}`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      })
        .then((response) => response.json())
        .then((item) => {
          props.deleteItemFromState(id);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <CDataTable
      items={Data}
      fields={fields}
      columnFilter
      tableFilter
      itemsPerPageSelect
      itemsPerPage={5}
      hover
      sorter
      pagination
      scopedSlots={{
        name: (item) => (
          <td>
            {companyData.map((it) => {
              if (item.name == it.id) return it.name;
            })}
          </td>
        ),
        service: (item) => (
          <td>
            {item.service.map((it) =>
              serviceData.map((serviceName) => {
                if (it.name == serviceName.id) return <li style={{ listStyle: "none", marginTop: "10px" }}>
                {serviceName.name + " "}{" "}
              </li>;
              })
            )}
          </td>
        ),
      
        status: (item) => (
          <td>
             {item.service.map((it) =>
                    serviceData.map((serviceName) => {
                      if (it.name == serviceName.id)
                        return (
                          <li style={{ listStyle: "none", marginTop: "10px" }}>
                            <CBadge color={getBadge(it.status)}>
                              {it.status}
                            </CBadge>
                          </li>
                        );
                    })
                  )}
          </td>
        ),
        show_details: (item, index) => {
          return (
            <td className="py-2">
              <CButton
                color="primary"
                variant="outline"
                shape="square"
                size="sm"
                onClick={() => {
                  toggleDetails(index);
                }}
              >
                {details.includes(index) ? "Hide Details" : "More Details"}
              </CButton>
            </td>
          );
        },
        details: (item, index) => {
          return (
            <CCollapse show={details.includes(index)}>
              <CCardBody>
                <p style={{ display: "inline-block" }}>
                  <b>Service Name:</b>
                  {item.service.map((it) =>
                    serviceData.map((serviceName) => {
                      if (it.name == serviceName.id)
                        return (
                          <li style={{ listStyle: "none", marginTop: "10px" }}>
                            {serviceName.name + " "}{" "}
                          </li>
                        );
                    })
                  )}
                </p>
                <p style={{ display: "inline-block", marginLeft: "120px" }}>
                  <b>Start Date:</b>
                  {item.service.map((it) =>
                    serviceData.map((serviceName) => {
                      if (it.name == serviceName.id)
                        return (
                          <li style={{ listStyle: "none", marginTop: "10px" }}>
                            {it.startDate + " "}{" "}
                          </li>
                        );
                    })
                  )}
                </p>
                <p style={{ display: "inline-block", marginLeft: "120px" }}>
                  <b>Expiry Date:</b>
                  {item.service.map((it) =>
                    serviceData.map((serviceName) => {
                      if (it.name == serviceName.id)
                        return (
                          <li style={{ listStyle: "none", marginTop: "10px" }}>
                            {it.expiryDate + " "}{" "}
                          </li>
                        );
                    })
                  )}
                </p>

                <div
                  style={{
                    width: "110px",
                    margin: "10px",
                    display: "inline-block",
                    float: "right",
                    textAlign: "right",
                  }}
                >
                  <p className="text-muted">
                    Company Service since:
                    <br /> {item.created_on}
                  </p>
                  <ModalForm
                    buttonLabel="Edit"
                    item={item}
                    updateState={props.updateState}
                  />{" "}
                  <CButton
                    size="sm"
                    color="danger"
                    className="ml-1"
                    onClick={() => deleteItem(item.id)}
                  >
                    Delete
                  </CButton>
                </div>
              </CCardBody>
            </CCollapse>
          );
        },
      }}
    />
  );
};

export default CompanyServiceTable;

import React, { useEffect } from "react";
import {
  CBadge,
  CCardBody,
  CCollapse,
  CButton,
  CDataTable,
} from "@coreui/react";
import ModalForm from "../model/serviceModel";
import { GetCompany } from "src/api/company";
import { NotificationManager } from "react-notifications";

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

const ServiceTable = (props) => {
  const [details, setDetails] = React.useState([]);
  const [companyList, setCompanyList] = React.useState([]);
  const Data = props.items;

  useEffect(async () => {
    let rs = await GetCompany();
    setCompanyList(rs);
  }, []);

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
    "created_on",
    { key: "description" },
    { key: "price" },
    { key: "duration" },
    {
      key: "show_details",
      label: "",
      _style: { width: "1%" },
      sorter: false,
      filter: false,
    },
  ];

  const deleteItem = (id) => {
    let serviceID = "";
    let newCompanyList = [];
    for (let i = 0; i < companyList.length; i++) {
      newCompanyList.push(companyList[i].service);
    }
    newCompanyList = newCompanyList.flat(1);
    let serviceDelete = props.items;
    for (let i = 0; i < props.items.length; i++) {
      let check = serviceDelete[i];
      newCompanyList.map((item) => {
        if (check.id === item.id && check.id === id) {
          serviceID = check.id;
        }
      });
    }
    if (serviceID === id) {
      return NotificationManager.error("Service is in Used", "Error", 2000);
    }

    let confirmDelete = window.confirm("Delete item forever?");
    if (confirmDelete) {
      fetch(`http://localhost:3003/api/service//${id}`, {
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
          console.log("item", item);
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
        status: (item) => (
          <td>
            <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
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
                {details.includes(index) ? "Hide" : "Action"}
              </CButton>
            </td>
          );
        },
        details: (item, index) => {
          return (
            <CCollapse show={details.includes(index)}>
              <CCardBody style={{ float: "right", textAlign: "right" }}>
                <h4>{item.company}</h4>
                <p className="text-muted">User since: {item.datecreated}</p>
                <div style={{ width: "110px", marginLeft: "110px" }}>
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

export default ServiceTable;

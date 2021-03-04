import React from "react";
import {
  CBadge,
  CCardBody,
  CCollapse,
  CButton,
  CDataTable,
} from "@coreui/react";
import ModalForm from "../model/companyModel";
import Permissions from "../utils/permissions"
const getBadge = (active) => {
  switch (active) {
    case 1:
      return "success";
    case "Inactive":
      return "secondary";
    case "Pending":
      return "warning";
    case 0:
      return "danger";
    default:
      return "primary";
  }
};

const CompanyTable = (props) => {
  const [details, setDetails] = React.useState([]);
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
    { key: "vat" },
    { key: "address" },
    { key: "phone" },
    { key: "service" },
    { key: "status", filter: false,
  },
    {
      key: "show_details",
      label: "",
      _style: { width: "1%" },
      sorter: false,
      filter: false,
    },
  ];

  const deleteItem = (id) => {
    let confirmDelete = window.confirm("Delete item forever?");
    if (confirmDelete) {
      fetch(`http://localhost:3003/api/company/${id}`, {
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
        // service: (item) => <td>{item.service.map((it) => it.value + ' ')}</td>,
        phone: (item) => <td>{item.phone_number}</td>,
        status: (item) => (
          <td>
            <CBadge color={getBadge(item.active)}>{item.active === 1 ? 
            <span>Active</span>: <span>InActive</span> }</CBadge>
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
                <h4>{item.name}</h4>
                <p className="text-muted">User since: {item.date_created}</p>
                <div style={{ width: "110px", marginLeft: "110px" }}>
                {Permissions.includes("company.edit") ? <ModalForm
                    buttonLabel="Edit"
                    item={item}
                    updateState={props.updateState}
                  /> : <></>}
                  {Permissions.includes("company.delete") ? <CButton
                    size="sm"
                    color="danger"
                    className="ml-1"
                    onClick={() => deleteItem(item.id)}
                  >
                    Delete
                  </CButton> : <> </>}
                  
                </div>
              </CCardBody>
            </CCollapse>
          );
        },
      }}
    />
  );
};

export default CompanyTable;

import React from "react";
import {
  CCardBody,
  CCollapse,
  CButton,
  CDataTable,
} from "@coreui/react";
import ModalForm from "../model/notificationModel";

const NotificationTable = (props) => {
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
    { key: "company" },
    { key: "service" },
    { key: "serviceStarted" },
    { key: "expiry" },
    { key: "renew" },
    { key: "email" },
    { key: "message" },
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
      fetch(`http://localhost:3003/api/notification/${id}`, {
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
        service: (item) => <td>{item.services.map((it) => it.value + " ")}</td>,
        company: (item) => <td>{item.company.map((it) => it.value + " ")}</td>,
        serviceStarted: (item) => <td>{item.serviceStarted.slice(0, 10)}</td>,
        expiry: (item) => <td>{item.expiry.slice(0, 10)}</td>,
        renew: (item) => <td>{item.renew.slice(0, 10)}</td>,
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
                <h4>{item.company.map((it) => it.value + " ")}</h4>
                <p className="text-muted">User since: {item.created_on}</p>
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

export default NotificationTable;

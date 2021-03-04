import React, { useEffect } from "react";
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
} from "@coreui/react";

import { GetCompany } from "src/api/company";
import { GetNotification } from "src/api/notification";
import { GetService } from "src/api/service";
import { serviceList } from "src/components/utils/validation";

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

const fieldsCompany = ["name", "service", "status", "website"];

const fieldsServices = ["name", "description", "price", "duration"];

const Tables = () => {
  const [company, setCompany] = React.useState(0);
  const [notifications, setNotifications] = React.useState(0);
  const [services, setServices] = React.useState(0);

  useEffect(async () => {
    let CompanyList = await GetCompany();
    let NotificationList = await GetNotification();
    let servicesList = await GetService();


    if (CompanyList && NotificationList && serviceList){
      setCompany(CompanyList);
      setNotifications(NotificationList);
      setServices(servicesList);
    }

  }, []);

  return (
    <>
      <CRow>
        <CCol xs="12" lg="6">
          <CCard>
            <CCardHeader>
              <td>
                <span className="h5">Company</span>
              </td>
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={company}
                fields={fieldsCompany}
                itemsPerPage={5}
                pagination
                scopedSlots={{
                  // service: (item) => (
                  //   <td>{item.service.map((it) => it.value + " ")}</td>
                  // ),
                  status: (item) => (
                    <td>
                      <CBadge color={getBadge(item.status)}>
                        {item.status}
                      </CBadge>
                    </td>
                  ),
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>

        <CCol xs="12" lg="6">
          <CCard>
            <CCardHeader>
              <td>
                <span className="h5">Services</span>
              </td>
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={services}
                fields={fieldsServices}
                striped
                itemsPerPage={3}
                pagination
                scopedSlots={{
                  status: (item) => (
                    <td>
                      <CBadge color={getBadge(item.status)}>
                        {item.status}
                      </CBadge>
                    </td>
                  ),
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Tables;

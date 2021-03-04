import React from "react";
import CIcon from "@coreui/icons-react";

const _nav = [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/dashboard",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Service",
    to: "/service",
    icon: "cil-spreadsheet",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Notification",
    to: "/notification",
    icon: "cil-bell",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Company",
    to: "/company",
    icon: "cil-people",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Company Service",
    to: "/company-services",
    icon: "cil-spreadsheet",
  },
  // {
  //   _tag: "CSidebarNavItem",
  //   name: "Payment",
  //   to: "/payment",
  //   icon: "cil-credit-card",
  // },

];

export default _nav;

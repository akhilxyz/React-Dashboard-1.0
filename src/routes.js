import React from "react";

const Payment = React.lazy(() => import("./pages/payment"));
const Company = React.lazy(() => import("./pages/Company"));
const Notification = React.lazy(() => import("./pages/notification"));
const Service = React.lazy(() => import("./pages/service"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Profile = React.lazy(() => import("./pages/profile"));
const CompanyServices = React.lazy(() => import("./pages/companyServices"));

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/payment", name: "Payment", component: Payment },
  { path: "/company", name: "Company", component: Company },
  { path: "/notification", name: "Notification", component: Notification },
  { path: "/service", name: "Service", component: Service },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/profile", name: "Profile", component: Profile },
  { path: "/company-services", name: "CompanyServices", component: CompanyServices },
];

export default routes;

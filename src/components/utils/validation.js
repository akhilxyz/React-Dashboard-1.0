import { NotificationManager } from "react-notifications";
import validator from "validator";

// --------------------SERVICES-----------------------------------

function ServiceName(name) {
  if (name) return "success";
  else
    return NotificationManager.error("Please Enter Service Name", "Info", 2000);
}
function serviceList(user) {

  if (user.length >= 1) return "success";
  else
    return NotificationManager.error("Please Enter your Service", "Info", 2000);
}

function ServiceDescription(description) {
  if (description) return "success";
  else
    return NotificationManager.error("Please Enter Description", "Info", 2000);
}

function ServicePrice(price) {
  const isNum = /^\d+$/.test(price);
  if (isNum) return "success";
  else return NotificationManager.error("Please Enter Price", "Info", 2000);
}

function ServiceDuration(duration) {
  if (duration) return "success";
  else return NotificationManager.error("Please Enter Duration", "Info", 2000);
}

// --------------------COMPANY-----------------------------------

function CompanyName(name) {
  if (name) return "success";
  else return NotificationManager.error("Please Enter Company Name", "Info", 2000);
}

function CompanyCountry(country) {
  if (country) return "success";
  else return NotificationManager.error("Please Select Your country", "Info", 2000);
}

function CompanyCity(city) {
  if (city) return "success";
  else return NotificationManager.error("Please Enter your city", "Info", 2000);
}

function CompanyPhone(phone) {
  if (validator.isMobilePhone(phone)) return "success";
  else
    return NotificationManager.error("Please Enter Phone number", "Info", 2000);
}

function CompanyAddress(address) {
  if (address) return "success";
  else return NotificationManager.error("Please Enter Address", "Info", 2000);
}

function CompanyState(state) {
  if (state) return "success";
  else return NotificationManager.error("Please Enter your State ", "Info", 2000);
}

function CompanyStatus(status) {
  if (status) return "success";
  else
    return NotificationManager.error(
      "Please Enter Service Status",
      "Info",
      2000
    );
}

// -------------------NOTICATION-------------------

function NotificationCompany(company) {
  if (company) return "success";
  else return NotificationManager.error("Please Enter Company", "Info", 2000);
}
function NotificationService(services) {
  if (services) return "success";
  else return NotificationManager.error("Please Enter Service", "Info", 2000);
}

function NotificationEmail(email) {
  if (validator.isEmail(email)) return "success";
  else
    return NotificationManager.error(
      "Please Enter Email Address",
      "Info",
      2000
    );
}
function NotificationRenew(renew) {
  if (renew) return "success";
  else
    return NotificationManager.error("Please Enter Renew Date", "Info", 2000);
}
function NotificationExpiry(expiry) {
  if (expiry) return "success";
  else
    return NotificationManager.error("Please Enter Expiry Date", "Info", 2000);
}
function NotificationMessage(message) {
  if (message.length > 5) return "success";
  else return NotificationManager.error("Please Enter Message", "Info", 2000);
}

function NotificationServiceStart(serviceStarted) {
  if (serviceStarted !== undefined && serviceStarted) return "success";
  else
    return NotificationManager.error(
      "Please Enter Service start Date",
      "Info",
      2000
    );
}

const Validator = (value, size = 0) => {
  if (!value) return false;
  if (value.length < size) return false;
  else return true;
};


// ----------------------For All------------------------
function name(user) {
  if (user) return "success";
  else return NotificationManager.error("Please Enter Name", "Info", 2000);
}

function phone(phone) {
  if (validator.isMobilePhone(phone)) return "success";
  else
    return NotificationManager.error("Please Enter Phone number", "Info", 2000)
}

function email(email) {
  if (validator.isEmail(email)) return "success";
  else
    return NotificationManager.error("Please Enter your Email Address", "Info", 2000)
}

function address(address) {
  if (address) return "success";
  else
    return NotificationManager.error("Please Enter your Address", "Info", 2000)
}

export {
  name,
  phone,
  email,
  address,
  ServiceName,
  serviceList,
  ServiceDescription,
  ServicePrice,
  ServiceDuration,
  CompanyAddress,
  CompanyName,
  CompanyPhone,
  CompanyCity,
  CompanyState,
  CompanyStatus,
  CompanyCountry,
  Validator,
  NotificationEmail,
  NotificationExpiry,
  NotificationRenew,
  NotificationMessage,
  NotificationCompany,
  NotificationService,
  NotificationServiceStart,
};

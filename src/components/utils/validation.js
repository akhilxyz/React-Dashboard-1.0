import { NotificationManager } from "react-notifications";
import validator from "validator";

function ServiceName(name) {
  if (name) return "success";
  else
    return NotificationManager.error("Please Enter Service Name", "Info", 2000);
}

function ServiceDescription(description) {
  if (description) return "success";
  else
    return NotificationManager.error("Please Enter Description", "Info", 2000);
}

function ServicePrice(price) {
  let isnum = /^\d+$/.test(price);
  if (isnum) return "success";
  else return NotificationManager.error("Please Enter Price", "Info", 2000);
}

function ServiceDuration(duration) {
  if (duration) return "success";
  else return NotificationManager.error("Please Enter Duration", "Info", 2000);
}

// --------------------COMPANY-----------------------------------

function CompanyName(name) {
  if (name) return "success";
  else return NotificationManager.error("Please Enter Name", "Info", 2000);
}

function CompanyWebsite(website) {
  if (website) return "success";
  else return NotificationManager.error("Please Enter Website", "Info", 2000);
}

function CompanyService(service) {
  if (service) return "success";
  else return NotificationManager.error("Please Enter Service", "Info", 2000);
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

function CompanyVat(vat) {
  if (vat) return "success";
  else return NotificationManager.error("Please Enter Vat No", "Info", 2000);
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
  else
    return NotificationManager.error(
      "Please Enter Company",
      "Info",
      2000
    );
}
function NotificationService(services) {
  if (services) return "success";
  else
    return NotificationManager.error(
      "Please Enter Service",
      "Info",
      2000
    );
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
    return NotificationManager.error(
      "Please Enter Renew Date",
      "Info",
      2000
    );
}
function NotificationExpiry(expiry) {
  if (expiry) return "success";
  else
    return NotificationManager.error(
      "Please Enter Expiry Date",
      "Info",
      2000
    );
}
function NotificationMessage(message) {
  if (message.length > 5) return "success";
  else
    return NotificationManager.error(
      "Please Enter Message",
      "Info",
      2000
    );
}

const Validator = (value, size = 0) => {
  if (!value) return false;
  if (value.length < size) return false;
  else return true;
};

export {
  ServiceName,
  ServiceDescription,
  ServicePrice,
  ServiceDuration,
  CompanyAddress,
  CompanyName,
  CompanyPhone,
  CompanyService,
  CompanyStatus,
  CompanyVat,
  CompanyWebsite,
  Validator,
  NotificationEmail,
  NotificationExpiry,
  NotificationRenew,
  NotificationMessage,
  NotificationCompany,
  NotificationService
};

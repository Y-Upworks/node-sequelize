const {
  addcompany,
  getallcompanies,
  getcompanybyid,
} = require("../controllers/company");
const {
  addEmployee,
  getallEmployees,
  getemployeebycompany,
  getemployeebyname,
} = require("../controllers/employee");
module.exports = (app) => {
  app.get("/api/company", getallcompanies);

  app.post("/api/company", addcompany);
  app.get("/api/company/:id", getcompanybyid);

  app.get("/api/employee", getallEmployees);

  app.post("/api/employee", addEmployee);

  app.get("/api/employee/:companyid", getemployeebycompany);
  app.get("/api/employeename/:name", getemployeebyname);
};

const { addcompany, getallcompanies } = require("../controllers/company");
const { addEmployee, getallEmployees } = require("../controllers/employee");
module.exports = (app) => {
  app.get("/api/company", getallcompanies);
  app.post("/api/company", addcompany);
  app.get("/api/employee", getallEmployees);
  app.post("/api/employee", addEmployee);
};

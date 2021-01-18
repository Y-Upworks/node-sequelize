const Employee = require("../models").Employee;
const Company = require("../models/index").Company;

const addEmployee = (req, res) => {
  return Employee.create({
    name: req.body.name,
    designation: req.body.designation,
    companyId: req.body.companyId,
  })
    .then((employee) => res.status(201).send(employee))
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });
};

const getallEmployees = (req, res) => {
  return Employee.findAll({
    attributes: ["id", "name"],
    include: {
      model: Company,
      attributes: ["id", "name"],
    },
  })
    .then((employee) => res.status(201).send(employee))
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });
};

module.exports = { addEmployee, getallEmployees };

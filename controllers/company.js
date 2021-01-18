const Company = require("../models").Company;
const Employee = require("../models").Employee;
const addcompany = (req, res) => {
  return Company.create({
    name: req.body.name,
  })
    .then((company) => res.status(201).send(company))
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });
};

const getallcompanies = (req, res) => {
  return Company.findAll({
    attributes: ["id", "name"],
  })
    .then((company) => res.status(201).send(company))
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });
};

const getcompanybyid = (req, res) => {
  return Company.findAll({
    where: {
      id: req.params.id,
    },
    include: {
      model: Employee,
      as: "employees",
    },
  })
    .then((company) => res.status(201).send(company))
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });
};
module.exports = {
  getcompanybyid,
  getallcompanies,
  addcompany,
};

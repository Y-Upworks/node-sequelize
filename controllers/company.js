const Company = require("../models").Company;

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

module.exports = { addcompany, getallcompanies };

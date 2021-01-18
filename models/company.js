"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    static associate(models) {
      Company.hasMany(models.Employee, {
        foreignKey: "companyId",
        as: "employees",
      });
    }
  }
  Company.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "Company",
    }
  );
  return Company;
};

"use strict";
const { Model, DataTypes } = require("sequelize");
const { sq } = require("../utils/database");

const Beneficiary = sq.define(
  "Beneficiaries",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bankName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    accountNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
  },
  {
    paranoid: true,
  }
);

// class Beneficiary extends Model {}

// Beneficiary.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//       unique: true,
//     },

//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     bankName: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     accountNumber: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//     },
//   },
//   {
//     sequelize: sq,
//     modelName: "Beneficiaries",
//     paranoid: true,
//   }
// );

module.exports = Beneficiary;

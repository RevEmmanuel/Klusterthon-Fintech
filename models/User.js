"use strict";
const { Model, DataTypes } = require("sequelize");
const { sq } = require("../utils/database");
const VerificationOtp = require("./VerificationOtp");

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    firstName:{
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName:{
      type: DataTypes.STRING,
      allowNull:false
    },
    middleName:{
      type:DataTypes.STRING,
      allowNull:false
    },
    contactInfo:{
      type:DataTypes.STRING,
      allowNull:false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sq.literal("CURRENT_TIMESTAMP"),
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sq.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    sequelize: sq,
    modelName: "Users",
    paranoid: true,
  }
);

User.hasOne(VerificationOtp, { onDelete: "cascade", foreignKey: "userId" });
VerificationOtp.belongsTo(User, { as: "user" });
module.exports = User;

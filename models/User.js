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
      allowNull: true,
      unique: true,
    },
    firstName:{
      type: DataTypes.STRING,
      allowNull: true
    },
    lastName:{
      type: DataTypes.STRING,
      allowNull:true
    },
    middleName:{
      type:DataTypes.STRING,
      allowNull:true
    },
    contactInfo:{
      type:DataTypes.STRING,
      allowNull:true,
      unique:true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        isEmail: true,
      },
    },

    pin:{
      type: DataTypes.STRING,
      allowNull: true
    },

    password: {
      type: DataTypes.STRING,
      allowNull: true,
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

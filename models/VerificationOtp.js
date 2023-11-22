"use strict";
const { Model, DataTypes } = require("sequelize");
const {sq} = require("../utils/database");

class VerificationOtp extends Model {
}

VerificationOtp.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        ownerEmail: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        otp: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: sq.literal('CURRENT_TIMESTAMP'),
        },
    },
    {
        sequelize: sq,
        modelName: "VerificationOtp",
        paranoid: false
    }
);

module.exports = VerificationOtp;
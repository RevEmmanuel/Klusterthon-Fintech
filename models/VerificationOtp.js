const { DataTypes } = require("sequelize");
const { sq } = require("../utils/database");

const VerificationOtp = sq.define('verification-otp', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
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
);


sq.sync()
    .then(() => {
        console.log('Otp model synced with the database');
    })
    .catch((error) => {
        console.error('Error syncing otp model:', error);
    });

module.exports = VerificationOtp;
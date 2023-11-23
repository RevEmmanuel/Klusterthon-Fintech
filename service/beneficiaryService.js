const AppException = require("../exceptions/GlobalException");
const Beneficiary = require("../models/Beneficiary");
const User = require("../models/User");
const VerificationOtp = require("../models/VerificationOtp");

const addBeneficiary = async (req, res) => {
  if (!req?.body?.name || !req?.body?.bankName || !req?.body?.accountNumber) {
    return res
      .status(400)
      .json({ message: "name, bankname and accountNumber required" });
  }

  try {
    const newBeneficiary = await Beneficiary.create({
      name: req.body.name,
      bankName: req.body.bankName,
      accountNumber: req.body.accountNumber,
    });

    res.status(201).json(newBeneficiary);
    console.log(newBeneficiary);
  } catch (error) {
    res.status(500).send("Internal Server Error");
    console.log(error);
  }
};

module.exports = { addBeneficiary };

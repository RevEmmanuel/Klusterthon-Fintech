const beneficiaryService = require("../service/beneficiaryService");

const express = require("express");

const router = express.Router();

router.route("/").post(beneficiaryService.addBeneficiary);

module.exports = router;

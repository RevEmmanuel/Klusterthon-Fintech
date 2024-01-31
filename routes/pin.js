const PinService = require("../service/PinService")
const User = require("../models/User");


const Router = require("express");

const router = Router();


router.route("/").post(PinService.createPin);


module.exports = router;
const User = require("../models/User");
const bcrypt = require("bcrypt");

const createPin = async(req, res) =>{
const {pin} = req.body;


if(!pin || !/^\d{4}$/.test(pin)){
return res.status(400).json({message: "Invalid PIN. It must be a 4-digit number."})
}


try{

const userId = req.user.id; 

const user = await User.findByPk(userId);

if (!user) {
  return res.status(404).json({ message: "User not found" });
}

if(user.pin){
  return res.status(400).json({message: "Pin already exists for this User"})
}

const hashedPin = await bcrypt.hash(pin.toString(),10);

user.pin = hashedPin;
await user.save();


return res.status(200).json({ message: "Pin Created" });
} catch (error) {
res.status(500).send("Internal Server Error");
console.error(error);
}


};

module.exports = {createPin};
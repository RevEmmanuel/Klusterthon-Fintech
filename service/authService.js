const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const otpGenerator = require("otp-generator");
const transporter = require("../utils/emailConfig");
const EmailAlreadyExistsException = require("../exceptions/EmailAlreadyExistsException");
const UserNotFoundException = require("../exceptions/UserNotFoundException");
const IncorrectPasswordException = require("../exceptions/IncorrectPasswordException");
const InvalidOtpException = require("../exceptions/InvalidOtpException");
const { sq } = require("../utils/database");
const UsernameAlreadyExistsException = require("../exceptions/UsernameAlreadyExistsException");
const User = require("../models/User");
const VerificationOtp = require("../models/VerificationOtp");

dotenv.config();
const hostUrl = process.env.EXTERNAL_URL;

async function createNewUser(signupRequest) {
  const email = signupRequest.email;
  const username = signupRequest.username;
  const password = signupRequest.password;

  console.log("hkjchchjcdjcj");

  const user = await sq.models.Users.findOne({ where: { email: email } });
  console.log(user);
  if (user) {
    throw new EmailAlreadyExistsException("This email is already registered!");
  }
  const usernameFound = await sq.models.Users.findOne({
    where: { username: username },
  });
  if (usernameFound) {
    throw new UsernameAlreadyExistsException("This username is already taken!");
  }

  const newUser = await sq.models.Users.create({
    email: email,
    password: await bcrypt.hash(password, 10),
    username: username,
  });

  console.log(newUser);

  const otp = otpGenerator.generate(12, {
    lowerCaseAlphabets: true,
    upperCaseAlphabets: true,
    specialChars: false,
    digits: false,
  });
  await storeOTPInDatabase(email, otp, newUser.id);
  console.log("This is my otp", otp);

  const mailOptions = {
    from: '"Bank App" <bank-app@gmail.com>',
    to: `${email}`,
    subject: "Welcome to Bank App",
    html: `
        <h1>Hi, ${username}!</h1>
        <h1>Welcome to Bank App</h1>
        <p>Your one-stop solution to your financial needs</p>
        <p>We're glad to have you!</p>
        
        <p>Please click the link below to verify your account:</p>
        <a href="${hostUrl}/auth/verify/${otp}" target="_blank">Verify my account</a>
        <br />
        <br />
        <p>If that doesn't work, copy the link below and paste in your browser:</p>
        <p>${hostUrl}/auth/verify/${otp}</p>
        `,
  };
  console.log("This is my otp", otp);

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
  console.log("This is my otp", otp);
  const secretKey = process.env.JWT_SECRET;
  newUser["token"] = jwt.sign({ user: newUser }, secretKey, {
    expiresIn: "24h",
  });
  return newUser;
}

async function loginUser(loginRequest) {
  const email = loginRequest.email;
  const password = loginRequest.password;

  const user = await sq.models.Users.findOne({ where: { email: email } });

  if (!user) {
    throw new UserNotFoundException("User not found!");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new IncorrectPasswordException("Incorrect Password!");
  }

  const secretKey = process.env.JWT_SECRET;
  return jwt.sign({ user: user }, secretKey, { expiresIn: "24h" });
}

async function verifyUser(otp) {
  const foundOtp = await sq.models.VerificationOtp.findOne({
    where: { otp: otp },
  });
  if (foundOtp === null) {
    throw new InvalidOtpException("Invalid or expired OTP.");
  }

  const email = foundOtp.ownerEmail;
  const user = await sq.models.Users.findOne({ where: { email: email } });
  if (user === null) {
    throw new UserNotFoundException("User not registered!");
  }
  user.isVerified = true;
  await user.save();
  await foundOtp.destroy();
  const username = user.username;

  const mailOptions = {
    from: '"Bank App" <bank-app@gmail.com>',
    to: `${email}`,
    subject: "Email Verified",
    html: `
        <h1>Hi, ${username}!</h1>
        <h1>Your account has been successfully verified</h1>
        <p>Enjoy our amazing features!</p>
        <p>Again, We're glad to have you!</p>
        `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
}

async function storeOTPInDatabase(ownerEmail, otp, userId) {
  await sq.models.VerificationOtp.create({
    ownerEmail: ownerEmail,
    otp: otp,
    userId: userId,
  });
}

async function checkIfUserExists(userId) {
  const user = await sq.models.Users.findOne({ where: { id: userId } });
  if (!user) {
    return false; // user does not exist
  }
  return true; // user exists
}

module.exports = {
  createNewUser,
  loginUser,
  verifyUser,
  checkIfUserExists,
};

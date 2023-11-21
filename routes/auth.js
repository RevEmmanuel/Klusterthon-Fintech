const {createNewUser, loginUser, verifyUser} = require("../service/authService");
const Router = require("express");
const yup = require('yup');
const InvalidOtpException = require("../exceptions/InvalidOtpException");

const authRouter = Router();

// validation schema
const createUserRequest = yup.object().shape({
    username: yup.string().required('Please enter a username').min(2, 'Please enter a valid username'),
    email: yup.string().email().required('Please enter an email').min(2, 'Please enter a valid email'),
    password: yup.string().required('Please enter a password').min(8, 'Password must be a minimum of 8 characters')
});

const loginRequest = yup.object().shape({
    email: yup.string().email().required('Please enter an email').min(2, 'Please enter a valid email'),
    password: yup.string().required('Please enter a password').min(8, 'Password must be a minimum of 8 characters')
});

authRouter.post('/signup', async (req, res, next) => {
    try {
        const requestBody = req.body;
        await createUserRequest.validate(requestBody);
        const createdUser = await createNewUser(requestBody);
        const createUserResponse = {
            id: createdUser.id,
            username: createdUser.username,
            createdAt: createdUser.createdAt,
            isVerified: createdUser.isVerified,
            token: createdUser.token
        }
        res.status(201).json({ message: 'User registered successfully', createdUser: createUserResponse });
    } catch (error) {
        next(error);
    }
});

authRouter.post('/login', async (req, res, next) => {
    try {
        const loginDto = req.body;
        await loginRequest.validate(loginDto);
        const token = await loginUser(loginDto);
        res.status(200).json({ token });
    } catch (error) {
        next(error);
    }
})

authRouter.get('/verify/:otp', async (req, res, next) => {
    try {
        const otp = req.params.otp;
        if (!otp) {
            throw new InvalidOtpException('Please provide an otp');
        }
        await verifyUser(otp);
        res.status(200).json({ message: 'User verified successfully' });
    } catch (error) {
        next(error);
    }
});

module.exports = authRouter;
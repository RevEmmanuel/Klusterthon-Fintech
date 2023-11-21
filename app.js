// -------------------------
// In-memory token blacklist
const tokenBlackList = new Set();
module.exports = { tokenBlackList };
// -------------------------

const express = require('express');
const cors = require('cors');
const app = express();
const globalExceptionHandler = require("./exceptions/GlobalExceptionHandler")
const authVerification = require("./middleware/authVerification");
const authRouter = require("./routes/auth");
const {testDbConnection} = require("./utils/database");
const port = process.env.PORT || 3000;

app.use(express.json());
const corsOptions = {
    origin: ['http://localhost:3000', 'https://hux-assessment-frontend.vercel.app'],
    optionsSuccessStatus: 200,
    methods: "GET, POST, PUT, DELETE",
}
app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

app.use('/auth', authRouter);

app.get('/auth/current-user', authVerification ,async (req, res, next) => {
    try {
        const user = req.user;
        console.log(user);
        const currentUser = {
            id: user.id,
            username: user.username
        }
        res.status(200).json(currentUser);
    } catch (error) {
        next(error);
    }
});

app.post('/logout', (req, res) => {
    const token = req.headers.authorization;
    if (token) {
        tokenBlackList.add(token.substring(7));
        res.status(200).json({ message: 'Logged out successfully' });
    }
    else {
        res.status(401).json({ message: 'Token not found' });
    }
})

app.use(globalExceptionHandler);

app.listen(port, async () => {
    console.log(`Starting Sequelize + Express server on port ${port}...`);
    console.log(`Server is running on port ${port}...`);
    await testDbConnection();
});

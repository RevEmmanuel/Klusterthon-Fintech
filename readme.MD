# Hux Ventures Backend Assessment Node.js Project
This is a Node.js project that allows users to save contact information.

### Features
* `Signup`
* `Login`
* `Create a new contact`
* `Retrieve a list of your contacts`
* `Retrieve a single contact`
* `Update a contact`
* `Delete a contact`

### Technologies used:
* `Javascript`
* `NodeJs`
* `PostgreSQL`
* `npm`
* `JWT`
* `jest`
* `Gmail smtp`
* `Postman`

### Prerequisites:
* `Node.js`
* `npm`
* `PostgreSQL Database`
* `Port 3000 open and free`

## Usage
To use this project, you will need to have Node.js and NPM installed. Once you have installed Node.js and NPM, you can clone this repository and install the dependencies with the following commands:
```
git clone https://github.com/RevEmmanuel/hux-assessment-backend.git
cd hux-assessment-backend
npm install
```

- Install [Node.js](https://nodejs.org/en/)

To start the project, run the following command:
```
npm start
```

## API
The project has a REST API that can be accessed at the following URL:
`http://localhost:3000/`

The API has the following endpoints:

POST /auth/signup
POST /auth/login
GET /auth/verify/:otp
POST /contacts/create
GET /contacts/all
GET /contacts/:id
PUT /contacts/update/:id
DELETE /contacts/delete/:id

## Configuration
The project can be configured using a .env file. The .env file should contain the following environment variables:
```properties
PORT=3000
DB_USER=
DB_NAME=
DB_PASSWORD=
DB_HOST=
DB_PORT=
JWT_SECRET=
EMAIL_USERNAME=
EMAIL_PASSWORD=
EXTERNAL_URL=
```

## Testing
To run the tests for the project, run the following command:
```
npm test
```

## Deployment
To deploy the project to production, you can use a service such as Heroku or AWS Elastic Beanstalk or Railway.
This project is currently hosted on railway.

## Documentation
[Postman Documentation](https://documenter.getpostman.com/view/24879226/2s9YJaZ4ZS)
[Deployed Website URL](https://hux-assessment-frontend.vercel.app/)
[Frontend GitHub Repository](https://github.com/RevEmmanuel/hux-assessment-frontend)

## Developer & Engineer
Adeola Adekunle
* [GitHub (RevEmmanuel)](https://github.com/RevEmmanuel)
* [Twitter (@Adeola_Ade1)](https://twitter.com/Adeola_Ade1)
* [Instagram (@deolaaxo)](https://www.instagram.com/deolaaxo/)
* [LinkedIn (Adeola Adekunle)](https://www.linkedin.com/in/adeola-adekunle-emmanuel/)
* [Email(Adeola Adekunle)](mailto:adeolaae1@gmail.com)

## Contributing
If you would like to contribute to this project, please feel free to fork the repository and submit a pull request.

## License
This project is licensed under the [MIT license](https://opensource.org/license/mit/)
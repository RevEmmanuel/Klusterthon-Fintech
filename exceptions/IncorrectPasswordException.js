const ContactsAppException = require("./GlobalException");

class IncorrectPasswordException extends ContactsAppException {

    constructor(message) {
        super(message, 401);
    }

}

module.exports = IncorrectPasswordException;
const ContactsAppException = require("./GlobalException");

class UsernameAlreadyExistsException extends ContactsAppException {

    constructor(message) {
        super(message, 400);
    }

}

module.exports = UsernameAlreadyExistsException;
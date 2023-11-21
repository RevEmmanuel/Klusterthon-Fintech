const ContactsAppException = require("./GlobalException");

class PhoneAlreadyExistsException extends ContactsAppException {

    constructor(message) {
        super(message, 400);
    }

}

module.exports = PhoneAlreadyExistsException;
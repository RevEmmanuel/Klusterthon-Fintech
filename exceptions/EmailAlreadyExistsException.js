const ContactsAppException = require("./GlobalException");

class EmailAlreadyExistsException extends ContactsAppException {

    constructor(message) {
        super(message, 400);
    }

}

module.exports = EmailAlreadyExistsException;
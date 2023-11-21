const ContactsAppException = require("./GlobalException");

class InvalidOtpException extends ContactsAppException {

    constructor(message) {
        super(message, 401);
    }

}

module.exports = InvalidOtpException;
const ContactsAppException = require("./GlobalException");

class UnauthorizedException extends ContactsAppException {

    constructor(message) {
        super(message, 401);
    }

}

module.exports = UnauthorizedException;
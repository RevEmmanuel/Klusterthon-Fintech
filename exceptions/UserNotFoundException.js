const ContactsAppException = require("./GlobalException");

class UserNotFoundException extends ContactsAppException {

    constructor(message) {
        super(message, 404);
    }

}

module.exports = UserNotFoundException;
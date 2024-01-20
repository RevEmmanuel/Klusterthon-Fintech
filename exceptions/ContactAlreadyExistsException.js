const ContactsAppException = require("./GlobalException");

class ContactsAlreadyExistsException extends ContactsAppException{
    constructor(message){
        super(message,400)
    }
}

module.exports = ContactsAlreadyExistsException;
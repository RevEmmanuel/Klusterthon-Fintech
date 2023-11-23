class AppException extends Error {
  statusCode;
  message;

  constructor(message, statusCode) {
    super(message);
    this.name = "Contacts Exception";
    this.statusCode = statusCode;
    this.message = message;
  }
}

module.exports = AppException;

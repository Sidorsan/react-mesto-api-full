const { UNAUTHORIZED_ERROR_CODE } = require('./errorsCode');

class UnauthorizedErrorCode extends Error {
  constructor(message) {
    super(message);
    this.statusCode = UNAUTHORIZED_ERROR_CODE;
  }
}

module.exports = {
  UnauthorizedErrorCode,
};

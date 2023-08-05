const httpConstants = require('http2').constants;

module.exports = class NotfoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = httpConstants.HTTP_STATUS_NOT_FOUND;
  }
};

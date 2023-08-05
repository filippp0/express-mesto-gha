const httpConstants = require('http2').constants;

module.exports = class ServerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR;
  }
};
